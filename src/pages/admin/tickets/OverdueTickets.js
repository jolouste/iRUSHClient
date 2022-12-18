import React, { useState, useEffect } from "react";
import FilterPriority from "../../../components/filters/FilterPriority";
import FilterCategory from "../../../components/filters/FilterCategory";
import FilterDate from "../../../components/filters/FilterDate";
import Search from "../../../components/filters/Search";
import Pagination from "../../../components/filters/Pagination";
import Overdueticketslist from "../../../components/tickestats/overdueticket/Overdueticketslist";
import PieChart from "../../../components/tickestats/overdueticket/charts/PieChart";
import DoughnutChart from "../../../components/tickestats/overdueticket/charts/DoughnutChart";
import BarChart from "../../../components/tickestats/overdueticket/charts/BarChart";
import instance from "../../../axios/axios";
import pdficon from "../../../images/img/pdficon.png";

const OverdueTickets = ({ ticketNavId }) => {
	const [overdueTickets, setOverdueTickets] = useState([]);
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
		const fetchOverdueTickets = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/overduetickets?priority=${priority.priority}&page=${page}&limit=${limit}&search=${search}&ticketCategory=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					const filteredTickets = response.data.filteredTickets;
					const limit = response.data.limit;
					const total = response.data.total;
					setOverdueTickets(filteredTickets);
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

		fetchOverdueTickets();
	}, [search, priority, category, page, limit, dateFrom, dateTo]);

	//FOR GENERATION OF REPORTS
	const [file, setFile] = useState(null);
	useEffect(() => {
		instance
			.get("/tickets/report/overduetickets", {
				responseType: "blob",
			})
			.then(response => {
				const file = new Blob([response.data], {
					type: response.headers["content-type"],
				});
				const fileURL = URL.createObjectURL(file);
				setFile(fileURL);
			})
			.catch(error => {
				if (error.response.status === 401) {
					window.location.href = "/login";
				}
			});
	}, []);

	if (ticketNavId === 3) {
		return (
			<>
				<div className="ticketstats-content__container">
					<div className="ticketstatsreport-header">
						<h2> ALL OVERDUE TICKETS </h2>
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
							{!loading && (
								<div className="generatereport-container">
									<span>Generate Report: </span>
									<div className="generatereport">
										<img
											src={pdficon}
											alt="pdf icon"
											style={{
												width: "26px",
												cursor: "pointer",
											}}
											onClick={() => {
												window.open(file);
											}}
										/>
									</div>
								</div>
							)}
						</div>
					</div>
					<Overdueticketslist
						overdueTickets={overdueTickets}
						loading={loading}
						setOverdueTickets={setOverdueTickets}
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
								{!overdueTickets ? (
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

export default OverdueTickets;
