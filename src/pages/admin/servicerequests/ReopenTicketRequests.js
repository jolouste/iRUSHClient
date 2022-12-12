import React, { useState, useEffect } from "react";
import "../../../styles/reopenservicerequest.css";
import FilterCategory from "../../../components/filters/FilterCategory";
import FilterDate from "../../../components/filters/FilterDate";
import SearchRef from "../../../components/filters/SearchRef";
import Pagination from "../../../components/filters/Pagination";
import ReopenServiceLists from "../../../components/newservicereq/reopenservicerequest/ReopenServiceLists";
import PieChart from "../../../components/newservicereq/reopenservicerequest/charts/PieChart";
import BarChart from "../../../components/newservicereq/reopenservicerequest/charts/BarChart";
import instance from "../../../axios/axios";

const ReopenTicketRequests = ({ servicereqNavId }) => {
	const [reopenRequestsData, setReopenRequestsData] = useState([]);
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
		const fetchReopenRequests = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/requestedreopenedtickets?page=${page}&limit=${limit}&search=${search}&ticketCategory=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					setReopenRequestsData(response.data.filteredReopenedTicketRequests);
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

		fetchReopenRequests();
	}, [page, limit, search, category, dateFrom, dateTo]);

	if (servicereqNavId === 2) {
		return (
			<>
				<div className="reopenservicerequests-container">
					<div className="reopenservicerequestsheader-header">
						<h2> reopen Service Requests </h2>
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

					<ReopenServiceLists
						loading={loading}
						reopenRequestsData={reopenRequestsData}
						setReopenRequestsData={setReopenRequestsData}
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
								{!reopenRequestsData ? (
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

export default ReopenTicketRequests;
