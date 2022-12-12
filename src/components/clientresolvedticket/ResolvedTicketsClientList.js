import React, { useState } from "react";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const ResolvedTicketsClientList = ({
	loading,
	requestedResolvedTickets,
	setRequestedResolvedTickets,
	clientId,
	token,
}) => {
	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...requestedResolvedTickets].sort((a, b) =>
				col === "ticketNo"
					? parseInt(a[col]) - parseInt(b[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setRequestedResolvedTickets(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...requestedResolvedTickets].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setRequestedResolvedTickets(sorted);
			setOrder("ASC");
		}
	};

	const sortingTicketNo = col => {
		if (order === "ASC") {
			const sorted = [...requestedResolvedTickets].sort((a, b) =>
				col === "ticketNo"
					? parseInt(a[col]) - parseInt(b[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setRequestedResolvedTickets(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...requestedResolvedTickets].sort((a, b) =>
				col === "ticketNo"
					? parseInt(b[col]) - parseInt(a[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setRequestedResolvedTickets(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="requestedticket-datatablelist__table">
				<>
					{loading ? (
						<div className="loading-container ">
							<h5> Tickets are loading. Please wait .... </h5>
						</div>
					) : (
						<>
							{requestedResolvedTickets.length === 0 ? (
								<div className="noavailability__container">
									<h3> No tickets available </h3>
								</div>
							) : (
								<>
									<table className="reopentickettable-container__tickets">
										<thead className="reopentableticket-header">
											<tr className="reopenticket-tablerow">
												<th className="reopentableheader-title">
													Ticket No.
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=" "
															onClick={() => sortingTicketNo("ticketNo")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>

												<th className="reopentableheader-title">
													Subject
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=" "
															onClick={() => sorting("ticketSubject")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>

												<th className="reopentableheader-title">
													Category
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=" "
															onClick={() => sorting("ticketCategory")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>

												<th className="reopentableheader-title">
													Date Created
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=" "
															onClick={() => sorting("createdAt")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>

												<th className="reopentableheader-title">
													Status
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=" "
															onClick={() => sorting("status")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
											</tr>
										</thead>
										<tbody className="requestedtickets-container__tablebody">
											{requestedResolvedTickets.map((ticket, index) => {
												const { _id: id } = ticket;
												return (
													<tr key={index} className="reopenticket-tablerow">
														<td
															className="reopentickettable-cell"
															onClick={() =>
																(window.location.pathname = `/client/${clientId}/${token}/requestedtickets/${id}`)
															}
															style={{
																cursor: "pointer",
																color: "#000",
															}}
														>
															<strong>{ticket.ticketNo}</strong>
														</td>

														<td className="reopentickettable-cell">
															{ticket.ticketSubject}
														</td>

														<td className="reopentickettable-cell">
															{ticket.ticketCategory}
														</td>

														<td className="reopentickettable-cell">
															{moment(ticket.createdAt).format(
																"DD/MM/YYYY HH:mm:ss"
															)}
														</td>

														<td className="reopentickettable-cell">
															<strong>{ticket.status.toUpperCase()}</strong>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</>
							)}
						</>
					)}
				</>
			</div>
		</>
	);
};

export default ResolvedTicketsClientList;
