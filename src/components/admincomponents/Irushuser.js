import React from "react";

const Irushuser = ({ users }) => {
	return (
		<>
			{users.length === 0 ? (
				<div className="loading-container">
					<h5> No available irush users... </h5>
				</div>
			) : (
				<>
					<div className="servicereport-userscontainer">
						{users.map((users, index) => {
							return (
								<div key={index} className="servicereport-users">
									<div className="servicereport-users__details">
										<div className="servicereport-users__name">
											{users.firstName} {users.lastName}
										</div>
										<div className="servicereport-users__email">
											{users.email}
										</div>
										<div className="servicereport-users__role">
											{users.role}
										</div>
									</div>

									<div className="servicerport-users__otherdetails">
										<div className="servicereport-otherdetails__sla">
											<label className="servicereport_label">
												Average Resolution Time:
											</label>
											{users.averageResolutionTime}
										</div>
										<div className="servicereport-otherdetails__sla">
											<label className="servicereport_label">
												SLA Compliance Rate:
											</label>
											{users.rateSLA}%
										</div>
									</div>
									<div className="servicereport-otherdetails__sla">
										<label className="servicereport_label">
											Resolved Ticket:
										</label>
										{users.resolvedTickets}
									</div>
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};

export default Irushuser;
