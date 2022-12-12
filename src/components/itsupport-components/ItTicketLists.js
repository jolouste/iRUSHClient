import React, { useState } from "react";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const HelpdeskTicketLists = ({
	loading,
	filteredTicketsData,
	setFilteredTicketData,
	error,
}) => {
	const [order, setOrder] = useState("ASC");
	console.log(filteredTicketsData);

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...filteredTicketsData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setFilteredTicketData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...filteredTicketsData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setFilteredTicketData(sorted);
			setOrder("ASC");
		}
	};

	const sortingTicketNo = col => {
		if (order === "ASC") {
			const sorted = [...filteredTicketsData].sort((a, b) =>
				col === "ticketNo"
					? parseInt(a[col]) - parseInt(b[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setFilteredTicketData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...filteredTicketsData].sort((a, b) =>
				col === "ticketNo"
					? parseInt(b[col]) - parseInt(a[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setFilteredTicketData(sorted);
			setOrder("ASC");
		}
	};

	//get the first characters of each word in ticket category
	const getFirstChar = ticketCategory => {
		const splitStr = ticketCategory.split(" ");
		let firstChar = "";
		for (let i = 0; i < splitStr.length; i++) {
			firstChar += splitStr[i].charAt(0);
		}
		return firstChar;
	};

	return (
		<>
			<div className="ticketcontainer-tickets__ticketlists">
				<>
					{loading ? (
						<div className="loading-container ">
							{error ? (
								<h5>{error.message}</h5>
							) : (
								<h5> Tickets are loading. Please wait ... </h5>
							)}
						</div>
					) : (
						<>
							{filteredTicketsData.length === 0 ? (
								<div className="noavailability__container">
									{error ? <h3> {error} </h3> : <h3> No tickets available </h3>}
								</div>
							) : (
								<>
									<table className="table-container__tickets">
										<thead className="tableticket-header">
											<tr>
												<th className="tableheader-title">
													Ticket No.
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sortingTicketNo("ticketNo")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
												<th className="tableheader-title">
													Subject
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sorting("ticketSubject")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
												<th className="tableheader-title">
													Requester
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sorting("requester")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
												<th className="tableheader-title">
													Unit
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sorting("clientUnit")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
												<th className="tableheader-title">
													Date Created
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sorting("createdAt")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
												<th className="tableheader-title">
													Priority
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sorting("priority")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
												<th className="tableheader-title">
													Status
													<span>
														<img
															id="sortIcon"
															src={sortIcon}
															alt=""
															onClick={() => sorting("status")}
															style={{ cursor: "pointer" }}
														/>
													</span>
												</th>
											</tr>
										</thead>
										<tbody>
											{filteredTicketsData.map((ticket, index) => {
												const { _id: id } = ticket;
												return (
													<tr key={index} className="tickettable-row">
														<td
															className="tickettable-cell"
															style={{
																cursor: "pointer",
																color: "#000",
															}}
															onClick={() =>
																(window.location.pathname = `/itsupport/tickets/${id}`)
															}
														>
															<strong>
																{" "}
																{ticket.ticketNo} -{" "}
																{getFirstChar(
																	ticket.ticketCategory
																).toUpperCase()}
															</strong>
														</td>
														<td className="tickettable-cell">
															{ticket.ticketSubject}
														</td>
														<td className="tickettable-cell">
															{ticket.requester}
														</td>
														<td className="tickettable-cell">
															{ticket.clientUnit.toUpperCase()}
														</td>
														<td className="tickettable-cell">
															{moment(ticket.createdAt).format(
																"MMMM D YYYY, h:mm:ss a"
															)}
														</td>
														<td className="tickettable-cell">
															<strong>{ticket.priority.toUpperCase()}</strong>
														</td>
														<td className="tickettable-cell">
															<strong>
																{ticket.status === "Rejected" ? (
																	<span style={{ color: "#d61c20" }}>
																		{ticket.status.toUpperCase()}
																	</span>
																) : (
																	<span> {ticket.status.toUpperCase()}</span>
																)}
															</strong>
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

export default HelpdeskTicketLists;
