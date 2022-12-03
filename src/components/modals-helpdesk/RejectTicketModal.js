import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/rejectrequestmodal.css";
import { Buttons } from "../../assets/buttons";
import Circularspinner from "../spinner/Circularspinner";
import instance from "../../axios/axios";

const RejectTicketModal = ({ modalOpen }) => {
	const navigate = useNavigate();
	const param = useParams();
	const [rejectRequestData, setRejectRequestData] = useState({
		rejectReason: "",
		remarks: "",
	});
	const [rejectreason, setRejectReason] = useState([]);
	const handleChange = ({ currentTarget: input }) => {
		setRejectRequestData({ ...rejectRequestData, [input.name]: input.value });
	};

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const modalRef = useRef();

	const closeModal = e => {
		if (modalRef.current === e.target) {
			modalOpen(false);
		}
	};

	useEffect(() => {
		const fetchRejectReason = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchrejectreason`)
				.then(response => {
					let rejectReasonData = response.data.rejectReason;
					setRejectReason(rejectReasonData);
				})
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			setLoading(false);
		};

		fetchRejectReason();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await instance
				.post(
					`/tickets/helpdesk/assignedtickets/rejectticket/${param.id}`,
					rejectRequestData
				)
				.then(response => {
					setMessage(response.data.message);
					toast.success(response.data.message);
					navigate("/helpdesksupport/tickets");
				});
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status < 500
			) {
				setError(error.response.data.message);
			}

			setTimeout(() => {
				setError("");
			}, 3000);

			setTimeout(() => {
				setError("");
			}, 3000);

			if (error.response.status === 401) {
				window.location.href = "/login";
				sessionStorage.clear();
			}
		}

		setLoading(false);
	};

	return (
		<>
			<div
				onClick={closeModal}
				ref={modalRef}
				className="rejectrequestmodal-container"
			>
				{!loading ? (
					<div className="rejectrequestmodal-modal">
						<>
							<div className="rejectrequestcontainer-modal__wrapper">
								<div className="rejectrequestcontainer-modal__paragraph">
									<p className="rejectrequestmodal-text">
										Before submitting as rejected, please state the reason why
									</p>
								</div>

								<div className="rejectrequestmodal-input">
									<div className="container-rejectreason__requestservice">
										<div className="rejectreason__requestservice">
											<label> Reason for Rejecting </label>

											<div className="rejectreason-container__dropdown">
												<select
													className="rejectreason-dropdown__requestservice"
													onChange={handleChange}
													name="rejectReason"
													value={rejectRequestData.rejectReason}
												>
													<option disabled label="Choose one"></option>
													{rejectreason.map((rejectreason, index) => (
														<option
															key={index}
															value={rejectreason.rejectReasonName}
														>
															{rejectreason.rejectReasonName}
														</option>
													))}
												</select>
											</div>
										</div>

										<div className="remarks__requestservice">
											<label> Remarks </label>

											<div className="rejectreason-container__input">
												<input
													onChange={handleChange}
													value={rejectRequestData.remarks}
													className="rejectreason-input__requestservice"
													name="remarks"
												/>
											</div>
										</div>

										{error && <div className="error_message">{error}</div>}
										{message && (
											<div className="message_message">{message}</div>
										)}

										<div className="container-modal__buttons">
											<div className="modal-btns__wrapper">
												<div className="modal-btn__close">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--secondary__solid"
														onClick={() => modalOpen(false)}
													>
														CLOSE
													</Buttons>
												</div>

												<div className="modal-btn__confirm">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--primary__solid"
														onClick={handleSubmit}
													>
														SUBMIT
													</Buttons>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					</div>
				) : (
					<Circularspinner />
				)}
			</div>
		</>
	);
};

export default RejectTicketModal;
