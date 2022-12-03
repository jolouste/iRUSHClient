import React, { useState, useEffect } from "react";
import FilterPriority from "../../../components/filters/FilterPriority";
import FilterCategory from "../../../components/filters/FilterCategory";
import FilterDate from "../../../components/filters/FilterDate";
import Search from "../../../components/filters/Search";
import Pagination from "../../../components/filters/Pagination";
import Resolvedticketslist from "../../../components/tickestats/resolvedticket/Resolvedticketslist";
import PieChart from "../../../components/tickestats/resolvedticket/charts/PieChart";
import DoughnutChart from "../../../components/tickestats/resolvedticket/charts/DoughnutChart";
import BarChart from "../../../components/tickestats/resolvedticket/charts/BarChart";
import instance from "../../../axios/axios";

const ResolvedTickets = ({ ticketNavId }) => {
	const [resolvedTickets, setResolvedTickets] = useState([]);
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
		const fetchOpenTickets = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/resolvedtickets?priority=${priority.priority}&page=${page}&limit=${limit}&search=${search}&ticketCategory=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					const filteredTickets = response.data.filteredTickets;
					const limit = response.data.limit;
					const total = response.data.total;
					setResolvedTickets(filteredTickets);
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

		fetchOpenTickets();
	}, [search, priority, category, page, limit, dateFrom, dateTo]);

	if (ticketNavId === 2) {
		return (
			<>
				<div className="ticketstats-content__container">
					<div className="ticketstatsreport-header">
						<h2> ALL RESOLVED TICKETS </h2>
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

					<Resolvedticketslist
						resolvedTickets={resolvedTickets}
						loading={loading}
						setResolvedTickets={setResolvedTickets}
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
								{!resolvedTickets ? (
									<PieChart />
								) : (
									<h4 style={{ textTransform: "uppercase" }}>
										Data Visualization
									</h4>
								)}
							</div>

							<div className="charts-pieandDoughnut">
								<div className="charts-pie__container">
									<PieChart />
								</div>
								<div className="charts-doughnut__container">
									<DoughnutChart />
								</div>
							</div>

							<div className="charts-BarChart">
								<BarChart />
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default ResolvedTickets;
