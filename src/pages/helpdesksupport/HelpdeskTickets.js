import React, { useState } from "react";
import "../../styles/tickets.css";
import HelpdeskNavbar from "../../components/navbar/HelpdeskNavbar";
import Header from "../../components/Header";
import HelpdeskOpenTickets from "./tickets/HelpdeskOpenTickets";
import HelpdeskResolvedTicket from "./tickets/HelpdeskResolvedTickets";
import HelpdeskOverdueTickets from "./tickets/HelpdeskOverdueTickets";
import HelpdeskRejectedTickets from "./tickets/HelpdeskRejectedTickets";
import HelpdeskReopenedTickets from "./tickets/HelpdeskReopenedTickets";

const HelpdeskTickets = () => {
	const ticketNav = [
		{
			id: 1,
			name: "Open Tickets",
		},
		{
			id: 2,
			name: "Resolved Tickets",
		},
		{
			id: 3,
			name: "Overdue Tickets",
		},
		{
			id: 4,
			name: "Rejected Tickets",
		},
		{
			id: 5,
			name: "Reopened Tickets",
		},
	];

	const [isClicked, setIsClicked] = useState(0);
	const [ticketNavId, setTicketNavId] = useState(1);

	const onClick = id => {
		setIsClicked(!isClicked);
		setTicketNavId(id);
	};

	return (
		<>
			<div className="tickets-container">
				<div className="tickets-container__wrapper">
					<div className="tickets-container__nav">
						<HelpdeskNavbar />
					</div>
					<div className="tickets-container__content">
						<div className="tickets-container__header">
							<Header />
						</div>

						<div className="ticket-container__content__wrapper">
							<div className="ticket-content__ticketstatistics">
								<div className="ticket-content__ticketstatistics-container">
									<div className="ticketstatistics-header">
										<h4> Ticket Statistics </h4>

										<div className="ticketstatistic-navigationcontainer">
											<div className="ticketstatistic-nav__wrapper">
												{ticketNav.map((nav, index) => (
													<div
														key={nav.id}
														className="ticketstatistic-nav__item"
														style={{ cursor: "pointer" }}
													>
														<p
															onClick={onClick.bind(this, nav.id)}
															className={`${
																ticketNavId === nav.id && "active"
															}`}
														>
															{nav.name}
														</p>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="ticketstatistics-container__content">
								<HelpdeskOpenTickets ticketNavId={ticketNavId} />
								<HelpdeskResolvedTicket ticketNavId={ticketNavId} />
								<HelpdeskOverdueTickets ticketNavId={ticketNavId} />
								<HelpdeskRejectedTickets ticketNavId={ticketNavId} />
								<HelpdeskReopenedTickets ticketNavId={ticketNavId} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HelpdeskTickets;
