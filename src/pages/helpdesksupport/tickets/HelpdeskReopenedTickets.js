import React, { useState, useEffect } from "react";
import "../../../styles/ticketstatistics.css";
import FilterPriority from "../../../components/filters/FilterPriority";
import FilterCategory from "../../../components/filters/FilterCategory";
import FilterDate from "../../../components/filters/FilterDate";
import Search from "../../../components/filters/Search";
import Pagination from "../../../components/filters/Pagination";
import HelpdeskReopenedTicketsLists from "../../../components/ticketstats-helpdesk/HelpdeskReopenedTicketsLists";
import instance from "../../../axios/axios";

const HelpdeskReopenedTickets = ({ ticketNavId }) => {
	const [reopenedTickets, setReopenedTickets] = useState([]);
	const [loading, setLoading] = useState(false);
	//for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");
	//for searching ticket no.
	const [search, setSearch] = useState("");
	//for filtering
	const [priority, setPriority] = useState({ priority: " " });
	const [category, setCategory] = useState({ category: " " });
	const [dateFrom, setDateFrom] = useState({ dateFrom: 0 });
	const [dateTo, setDateTo] = useState({ dateTo: new Date() });

	useEffect(() => {
		const fetchReopenedTickets = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/helpdesk/assignedtickets/reopenedTickets?priority=${priority.priority}&page=${page}&limit=${limit}&search=${search}&ticketCategory=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					console.log(response.data);
					const filteredTickets = response.data.filteredTickets;
					const limit = response.data.limit;
					const total = response.data.total;
					setReopenedTickets(filteredTickets);
					//for pagination
					setLimit(limit);
					setTotal(total);
				})
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});
			setLoading(false);
		};

		fetchReopenedTickets();
	}, [search, priority, category, page, limit, dateFrom, dateTo]);

	if (ticketNavId === 5) {
		return (
			<>
				<div className="ticketstats-content__container">
					<div className="ticketstatsreport-header">
						<h2> ALL REOPENED TICKETS </h2>
					</div>

					<div className="ticketcontainer-filtertickets">
						<div className="filtertickets-container__wrapper">
							<FilterPriority
								priority={priority}
								setPriority={priority => setPriority(priority)}
							/>
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
							<Search setSearch={search => setSearch(search)} />
						</div>
					</div>

					<HelpdeskReopenedTicketsLists
						reopenedTickets={reopenedTickets}
						loading={loading}
						setReopenedTickets={setReopenedTickets}
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

export default HelpdeskReopenedTickets;
