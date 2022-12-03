import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/rejectrequestmodal.css";
import { Buttons } from "../../assets/buttons";
import Circularspinner from "../spinner/Circularspinner";
import instance from "../../axios/axios";

const ResolveTicketModal = ({ modalOpen }) => {
	const navigate = useNavigate();
	const param = useParams();
	const [resolvedTicketData, setResolvedTicketData] = useState({
		solution: "",
		remarks: "",
	});
	const [resolution, setResolution] = useState([]);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const modalRef = useRef();

	const handleChange = ({ currentTarget: input }) => {
		setResolvedTicketData({ ...resolvedTicketData, [input.name]: input.value });
	};

	const closeModal = e => {
		if (modalRef.current === e.target) {
			modalOpen(false);
		}
	};

	useEffect(() => {
		const fetchSolutionData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchsolution`)
				.then(response => {
					console.log(response.data);
					let solutionData = response.data.solution;
					setResolution(solutionData);
				})
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			setLoading(false);
		};

		fetchSolutionData();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await instance
				.post(
					`/tickets/helpdesk/assignedtickets/resolveticket/${param.id}`,
					resolvedTicketData
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
										Before submitting as resolved, please state the reason why
									</p>
								</div>

								<div className="rejectrequestmodal-input">
									<div className="container-rejectreason__requestservice">
										<div className="rejectreason__requestservice">
											<label> Reason for resolving </label>

											<div className="rejectreason-container__dropdown">
												<select
													className="rejectreason-dropdown__requestservice"
													onChange={handleChange}
													name="solution"
													value={resolvedTicketData.solution}
												>
													<option disabled label="Choose one"></option>
													{resolution.map((solution, index) => (
														<option key={index} value={solution.solution}>
															{solution.solutionName}
														</option>
													))}
												</select>
											</div>
										</div>

										<div className="remarks__requestservice">
											<label> Remarks </label>

											<div className="rejectreason-container__input">
												<input
													className="rejectreason-input__requestservice"
													name="remarks"
													value={resolvedTicketData.remarks}
													onChange={handleChange}
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

export default ResolveTicketModal;
