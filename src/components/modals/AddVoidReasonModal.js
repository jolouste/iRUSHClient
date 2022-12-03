import React, { useState, useRef } from "react";
import "../../styles/addcategorymodal.css";
import { Buttons } from "../../assets/buttons";
import Textfield from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/rejectrequestmodal.css";
import instance from "../../axios/axios";
import Circularspinner from "../spinner/Circularspinner";

const AddVoidReasonModal = ({ modalOpen }) => {
	const [addVoidReason, setAddaddVoidReason] = useState({
		voidReasonName: "",
		description: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setAddaddVoidReason({
			...addVoidReason,
			[input.name]: input.value,
		});
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
			.post(`/settings/createvoidreason`, addVoidReason)
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
								<p className="addcategorymodal-text">add category modal</p>
							</div>
						</div>

						<div className="addcategorymodal-input">
							<div className="container-addcategory__setting">
								<div className="categoryname__setting">
									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="Void Reason Name"
											name="voidReasonName"
											value={addVoidReason.voidReasonName}
											onChange={handleChange}
											inputProps={{ maxLength: 80 }}
										/>
									</div>

									<div className="categorydescription-setting__input">
										<Textfield
											className="userinput-categorydescription"
											label="Void Reason description"
											name="description"
											value={addVoidReason.description}
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

export default AddVoidReasonModal;
