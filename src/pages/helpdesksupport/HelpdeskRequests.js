import React, { useState } from "react";
import "../../styles/requestservice.css";
import HelpdeskNavbar from "../../components/navbar/HelpdeskNavbar";
import Header from "../../components/Header";
import HelpdeskNewServiceRequests from "../../components/servicerequests-helpdesk/HelpdeskNewServiceRequests";
import HelpdeskRejectedServiceRequests from "../../components/servicerequests-helpdesk/HelpdeskRejectedServiceRequests";
import HelpdeskReopenedTicketRequests from "../../components/servicerequests-helpdesk/HelpdeskReopenedTicketRequests";

const HelpdeskRequests = () => {
	const servicerequestsNav = [
		{
			id: 1,
			name: "New Service Requests",
		},
		{
			id: 2,
			name: "Reopen Ticket Requests",
		},
		{
			id: 3,
			name: "Rejected Service Requests",
		},
	];

	const [isClicked, setIsClicked] = useState(0);
	const [servicereqNavId, setServiceReqNavId] = useState(1);

	const onClick = id => {
		setIsClicked(!isClicked);
		setServiceReqNavId(id);
	};
	return (
		<>
			<div className="requestservice-container">
				<div className="requestservice-container__wrapper">
					<div className="requestservice-container__nav">
						<HelpdeskNavbar />
					</div>
					<div className="requestservice-container__content">
						<div className="requestservice-container__header">
							<Header />
						</div>

						<div className="requestservice-container__content__wrapper">
							<div className="requestservice-content__newservicerequests">
								<div className="requestservice-content__servicerequests-container">
									<div className="newservicerequests-header">
										<h4>Service Requests</h4>

										<div className="servicerequests-navigationcontainer">
											<div className="servicerequests-nav__wrapper">
												{servicerequestsNav.map((nav, index) => (
													<div
														key={nav.id}
														className="servicerequests-nav__item"
														style={{ cursor: "pointer" }}
													>
														<p
															onClick={onClick.bind(this, nav.id)}
															className={`${
																servicereqNavId === nav.id && "active"
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

							<div className="servicerequests-container__content">
								<HelpdeskNewServiceRequests servicereqNavId={servicereqNavId} />
								<HelpdeskReopenedTicketRequests
									servicereqNavId={servicereqNavId}
								/>
								<HelpdeskRejectedServiceRequests
									servicereqNavId={servicereqNavId}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HelpdeskRequests;
