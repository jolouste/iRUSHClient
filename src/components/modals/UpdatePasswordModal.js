import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../../styles/addcategorymodal.css";
import { Buttons } from "../../assets/buttons";
import Textfield from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/rejectrequestmodal.css";
import Circularspinner from "../spinner/Circularspinner";
import instance from "../../axios/axios";

const UpdatePasswordModal = ({ modalOpen }) => {
	const [updatePasswordData, setUpdatePasswordData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const param = useParams();

	const handleChange = ({ currentTarget: input }) => {
		setUpdatePasswordData({ ...updatePasswordData, [input.name]: input.value });
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
		setLoading(true);
		await instance
			.post(`settings/updatePassword/${param.id}`, updatePasswordData)
			.then(response => {
				setMessage(response.data.message);
				toast.success(response.data.message);
				setLoading(true);
				modalOpen(false);
			})
			.catch(error => {
				if (error.response.status === 400) {
					setError(error.response.data.message);
				}

				setError(error.response.data.message);

				setTimeout(() => {
					setError("");
				}, 5000);
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
								<p className="addcategorymodal-text">User update password</p>
							</div>
						</div>

						<div className="addcategorymodal-input">
							<div className="container-addcategory__setting">
								<div className="categoryname__setting">
									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="Enter old password"
											name="oldPassword"
											value={updatePasswordData.oldPassword}
											onChange={handleChange}
											inputProps={{ maxLength: 80 }}
										/>
									</div>

									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="Enter new password"
											name="newPassword"
											type="password"
											value={updatePasswordData.newPassword}
											onChange={handleChange}
											inputProps={{ maxLength: 80 }}
										/>
									</div>

									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="Confirm new password"
											name="confirmPassword"
											type="password"
											value={updatePasswordData.confirmPassword}
											onChange={handleChange}
											inputProps={{ maxLength: 80 }}
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

export default UpdatePasswordModal;
