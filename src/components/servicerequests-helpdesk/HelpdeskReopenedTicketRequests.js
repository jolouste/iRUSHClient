import React, { useState, useEffect } from "react";
import "../../styles/reopenservicerequest.css";
import FilterCategory from "../filters/FilterCategory";
import FilterDate from "../filters/FilterDate";
import SearchRef from "../filters/SearchRef";
import Pagination from "../filters/Pagination";
import ReopenTicketRequestsLists from "../../components/newservicereqlists-helpdesk/ReopenTicketRequestsLists";
import instance from "../../axios/axios";

const HelpdeskReopenedTicketRequests = ({ servicereqNavId }) => {
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

					<ReopenTicketRequestsLists
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
				</div>
			</>
		);
	}
};

export default HelpdeskReopenedTicketRequests;
