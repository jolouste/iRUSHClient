import React, { useState, useRef } from "react";
import "../../styles/addcategorymodal.css";
import { Buttons } from "../../assets/buttons";
import Textfield from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/rejectrequestmodal.css";
import instance from "../../axios/axios";
import Circularspinner from "../spinner/Circularspinner";

const AddRejectReasonModal = ({ modalOpen }) => {
	const [addRejectReason, setAddRejectReasonData] = useState({
		rejectReasonName: "",
		description: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setAddRejectReasonData({ ...addRejectReason, [input.name]: input.value });
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

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		await instance
			.post(`/settings/createrejectreason`, addRejectReason)
			.then(response => {
				setMessage(response.data.message);
				toast.success(response.data.message);
				setLoading(true);
				modalOpen(false);
			})
			.catch(error => {
				if (error.response.status === 401) {
					window.location.href = "/login";
					sessionStorage.clear();
				}
				setError(error.response.data.message);

				setTimeout(() => {
					setError("");
				}, 3000);

				toast.error(error.response.data.message);
				setLoading(false);
			});
		setLoading(false);
	};

	return (
		<>
			<div
				onClick={closeModal}
				ref={modalRef}
				className="addcategorymodal-container"
			>
				{!loading ? (
					<div className="addcategorymodal-modal">
						<div className="addcategorymodal-modal__wrapper">
							<div className="addcategorycontainer-modal__paragraph">
								<p className="addcategorymodal-text">add reject reason modal</p>
							</div>
						</div>

						<div className="addcategorymodal-input">
							<div className="container-addcategory__setting">
								<div className="categoryname__setting">
									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="Reject Reason Name"
											name="rejectReasonName"
											value={addRejectReason.rejectReasonName}
											onChange={handleChange}
											inputProps={{ maxLength: 80 }}
										/>
									</div>

									<div className="categorydescription-setting__input">
										<Textfield
											className="userinput-categorydescription"
											label="Reject Reason description"
											name="description"
											value={addRejectReason.description}
											onChange={handleChange}
											inputProps={{ maxLength: 250 }}
											sx={{
												"& .MuiInputBase-root": {
													height: 100,
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{error && <div className="error_message">{error}</div>}
						{message && <div className="message_message">{message}</div>}

						<div className="container-settings__buttons">
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
				) : (
					<Circularspinner />
				)}
			</div>
		</>
	);
};

export default AddRejectReasonModal;
