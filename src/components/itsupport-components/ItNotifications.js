import React from "react";
import "../../styles/helpdesksupport/notification.css";
import moment from "moment";

const HelpdeskNotifications = ({ assignedTicketData, error }) => {
	assignedTicketData.sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});

	return (
		<>
			<>
				{assignedTicketData.length === 0 ? (
					<div className="notificationloading-container">
						{error ? <h5> {error} </h5> : <h5> No notifications </h5>}
					</div>
				) : (
					<>
						<div className="notification-userscontainer">
							{assignedTicketData.map((ticket, index) => {
								return (
									<div key={index} className="notification-users">
										<div className="notification-ticket__details">
											<div className="notification-ticket__ticketdetails">
												{ticket.status === "Open"
													? `You have been assigned to Ticket #${ticket.ticketNo}: ${ticket.ticketCategory}`
													: ticket.status === "Resolved"
													? `You have resolved ticket #${ticket.ticketNo}: ${ticket.ticketCategory}`
													: ticket.status === "Overdue"
													? `Ticket #${ticket.ticketNo}: ${ticket.ticketCategory} is overdue`
													: ticket.status === "Voided"
													? `You have Voided ticket #${ticket.ticketNo}: ${ticket.ticketCategory}`
													: ticket.status === "Reopened"
													? `Ticket #${ticket.ticketNo}: ${ticket.ticketCategory} has been reopened`
													: null}
											</div>

											<div className="notification-ticket__tickettimestamp">
												{moment(ticket.createdAt).format(
													"MMMM D YYYY, h:mm:ss a"
												)}
											</div>

											<div className="notification-ticket__ticketdesc">
												{ticket.ticketDescription}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</>
				)}
			</>
		</>
	);
};

export default HelpdeskNotifications;
