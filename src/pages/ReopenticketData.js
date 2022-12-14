import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/reopenticketpage.css";
import ustLogoblck from "../images/img/UST_logoblack.png";
import moment from "moment";
import Circularspinner from "../components/spinner/Circularspinner";
import Pagebroken from "../components/Pagebroken";
import instanceNoAuth from "../axios/instanceNoAuth";
import { Buttons } from "../assets/buttons";
import { Serviceformsuccess } from "../components/modals/Serviceformsuccess";

const ReopenticketData = () => {
	const param = useParams();
	const [loading, setLoading] = useState(false);
	const [validUrl, setValidUrl] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [requestedResolvedTickets, setRequestedResolvedTickets] = useState({
		requesterName: "",
		requesterEmail: "",
		clietnContactNum: "",
		assignBy: "",
		assignTo: "",
		status: "",
		ticketCategory: "",
		ticketSubject: "",
		ticketDescription: "",
		voidReason: "",
		solution: "",
		rejectReason: "",
		voidedAt: "",
		resolvedAt: "",
		rejectedAt: "",
		createdAt: "",
		updatedAt: "",
		isReopened: "",
	});

	useEffect(() => {
		const verifyUrl = async () => {
			setLoading(true);
			setValidUrl(true);
			try {
				setLoading(true);
				await instanceNoAuth
					.get(
						`/clients/client/${param.id}/${param.token}/requestedtickets/${param.ticketId}`
					)
					.then(response => {
						console.log(response.data);
						toast.success(response.data.message);
						let requestedTicketsData = response.data.requestedTicket;
						setRequestedResolvedTickets(requestedTicketsData);
					});
			} catch (error) {
				setValidUrl(false);
				console.log(error);
				toast.error(error.response.data.message);
			}

			setLoading(false);
		};

		verifyUrl();
	}, [param]);

	const [reopenIssueData, setReopenIssueData] = useState({
		issue: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setReopenIssueData({ ...reopenIssueData, [input.name]: input.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await instanceNoAuth
				.post(
					`/clients/client/${param.id}/${param.token}/requestedtickets/${param.ticketId}`,
					reopenIssueData
				)
				.then(response => {
					toast.success(response.data.message);
					setReopenIssueData({ issue: "" });
					setSubmitted(true);
				});
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
		setLoading(false);
	};

	return (
		<>
			{validUrl ? (
				<div className="servicerequest-container">
					{!submitted ? (
						<div className="servicerequest-container__wrapper">
							{!loading ? (
								<>
									<div className="servicerequest-container__header">
										<Link to="/" style={{ color: "#000" }}>
											<div className="servicerequest-header">
												<div className="servicerequest-header__logo">
													<img
														id="servicereq-ustlogoblck"
														src={ustLogoblck}
														alt=" "
													/>
												</div>

												<div className="servicerequest-header--text">
													<h6 id="servicereqheader__ust">
														{" "}
														Pontifical and Royal{" "}
													</h6>
													<h1 id="servicereqheader__ust-sch">
														University of Santo Tomas
													</h1>
													<h6 id="servicereqheader__ust">
														The Catholic University of the Philippines
													</h6>
												</div>
											</div>
										</Link>
									</div>

									<div className="servicerequest-container__form">
										<div className="servicerequest-form">
											<h4> Requested Tickets</h4>
										</div>

										<div className="servicerequest-form__clientdetails">
											<div className="clientdetails-firstlayer">
												<div className="container-clientdetails__name">
													<div className="clientdetails__name">
														<label> Name </label>
													</div>
													<div className="cotainer-name__clientinput">
														<div className="clientname-input">
															<p className="form-client__input">
																{requestedResolvedTickets.requesterName}
															</p>
														</div>
													</div>
												</div>
												<div className="container-clientdetails__contactnum">
													<div className="clientdetails__contactnumber">
														<label> Contact Number </label>
													</div>

													<div className="cotainer-contactnumber__clientinput">
														<div className="clientcontactnumber-input">
															<p className="form-client__input">
																{requestedResolvedTickets.clientContactNum}
															</p>
														</div>
													</div>
												</div>
											</div>

											<div className="clientdetails-secondlayer">
												<div className="container-clientdetails__unit">
													<div className="clientdetails__unit">
														<label> Unit </label>
													</div>
													<div className="cotainer-unit__clientinput">
														<div className="clientunit-input">
															<p className="form-client__input">
																{requestedResolvedTickets.clientUnit}
															</p>
														</div>
													</div>
												</div>

												<div className="container-clientdetails__course">
													<div className="clientdetails__course">
														<label> Requested At </label>
													</div>
													<div className="cotainer-course__clientinput">
														<div className="clientcourse-input">
															<p className="form-client__input">
																{moment(
																	requestedResolvedTickets.requestedAt
																).format("MMMM D YYYY, h:mm:ss a")}
															</p>
														</div>
													</div>
												</div>
											</div>

											<div className="clientdetails-thirdlayer">
												<div className="container-clientdetails__category">
													<div className="clientdetails__category">
														<label>Category</label>
													</div>
													<div className="cotainer-course__clientinput">
														<div className="clientcategory-input">
															<p className="form-client__input">
																{requestedResolvedTickets.ticketCategory}
															</p>
														</div>
													</div>
												</div>
											</div>

											<div className="clientdetails-fifthlayer">
												<div className="container-clientdetails__description">
													<div className="requester-details__description">
														<label style={{ fontSize: "15px" }}>
															Ticket Description
														</label>
														<p
															className="requester-details__container"
															id="category-container"
														>
															{requestedResolvedTickets.ticketDescription}
														</p>
													</div>
												</div>
											</div>
											{requestedResolvedTickets.status === "Resolved" && (
												<>
													<div className="reopenticket-status__container">
														Resolved At:
														<label>
															{moment(
																requestedResolvedTickets.resolvedAt
															).format("MMMM D YYYY, h:mm:ss a")}
														</label>
													</div>
													<div className="clientdetails-thirdlayer">
														<div className="container-clientdetails__category">
															<div className="clientdetails__category">
																<label> Solution Name </label>
															</div>
															<div className="cotainer-course__clientinput">
																<div className="clientcategory-input">
																	<p className="form-client__input">
																		{requestedResolvedTickets.solution}
																	</p>
																</div>
															</div>
														</div>
													</div>
													<div className="clientdetails-fifthlayer">
														<div className="container-clientdetails__description">
															<div className="requester-details__description">
																<label style={{ fontSize: "15px" }}>
																	Remarks
																</label>
																<p
																	className="requester-details__container"
																	id="category-container"
																>
																	{requestedResolvedTickets.remarks}
																</p>
															</div>
														</div>
													</div>

													<div className="clientdetails-fifthlayer">
														<div className="container-clientdetails__description">
															<div className="clientdetails__description">
																<label>
																	Issue <span id="asterisk"> &lowast;</span>
																</label>
															</div>
															<div className="cotainer-description__clientinput">
																<div className="clientdescription-input">
																	<input
																		className="form-client__input--description"
																		placeholder="Briefly discuss your issue"
																		name="issue"
																		onChange={handleChange}
																		value={reopenIssueData.issue}
																		type="text"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="container-clientdetails__formbutton">
														<div className="clientdetails__formbutton">
															<Buttons
																buttonSize="btn--medium"
																buttonStyle="btn--primary__solid"
																onClick={handleSubmit}
															>
																Submit
															</Buttons>
														</div>
													</div>
												</>
											)}
											{requestedResolvedTickets.status === "Voided" && (
												<>
													<div className="reopenticket-status__container">
														Voided At:
														<label>
															{moment(requestedResolvedTickets.voidedAt).format(
																"MMMM D YYYY, h:mm:ss a"
															)}
														</label>
													</div>
													<div className="clientdetails-thirdlayer">
														<div className="container-clientdetails__category">
															<div className="clientdetails__category">
																<label> Void Reason </label>
															</div>
															<div className="cotainer-course__clientinput">
																<div className="clientcategory-input">
																	<p className="form-client__input">
																		{requestedResolvedTickets.voidReason}
																	</p>
																</div>
															</div>
														</div>
													</div>
													<div className="clientdetails-fifthlayer">
														<div className="container-clientdetails__description">
															<div className="requester-details__description">
																<label style={{ fontSize: "15px" }}>
																	Remarks
																</label>
																<p
																	className="requester-details__container"
																	id="category-container"
																>
																	{requestedResolvedTickets.remarks}
																</p>
															</div>
														</div>
													</div>
												</>
											)}
											{requestedResolvedTickets.status === "Reopened" && (
												<>
													<div className="reopenticket-status__container">
														Reopened At:
														<label>
															{moment(
																requestedResolvedTickets.reopenedAt
															).format("MMMM D YYYY, h:mm:ss a")}
														</label>
													</div>
													<div className="clientdetails-thirdlayer">
														<div className="container-clientdetails__category">
															<div className="clientdetails__category">
																<label> Issue </label>
															</div>
															<div className="cotainer-course__clientinput">
																<div className="clientcategory-input">
																	<p className="form-client__input">
																		{requestedResolvedTickets.issue}
																	</p>
																</div>
															</div>
														</div>
													</div>
												</>
											)}
											{requestedResolvedTickets.status === "Rejected" && (
												<>
													<div className="reopenticket-status__container">
														Rejected At:
														<label>
															{moment(
																requestedResolvedTickets.rejectedAt
															).format("MMMM D YYYY, h:mm:ss a")}
														</label>
													</div>
													<div className="clientdetails-thirdlayer">
														<div className="container-clientdetails__category">
															<div className="clientdetails__category">
																<label> Reject Reason </label>
															</div>
															<div className="cotainer-course__clientinput">
																<div className="clientcategory-input">
																	<p className="form-client__input">
																		{requestedResolvedTickets.rejectReason}
																	</p>
																</div>
															</div>
														</div>
													</div>
													<div className="clientdetails-fifthlayer">
														<div className="container-clientdetails__description">
															<div className="requester-details__description">
																<label style={{ fontSize: "15px" }}>
																	Remarks
																</label>
																<p
																	className="requester-details__container"
																	id="category-container"
																>
																	{requestedResolvedTickets.remarks}
																</p>
															</div>
														</div>
													</div>
												</>
											)}
											{(requestedResolvedTickets.status === "Overdue" ||
												requestedResolvedTickets.status === "Open") && (
												<>
													<div className="reopenticket-status__container">
														Date Accepted:
														<label>
															{moment(
																requestedResolvedTickets.createdAt
															).format("MMMM D YYYY, h:mm:ss a")}
														</label>
													</div>
												</>
											)}
										</div>
									</div>
								</>
							) : (
								<Circularspinner />
							)}
						</div>
					) : (
						<Serviceformsuccess />
					)}
				</div>
			) : (
				<Pagebroken />
			)}
		</>
	);
};

export default ReopenticketData;
