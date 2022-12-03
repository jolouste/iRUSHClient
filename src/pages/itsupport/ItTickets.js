import React, { useState } from "react";
import "../../styles/tickets.css";
import ItNavbar from "../../components/navbar/ItNavbar";
import Header from "../../components/Header";
import ItOpenTickets from "./tickets/ItOpenTickets";
import ItOverdueTickets from "./tickets/ItOverdueTickets";
import ItResolvedTickets from "./tickets/ItResolvedTickets";
import ItVoidedTickets from "./tickets/ItVoidedTickets";
import ItReopenedTicket from "./tickets/ItReopenedTickets";

const ItTickets = () => {
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
			name: "Voided Tickets",
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
						<ItNavbar />
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
								<ItOpenTickets ticketNavId={ticketNavId} />
								<ItOverdueTickets ticketNavId={ticketNavId} />
								<ItResolvedTickets ticketNavId={ticketNavId} />
								<ItVoidedTickets ticketNavId={ticketNavId} />
								<ItReopenedTicket ticketNavId={ticketNavId} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ItTickets;
