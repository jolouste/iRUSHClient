import React, { useState, useEffect } from "react";
import "../../styles/newservicerequests.css";
import FilterCategory from "../filters/FilterCategory";
import FilterDate from "../filters/FilterDate";
import SearchRef from "../filters/SearchRef";
import Pagination from "../filters/Pagination";
import NewServiceRequestslist from "../../components/newservicereqlists-helpdesk/NewServiceRequestsLists";
import instance from "../../axios/axios";

const HelpdeskNewServiceRequests = ({ servicereqNavId }) => {
	const [serviceRequestsData, setServiceRequestsData] = useState([]);
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
					`/tickets/servicerequests?page=${page}&limit=${limit}&search=${search}&category=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					setServiceRequestsData(response.data.filteredServiceRequests);
					//for pagination
					setLimit(response.data.limit);
					setTotal(response.data.total);
				})
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
					}
				});
			setLoading(false);
		};

		fetchServiceRequests();
	}, [page, limit, search, category, dateFrom, dateTo]);

	if (servicereqNavId === 1) {
		return (
			<>
				<div className="newservicerequests-container">
					<div className="newservicerequestsheader-header">
						<h2> New Service Requests </h2>
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

					<NewServiceRequestslist
						loading={loading}
						serviceRequestsData={serviceRequestsData}
						setServiceRequestsData={setServiceRequestsData}
					/>

					<Pagination
						page={page}
						total={total}
						setPage={page => setPage(page)}
						limit={limit}
						setLimit={limit => setLimit(limit)}
					/>
				</div>
			</>
		);
	}
};

export default HelpdeskNewServiceRequests;
