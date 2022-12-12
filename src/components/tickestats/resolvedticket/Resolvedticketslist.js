import React, { useState } from "react";
import sortIcon from "../../../images/svg/sort.svg";
import moment from "moment";

const Resolvedticketslist = ({
	resolvedTickets,
	loading,
	setResolvedTickets,
}) => {
	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...resolvedTickets].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setResolvedTickets(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...resolvedTickets].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setResolvedTickets(sorted);
			setOrder("ASC");
		}
	};

	const sortingTicketNo = col => {
		if (order === "ASC") {
			const sorted = [...resolvedTickets].sort((a, b) =>
				col === "ticketNo"
					? parseInt(a[col]) - parseInt(b[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setResolvedTickets(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...resolvedTickets].sort((a, b) =>
				col === "ticketNo"
					? parseInt(b[col]) - parseInt(a[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setResolvedTickets(sorted);
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
				{loading ? (
					<div className="loading-container ">
						<h5> Tickets are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{resolvedTickets.length === 0 ? (
							<div className="noavailability__container">
								<h3> No tickets available </h3>
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
												Date Resolved
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
										</tr>
									</thead>
									<tbody>
										{resolvedTickets.map((ticket, index) => {
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
															(window.location.pathname = `/tickets/${id}`)
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
														{moment(ticket.resolvedAt).format(
															"MMMM D YYYY, h:mm:ss a"
														)}
													</td>
													<td className="tickettable-cell">
														<strong>{ticket.priority.toUpperCase()}</strong>
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
			</div>
		</>
	);
};

export default Resolvedticketslist;
