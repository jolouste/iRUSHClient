import React, { useState, useEffect } from "react";
import "../../styles/itsupport/dashboard.css";
import ItNavbar from "../../components/navbar/ItNavbar";
import Header from "../../components/Header";
import ItNotifications from "../../components/itsupport-components/ItNotifications";
import ItTicketLists from "../../components/itsupport-components/ItTicketLists";
import FilterPriority from "../../components/filters/FilterPriority";
import FilterCategory from "../../components/filters/FilterCategory";
import FilterDate from "../../components/filters/FilterDate";
import Search from "../../components/filters/Search";
import Pagination from "../../components/filters/Pagination";
import instance from "../../axios/axios";
import pdficon from "../../images/img/pdficon.png";

const ItDashboard = () => {
	const [assignedTicketData, setAssignedTicketData] = useState([]);
	const [filteredTicketsData, setFilteredTicketData] = useState([]);
	const [openTickets, setOpenTickets] = useState([]);
	const [resolvedTickets, setResolvedTickets] = useState([]);
	const [voidedTickets, setVoidedTickets] = useState([]);
	const [reopenedTickets, setReopenTickets] = useState([]);
	const [overdueTickets, setOverdueTickets] = useState([]);
	const [loading, setLoading] = useState(false);

	//handle error data message
	const [error, setError] = useState("");

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
		const fetchAssignedTicketData = async () => {
			setLoading(true);
			await instance
				.get(
					`/tickets/itsupport/assignedtickets?priority=${priority.priority}&page=${page}&limit=${limit}&search=${search}&ticketCategory=${category.category}&dateFrom=${dateFrom.dateFrom}&dateTo=${dateTo.dateTo}`
				)
				.then(response => {
					console.log(response.data);
					setFilteredTicketData(response.data.filteredTickets);
					setAssignedTicketData(response.data.assignedTicket);
					setResolvedTickets(response.data.clerkresolvedTicket);
					setOpenTickets(response.data.clerkOpenTicket);
					setReopenTickets(response.data.clerkReopenedTicket);
					setOverdueTickets(response.data.clerkOverdueTicket);
					setVoidedTickets(response.data.clerkVoidedTicket);
					setTotal(response.data.total);
					setLimit(response.data.limit);
				})
				.catch(error => {
					let errorResponse = error.response.data.message;

					if (
						error.response &&
						error.response.status >= 400 &&
						error.response.status <= 500
					) {
						setError(errorResponse);
					}

					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			setLoading(false);
		};

		fetchAssignedTicketData();
	}, [priority, page, limit, search, category, dateFrom, dateTo]);

	//FOR GENERATION OF REPORTS
	const [file, setFile] = useState(null);
	useEffect(() => {
		instance
			.get("/tickets/itsupport/report", {
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

	return (
		<>
			<div className="itsupportdashboard-container">
				<div className="itsupportdashboard-container__wrapper">
					<div className="itsupportdashboard-container__nav">
						<ItNavbar />
					</div>
					<div className="itsupportdashboard-container__content">
						<div className="itsupportdashboard-container__header">
							<Header />
						</div>
						<div className="itsupportdashboard-container__content__wrapper">
							<div className="itsupportdashboard-content__notifications">
								<div className="itsupportdashboard-content__servicereport-container">
									<div className="itsupportnotification-header">
										<h4> Notification / Activities </h4>
										<ItNotifications
											assignedTicketData={assignedTicketData}
											error={error}
										/>
									</div>
								</div>
							</div>

							<div className="itsupportdashboard-content__ticketreport">
								<div className="itsupportticketreport-header">
									<h2> Own service performance report </h2>
								</div>

								<div className="itsupportticketreport-ticketcontainer">
									<div className="itsupportticketcontainer-alltickets">
										<div className="itsupportassigntickets-status__container">
											<div className="itsupportassigntickets-status__container__wrapper">
												<div className="itsupportticket-ticket__ticketcreated">
													<span className="allticketlength">
														{assignedTicketData.length}
													</span>
													<h6>Assigned Ticket</h6>
												</div>
												<div className="itsupportticket-ticket__ticketresolved">
													<span className="resolvedticketlength">
														{resolvedTickets.length}
													</span>
													<h6>Resolved Ticket</h6>
												</div>
												<div className="itsupportticket-ticket__ticketopen">
													<span className="resolvedticketlength">
														{openTickets.length}
													</span>
													<h6>Open Ticket</h6>
												</div>
												<div className="itsupportticket-ticket__ticketreopen">
													<span className="reopenticketlength">
														{reopenedTickets.length}
													</span>
													<h6>Reopened Ticket</h6>
												</div>
												<div className="itsupportticket-ticket__ticketoverdue">
													<span className="overdueticketlength">
														{overdueTickets.length}
													</span>
													<h6>Overdue Ticket</h6>
												</div>
												<div className="itsupportticket-ticket__ticketvoided">
													<span className="rejectedticketlength">
														{voidedTickets.length}
													</span>
													<h6>Voided Tickets</h6>
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

									<ItTicketLists
										filteredTicketsData={filteredTicketsData}
										setFilteredTicketData={setFilteredTicketData}
										error={error}
										loading={loading}
									/>

									<Pagination
										page={page}
										limit={limit}
										total={total}
										setPage={page => setPage(page)}
										setLimit={limit => setLimit(limit)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItDashboard;
