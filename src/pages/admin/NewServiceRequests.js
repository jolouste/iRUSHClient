import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/newservicerequest.css";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { Buttons } from "../../assets/buttons";
import RejectRequestModal from "../../components/modals/RejectRequestModal";
import Circularspinner from "../../components/spinner/Circularspinner";
import instance from "../../axios/axios";

const NewServiceRequests = () => {
	const [rejectServiceModalOpen, setRejectServiceModalOpen] = useState(false);

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
		attachments: "",
	});
	const [clerkData, setClerkData] = useState([]);
	const priorityOptions = [
		{ id: 1, value: "High", name: "High" },
		{ id: 2, value: "Mid", name: "Mid" },
		{ id: 3, value: "Low", name: "Low" },
	];

	useEffect(() => {
		const fetchUsers = async () => {
			await instance
				.get(`/settings/fetchusers`)
				.then(response => {
					let clerks = response.data;
					setClerkData(clerks);
				})
				.catch(error => {
					console.log(error);
					if (error.response.status === 401) {
						window.location.href = "/login";
					}
				});
		};

		fetchUsers();
	}, []);

	useEffect(() => {
		const getRequesterServiceRequest = async () => {
			setLoading(true);

			try {
				await instance
					.get(`/tickets/servicerequests/${param.id}`)
					.then(response => {
						console.log(response.data);
						let servicereqdata = response.data.service;
						setServiceRequestData(servicereqdata);
					});
			} catch (error) {
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
			}

			setLoading(false);
		};

		getRequesterServiceRequest();
	}, [param, navigate]);

	const [requestService, setRequestService] = useState({
		assignTo: "",
		priority: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setRequestService({ ...requestService, [input.name]: input.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setLoading(true);

		try {
			const url = `/tickets/servicerequests/${param.id}`;
			await instance.post(url, requestService).then(response => {
				toast.success(response.data.message);
				navigate("/servicerequests");
			});
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status < 500
			) {
				toast.error(error.response.data.message);
			}

			if (error.response.status === 401) {
				window.location.href = "/login";
			}

			setLoading(false);
		}
	};

	return (
		<>
			{rejectServiceModalOpen && (
				<RejectRequestModal modalOpen={setRejectServiceModalOpen} />
			)}

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
								Viewing New Service Request No. {serviceRequestData.requestNo}
							</h3>
						</div>

						{loading ? (
							<Circularspinner />
						) : (
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
									</div>

									<div className="requester-details__createdlast">
										<label id="label-createdlast"> Requested At: </label>
										<label>
											{moment(serviceRequestData.createdAt).format(
												"YYYY-MM-DD HH:mm:ss"
											)}
										</label>
									</div>

									{/* if the user has attached file */}
									{serviceRequestData.attachments && (
										<div className="requester-details__subject">
											<label> Attachments </label>
											<p>
												<a
													className="requester-details__container"
													href={`${serviceRequestData.attachments}`}
												>
													{serviceRequestData.attachments}
												</a>
											</p>
										</div>
									)}

									<div className="assignticketandpriority-container">
										<div className="assignticketandpriority-container__wrapper">
											<div className="assigntickettoclerk-dropdown">
												<label> Assign the ticket: </label>
												<select
													className="assigntickettoclerk-dropdown__select"
													onChange={handleChange}
													name="assignTo"
													value={requestService.assignTo}
												>
													<option disabled label="Choose one"></option>
													{clerkData.map(clerk => (
														<option
															key={clerk._id}
															value={clerk.email}
															name="assignTo"
															className="assigntickettoclerk-dropdown__option"
														>
															{clerk.email}
														</option>
													))}
												</select>
											</div>
											<div className="priority-dropdown">
												<label> Priority: </label>
												<select
													id="priority__dropdown"
													className="priority-dropdown__select"
													name="priority"
													value={requestService.priority}
													onChange={handleChange}
												>
													<option disabled label="Set priority"></option>
													{priorityOptions.map(priorityOption => (
														<option
															key={priorityOption.value}
															value={priorityOption.value}
															className="priority-dropdown__option"
															name="priority"
														>
															{priorityOption.value}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>

									<div className="submitform-container__btn">
										<div className="submitform-modal__buttons">
											<div className="modal-btns__wrapper">
												<div className="modal-btn__rejectticket">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--secondary__solid"
														onClick={() => setRejectServiceModalOpen(true)}
													>
														REJECT REQUEST
													</Buttons>
												</div>

												<div className="modal-btn__confirmticket">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--primary__solid"
														onClick={handleSubmit}
													>
														SUBMIT AS TICKET
													</Buttons>
												</div>
											</div>
										</div>
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

export default NewServiceRequests;
