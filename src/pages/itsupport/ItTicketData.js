import React, { useState, useEffect } from "react";
import "../../styles/requestedticket.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import ItNavbar from "../../components/navbar/ItNavbar";
import Header from "../../components/Header";
import moment from "moment";
import instance from "../../axios/axios";
import { Buttons } from "../../assets/buttons";
import VoidTicketModal from "../../components/modals-it/VoidTicketModal";
import ResolveTicketModal from "../../components/modals-it/ResolveTicketModal";

const ItTicketData = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [voidTicketModal, setVoidTicketModal] = useState(false);
	const [resolvedTicketModalOpen, setResolvedTicketModalOpen] = useState(false);

	const [ticket, setTicket] = useState({
		_id: "",
		requester: "",
		requesterName: "",
		clientUnit: "",
		clientContactNum: "",
		ticketCategory: "",
		ticketSubject: "",
		ticketDescription: "",
		updatedAt: "",
		createdAt: "",
		status: "",
		ticketNo: "",
		assignBy: "",
		assignTo: "",
	});

	useEffect(() => {
		const getRequestedTicket = async () => {
			setLoading(true);
			await instance
				.get(`/tickets/itsupport/assignedtickets/${param.id}`)
				.then(response => {
					let requestedticket = response.data.ticket;
					setTicket(requestedticket);
				})
				.catch(error => {
					if (error.response.status === 404) {
						toast.error(error.response.data.message);
						navigate("/itsupport/tickets");
					}
					if (error.response.status === 401) {
						window.location.href = "/login";
						// remove auth token
						sessionStorage.clear();
					}

					if (error.response.status === 500) {
						toast.error("Error occured while fetching the data.");
						navigate("/itsupport/tickets");
					}
				});
			setLoading(false);
		};

		getRequestedTicket();
	}, [param, navigate]);

	return (
		<>
			{voidTicketModal && <VoidTicketModal modalOpen={setVoidTicketModal} />}
			{resolvedTicketModalOpen && (
				<ResolveTicketModal modalOpen={setResolvedTicketModalOpen} />
			)}
			<div className="requestedticket-container">
				<div className="requestedticket-container__wrapper">
					<div className="requestedticket-container__nav">
						<ItNavbar />
					</div>
					<div className="requestedticket-container__content">
						<div className="requestedticket-container__header">
							<Header />
						</div>

						<div className="header_viewingticket">
							<h3>
								Viewing {ticket.status} Ticket No. {ticket.ticketNo}
							</h3>
						</div>

						{loading ? (
							<div className="container-ticket__loading">
								<h4> Ticket is loading please wait ...</h4>
							</div>
						) : (
							<div className="content-requestedticket-details">
								<div className="requestedticket-details__requester">
									<div className="requester-details__email">
										<label> Email </label>
										<p className="requester-details__container">
											{ticket.requester}
										</p>
									</div>
									<div className="requester-details__name">
										<label> Name </label>
										<p className="requester-details__container">
											{ticket.requesterName}
										</p>
									</div>
									<div className="requester-details__unit">
										<label> Unit </label>
										<p className="requester-details__container">
											{ticket.clientUnit}
										</p>
									</div>
									<div className="requester-details__contactnumber">
										<label> Contact Number </label>
										<p className="requester-details__container">
											{ticket.clientContactNum}
										</p>
									</div>

									<div className="requester-details__assingto">
										<label> Assign To: </label>
										<p className="requester-details__container">
											{ticket.assignTo}
										</p>
									</div>

									<div className="requester-details__assingto">
										<label> Assignee: </label>
										<p className="requester-details__container">
											{ticket.assignBy}
										</p>
									</div>
								</div>

								<div className="requestedticket-ticketcontent">
									<div className="requestedticket-ticketcontent__wrapper">
										<div className="requester-details__category">
											<label> Category </label>
											<p className="requester-details__container">
												{ticket.ticketCategory}
											</p>
										</div>

										<div className="requester-details__subject">
											<label> Subject </label>
											<p className="requester-details__container">
												{ticket.ticketSubject}
											</p>
										</div>

										<div className="requester-details__description">
											<label> Ticket Description </label>
											<p
												className="requester-details__container"
												id="category-container"
											>
												{ticket.ticketDescription}
											</p>
										</div>

										<div className="requester-details__createdlast">
											<label id="label-createdlast"> Created Last: </label>
											<label>
												{moment(ticket.createdAt).format(
													"MMMM D YYYY, h:mm:ss a"
												)}
											</label>
										</div>

										{(ticket.status === "Open" ||
											ticket.status === "Overdue") && (
											<>
												<div className="submitform-container__btn">
													<div className="submitform-modal__buttons">
														<div className="modal-btns__wrapper">
															<div className="modal-btn__rejectticket">
																<Buttons
																	buttonSize="btn--medium"
																	buttonStyle="btn--danger__solid"
																	onClick={() => {
																		setVoidTicketModal(true);
																	}}
																>
																	VOID TICKET
																</Buttons>
															</div>

															<div className="modal-btn__confirmticket">
																<Buttons
																	buttonSize="btn--medium"
																	buttonStyle="btn--primary__solid"
																	onClick={() => {
																		setResolvedTicketModalOpen(true);
																	}}
																>
																	SUBMIT RESOLVED
																</Buttons>
															</div>
														</div>
													</div>
												</div>
											</>
										)}
										{ticket.status === "Resolved" && (
											<>
												<div className="requester-details__category">
													<label> Resolution Name </label>
													<p className="requester-details__container">
														{ticket.solution}
													</p>
												</div>

												<div className="requester-details__description">
													<label> Ticket Remarks </label>
													<p
														className="requester-details__container"
														id="category-container"
													>
														{ticket.remarks}
													</p>
												</div>

												<div
													className="requester-details__createdlast"
													id="ticketRejected-details"
												>
													<label id="label-createdlast"> Date Resolved: </label>
													<label>
														{moment(ticket.resolvedAt).format(
															"MMMM D YYYY, h:mm:ss a"
														)}
													</label>
												</div>
											</>
										)}
										{ticket.status === "Voided" && (
											<>
												<div className="requester-details__category">
													<label> Void Reason </label>
													<p className="requester-details__container">
														{ticket.voidReason}
													</p>
												</div>

												<div className="requester-details__description">
													<label> Ticket Remarks </label>
													<p
														className="requester-details__container"
														id="category-container"
													>
														{ticket.remarks}
													</p>
												</div>

												<div
													className="requester-details__createdlast"
													id="ticketRejected-details"
												>
													<label id="label-createdlast"> Date Voided: </label>
													<label>
														{moment(ticket.voidedAt).format(
															"MMMM D YYYY, h:mm:ss a"
														)}
													</label>
												</div>
											</>
										)}
										{ticket.status === "Reopened" && (
											<>
												<div className="requester-details__category">
													<label> Resolution Name </label>
													<p className="requester-details__container">
														{ticket.solution}
													</p>
												</div>

												<div className="requester-details__description">
													<label> Ticket Remarks </label>
													<p
														className="requester-details__container"
														id="category-container"
													>
														{ticket.remarks}
													</p>
												</div>

												<div
													className="requester-details__createdlast"
													id="ticketRejected-details"
												>
													<label id="label-createdlast"> Date Resolved: </label>
													<label>
														{moment(ticket.resolvedAt).format(
															"MMMM D YYYY, h:mm:ss a"
														)}
													</label>
												</div>

												<div className="requester-details__category">
													<label> Issue Encountered </label>
													<p className="requester-details__container">
														{ticket.issue}
													</p>
												</div>
												<div
													className="requester-details__createdlast"
													id="ticketRejected-details"
												>
													<label id="label-createdlast"> Date Reopened: </label>
													<label>
														{moment(ticket.reopenedAt).format(
															"MMMM D YYYY, h:mm:ss a"
														)}
													</label>
												</div>
												<div className="submitform-container__btn">
													<div className="submitform-modal__buttons">
														<div className="modal-btns__wrapper">
															<div className="modal-btn__rejectticket">
																<Buttons
																	buttonSize="btn--medium"
																	buttonStyle="btn--danger__solid"
																	onClick={() => {
																		setVoidTicketModal(true);
																	}}
																>
																	VOID TICKET
																</Buttons>
															</div>

															<div className="modal-btn__confirmticket">
																<Buttons
																	buttonSize="btn--medium"
																	buttonStyle="btn--primary__solid"
																	onClick={() => {
																		setResolvedTicketModalOpen(true);
																	}}
																>
																	SUBMIT RESOLVED
																</Buttons>
															</div>
														</div>
													</div>
												</div>
											</>
										)}
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ItTicketData;
