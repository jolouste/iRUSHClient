import React, { useState, useRef } from "react";
import "../../styles/addcategorymodal.css";
import { Buttons } from "../../assets/buttons";
import Textfield from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/rejectrequestmodal.css";
import instance from "../../axios/axios";
import Circularspinner from "../spinner/Circularspinner";

const AddUserModal = ({ modalOpen }) => {
	const clerkOptionValue = [
		{
			id: 1,
			name: "USER_SUPERADMIN",
			value: "USER_SUPERADMIN",
		},
		{
			id: 2,
			name: "USER_ADMIN",
			value: "USER_ADMIN",
		},
		{
			id: 3,
			name: "CLERK_HELPDESKSUPPORT",
			value: "CLERK_HELPDESKSUPPORT",
		},
		{
			id: 4,
			name: "CLERK_ITSUPPORT",
			value: "CLERK_ITSUPPORT",
		},
	];

	const [addUserModal, setAddUserModal] = useState({
		firstName: "",
		lastName: "",
		email: "",
		role: "",
		contactNum: "",
	});

	const handleChange = ({ currentTarget: input }) => {
		setAddUserModal({
			...addUserModal,
			[input.name]: input.value,
		});
	};

	const handleChangeForRole = event => {
		setAddUserModal({
			...addUserModal,
			role: event.target.value,
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
			.post(`/settings/createuser`, addUserModal)
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
								<p className="addcategorymodal-text">add user modal</p>
							</div>
						</div>

						<div className="addcategorymodal-input">
							<div className="container-addcategory__setting">
								<div className="categoryname__setting">
									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="First Name"
											name="firstName"
											value={addUserModal.firstName}
											onChange={handleChange}
											inputProps={{ maxLength: 50 }}
										/>
									</div>

									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="Last Name"
											name="lastName"
											value={addUserModal.lastName}
											onChange={handleChange}
											inputProps={{ maxLength: 50 }}
										/>
									</div>

									<div
										className="categorydescription-setting__input"
										id="clerkEmail_input"
									>
										<Textfield
											className="userinput-categorydescription"
											label="Email"
											name="email"
											value={addUserModal.email}
											onChange={handleChange}
											inputProps={{ maxLength: 50 }}
											sx={{
												"& .MuiInputBase-root": {
													height: 100,
												},
											}}
										/>
									</div>

									<div className="categoryname-setting__input">
										<Textfield
											select
											className="userinput-categoryname"
											label="role"
											name="role"
											value={addUserModal.role}
											onChange={handleChangeForRole}
										>
											{clerkOptionValue.map(option => (
												<MenuItem key={option.id} value={option.value}>
													{option.value}
												</MenuItem>
											))}
										</Textfield>
									</div>

									<div className="categoryname-setting__input">
										<Textfield
											className="userinput-categoryname"
											label="contact number"
											name="contactNum"
											value={addUserModal.contactNum}
											onChange={handleChange}
											inputProps={{ maxLength: 11 }}
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

export default AddUserModal;
