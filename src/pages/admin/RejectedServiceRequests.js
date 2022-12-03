import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/newservicerequest.css";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Circularspinner from "../../components/spinner/Circularspinner";
import instance from "../../axios/axios";

const RejectedServiceRequests = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [serviceRequestData, setServiceRequestData] = useState({
		_id: "",
		requester: "",
		requesterEmail: "",
		clientUnit: "",
		clientContact: "",
		category: "",
		subject: "",
		description: "",
		referenceNo: "",
		requestNo: "",
		createdAt: "",
	});

	useEffect(() => {
		const fetchRejectedServiceRequest = async () => {
			setLoading(true);
			await instance
				.get(`/tickets/rejectedservicerequests/${param.id}`)
				.then(response => {
					let rejectrequestData = response.data.rejectedservicerequest;
					setServiceRequestData(rejectrequestData);
				})
				.catch(error => {
					if (error.response.status === 404) {
						toast.error(error.response.data.message);
						navigate("/servicerequests");
					}
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}

					if (error.response.status === 500) {
						toast.error("Error occured while fetching the data.");
						navigate("/servicerequests");
					}
				});

			setLoading(false);
		};

		fetchRejectedServiceRequest();
	}, [param, navigate]);

	return (
		<>
			<div className="newservicereq-container">
				<div className="newservicereq-container__wrapper">
					<div className="newservicereq-container__nav">
						<AdminNavbar />
					</div>
					<div className="newservicereq-container__content">
						<div className="newservicereq-container__header">
							<Header />
						</div>

						<div className="header_viewingticket">
							<h3>
								Viewing Rejected Service Request No.{" "}
								{serviceRequestData.requestNo}
							</h3>
						</div>
						{!loading ? (
							<div className="content-newservicereq-details">
								<div className="newservicereq-details__requester">
									<div className="requester-details__email">
										<label> Email </label>
										<p className="requester-details__container">
											{serviceRequestData.requesterEmail}
										</p>
									</div>
									<div className="requester-details__name">
										<label> Name </label>
										<p className="requester-details__container">
											{serviceRequestData.requester}
										</p>
									</div>
									<div className="requester-details__unit">
										<label> Unit </label>
										<p className="requester-details__container">
											{serviceRequestData.clientUnit}
										</p>
									</div>
									<div className="requester-details__contactnumber">
										<label> Contact Number </label>
										<p className="requester-details__container">
											{serviceRequestData.clientContact}
										</p>
									</div>
								</div>

								<div className="newservicereq-ticketcontent">
									<div className="newservicereq-ticketcontent__wrapper">
										<div className="requester-details__referencenumber">
											<label> Reference Number </label>
											<p className="requester-details__container">
												{serviceRequestData.referenceNo}
											</p>
										</div>
										<div className="requester-details__category">
											<label> Category </label>
											<p className="requester-details__container">
												{serviceRequestData.category}
											</p>
										</div>

										<div className="requester-details__subject">
											<label> Subject </label>
											<p className="requester-details__container">
												{serviceRequestData.subject}
											</p>
										</div>

										<div className="requester-details__description">
											<label> Ticket Description </label>
											<p
												className="requester-details__container"
												id="category-container"
											>
												{serviceRequestData.description}
											</p>
										</div>
										<div className="requester-details__createdlast">
											<label id="label-createdlast"> Date Requested:</label>
											<label>
												{moment(serviceRequestData.requestedAt).format(
													"YYYY-MM-DD HH:mm:ss"
												)}
											</label>
										</div>

										<div
											className="requester-details__createdlast"
											id="rejectedLast"
										>
											<label id="label-rejecttedlast"> Date Rejected: </label>
											<label>
												{moment(serviceRequestData.rejectedAt).format(
													"YYYY-MM-DD HH:mm:ss"
												)}
											</label>
										</div>
									</div>
								</div>
							</div>
						) : (
							<Circularspinner />
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default RejectedServiceRequests;
