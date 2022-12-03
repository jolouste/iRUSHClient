import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "../../styles/dashboard.css";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Ticketlist from "../../components/admincomponents/Ticketlist";
import Irushuser from "../../components/admincomponents/Irushuser";
import Pagination from "../../components/filters/Pagination";
import Search from "../../components/filters/Search";
import FilterPriority from "../../components/filters/FilterPriority";
import FilterCategory from "../../components/filters/FilterCategory";
import FilterDate from "../../components/filters/FilterDate";
import PieChart from "../../components/charts/PieChart";
import DoughnutChart from "../../components/charts/DoughnutChart";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import BarChartLikert from "../../components/charts/BarChartLikert";
import instance from "../../axios/axios";

const Dashboard = () => {
	const [dataTickets, setDataTickets] = useState([]);

	//get the tickets
	const [tickets, setTickets] = useState([]);
	const [openTickets, setOpenTickets] = useState([]);
	const [resolvedTickets, setResolvedTickets] = useState([]);
	const [voidedTickets, setVoidedTickets] = useState([]);
	const [rejectedTickets, setRejectedTickets] = useState([]);
	const [reopenedTickets, setReopenedTickets] = useState([]);
	const [overdueTickets, setOverdueTickets] = useState([]);
	const [reopenedTicketsCreated, setReopenedTicketsCreated] = useState([]);

	//lengths of the tickets
	const ticketLength = tickets.length;
	const openTicketLength = openTickets.length;
	const resolvedTicketsLength = resolvedTickets.length;
	const voidedTicketsLength = voidedTickets.length;
	const rejectedTicketsLength = rejectedTickets.length;
	const reopenedTicketsLength = reopenedTickets.length;
	const overdueTicketsLength = overdueTickets.length;
	const reopenedTicketsCreatedLength = reopenedTicketsCreated.length;

	const [users, setUsers] = useState([]);
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
		const fetchiRUSHUsers = async () => {
			await instance
				.get(`/settings/fetchusers`)
				.then(response => setUsers(response.data))
				.catch(err => {
					console.log(err);
					if (err.response.status === 401) {
						window.location.href = "/login";
					}
				});
		};

		const fetchTickets = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/tickets?priority=${priority.priority}&page=${page}&limit=${limit}&search=${search}&ticketCategory=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					setLoading(true);
					//for pagination
					setLimit(response.data.limit);
					setTotal(response.data.total);
					setDataTickets(response.data.filteredTickets);
					setTickets(response.data.ticket);
					setOpenTickets(response.data.openTickets);
					setRejectedTickets(response.data.rejectedTickets);
					setResolvedTickets(response.data.resolvedTickets);
					setVoidedTickets(response.data.voidedTickets);
					setReopenedTickets(response.data.reopenedTickets);
					setOverdueTickets(response.data.overdueTickets);
					setReopenedTicketsCreated(response.data.createdReopenedTicket);
				})
				.catch(err => {
					console.log(err);
					if (err.response.status === 401) {
						window.location.href = "/login";
					}
				});
			setLoading(false);
		};

		fetchTickets();
		fetchiRUSHUsers();
	}, [page, limit, search, priority, category, dateFrom, dateTo]);

	return (
		<>
			<div className="dashboard-container">
				<div className="dashboard-container__wrapper">
					<div className="dashboard-container__nav">
						<AdminNavbar />
					</div>
					<div className="dashboard-container__content">
						<div className="dashboard-container__header">
							<Header />
						</div>
						<div className="dashboard-container__content__wrapper">
							<div className="dashboard-content__servicereport">
								<div className="dashboard-content__servicereport-container">
									<div className="servicereport-header">
										<h4> Service Performance Report </h4>
										<Irushuser users={users} />
									</div>
								</div>
							</div>

							<div className="dashboard-content__ticketreport">
								<div className="ticketreport-header">
									<h2> Overall Service Performance Report </h2>
								</div>

								<div className="ticketreport-ticketcontainer">
									<div className="ticketcontainer-alltickets">
										<div className="alltickets-status__container">
											<div className="alltickets-status__container__wrapper">
												<div className="status-ticket__ticketcreated">
													<span className="allticketlength">
														{`${ticketLength}`}
													</span>
													<h6>Ticket Accepted</h6>
												</div>
												<div className="status-ticket__ticketresolved">
													<span className="resolvedticketlength">{`${resolvedTicketsLength}`}</span>
													<h6>Tickets Resolved</h6>
												</div>
												<div className="status-ticket__ticketvoided">
													<span className="voidedticketlength">{`${voidedTicketsLength}`}</span>
													<h6>Tickets Voided</h6>
												</div>
												<div className="status-ticket__ticketopen">
													<span className="openticketlength">{`${openTicketLength}`}</span>
													<h6>Open Tickets</h6>
												</div>
												<div className="status-ticket__ticketreopened">
													<span className="reopenticketlength">{`${reopenedTicketsLength}`}</span>
													<h6>Reopened Tickets</h6>
												</div>
												<div className="status-ticket__ticketoverdue">
													<span className="overdueticketlength">{`${overdueTicketsLength}`}</span>
													<h6>Overdue Tickets</h6>
												</div>
												<div className="status-ticket__ticketrejected">
													<span className="rejectedticketlength">{`${rejectedTicketsLength}`}</span>
													<h6>Rejected Tickets</h6>
												</div>
											</div>

											<div className="alltickets-ticketreopened__container">
												<div className="status-ticket__createdreopenedticket">
													<span className="createdreopenedticklength">{`${reopenedTicketsCreatedLength}`}</span>
													<h6>Ticket Reopened</h6>
												</div>
											</div>
										</div>
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
											<div className="filtertickets-datefilter">
												<FilterDate
													dateFrom={dateFrom}
													setDateFrom={dateFrom => setDateFrom(dateFrom)}
													dateTo={dateTo}
													setDateTo={dateTo => setDateTo(dateTo)}
												/>
											</div>
										</div>
										<div className="filtertickets-searchandreport__container">
											<Search setSearch={search => setSearch(search)} />
										</div>
									</div>

									<Ticketlist
										loading={loading}
										dataTickets={dataTickets}
										setDataTickets={setDataTickets}
									/>

									<Pagination
										page={page}
										limit={limit}
										total={total}
										setPage={page => setPage(page)}
										setLimit={limit => setLimit(limit)}
									/>

									<div className="container-charts">
										<div className="container-charts__wrapper">
											<div className="charts-header__resolvedticketperusers">
												{!tickets ? (
													<PieChart />
												) : (
													<h4 style={{ textTransform: "uppercase" }}>
														Data Visualization
													</h4>
												)}
											</div>

											<div className="charts-barChart">
												<BarChart />
											</div>

											<div className="charts-pieandDoughnut">
												<div className="charts-pie__container">
													<PieChart />
												</div>
												<div className="charts-doughnut__container">
													<DoughnutChart />
												</div>
											</div>

											<div className="charts-LineChart">
												<LineChart />
											</div>

											<div className="charts-barChart">
												<BarChartLikert />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
