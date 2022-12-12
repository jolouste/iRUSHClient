import React, { useState, useEffect } from "react";
import "../../../styles/rejectedservicerequests.css";
import FilterCategory from "../../../components/filters/FilterCategory";
import FilterDate from "../../../components/filters/FilterDate";
import SearchRef from "../../../components/filters/SearchRef";
import Pagination from "../../../components/filters/Pagination";
import RejectedServiceRequestslist from "../../../components/newservicereq/rejectedservicerequest/RejectedServiceRequestslist";
import PieChart from "../../../components/newservicereq/rejectedservicerequest/charts/PieChart";
import BarChart from "../../../components/newservicereq/rejectedservicerequest/charts/BarChart";
import instance from "../../../axios/axios";

const RejectedServiceRequests = ({ servicereqNavId }) => {
	const [rejectedServiceRequestsData, setRejectedServiceRequestsData] =
		useState([]);
	const [loading, setLoading] = useState(false);
	// //for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");
	// //for searching ticket no.
	const [search, setSearch] = useState("");
	//for filtering
	const [category, setCategory] = useState({ category: " " });
	const [dateFrom, setDateFrom] = useState({ dateFrom: 0 });
	const [dateTo, setDateTo] = useState({ dateTo: new Date() });

	useEffect(() => {
		const fetchServiceRequests = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/rejectedservicerequests?page=${page}&limit=${limit}&search=${search}&category=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					setRejectedServiceRequestsData(
						response.data.filteredRejectedServiceRequests
					);
					//for pagination
					setLimit(response.data.limit);
					setTotal(response.data.total);
				})
				.catch(error => {
					console.log(error);

					if (error.response.status === 401) {
						window.location.href = "/login";
					}
				});
			setLoading(false);
		};

		fetchServiceRequests();
	}, [page, limit, search, category, dateFrom, dateTo]);

	if (servicereqNavId === 3) {
		return (
			<>
				<div className="rejectedservicerequests-container">
					<div className="rejectedservicerequestsheader-header">
						<h2> Rejected Service Requests </h2>
					</div>

					<div className="ticketcontainer-filtertickets">
						<div className="filtertickets-container__wrapper">
							<FilterCategory
								category={category}
								setCategory={category => setCategory(category)}
							/>
							<FilterDate
								dateFrom={dateFrom}
								setDateFrom={dateFrom => setDateFrom(dateFrom)}
								dateTo={dateTo}
								setDateTo={dateTo => setDateTo(dateTo)}
							/>
						</div>
						<div className="filtertickets-searchandreport__container">
							<SearchRef setSearch={search => setSearch(search)} />
						</div>
					</div>

					<RejectedServiceRequestslist
						loading={loading}
						rejectedServiceRequestsData={rejectedServiceRequestsData}
						setRejectedServiceRequestsData={setRejectedServiceRequestsData}
					/>

					<Pagination
						page={page}
						total={total}
						setPage={page => setPage(page)}
						limit={limit}
						setLimit={limit => setLimit(limit)}
					/>

					<div className="container-charts">
						<div className="container-charts__wrapper">
							<div className="charts-header__resolvedticketperusers">
								{!rejectedServiceRequestsData ? (
									<PieChart />
								) : (
									<h4 style={{ textTransform: "uppercase" }}>
										Data Visualization
									</h4>
								)}
							</div>

							<div className="charts-pieandBarchart">
								<div className="charts-pie__container">
									<PieChart />
								</div>

								<div className="charts-barchart__container">
									<BarChart />
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default RejectedServiceRequests;
