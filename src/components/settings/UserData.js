import React, { useState, useEffect } from "react";
import "../../styles/updatedeleteviewingdata.css";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import AdminNavbar from "../navbar/AdminNavbar";
import { Buttons } from "../../assets/buttons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Textfield from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import instance from "../../axios/axios";

const UserData = () => {
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

	const param = useParams();
	const navigate = useNavigate();
	const [userClerkData, setUserClerkData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		role: "",
		contactNum: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setUserClerkData({ ...userClerkData, [input.name]: input.value });
	};

	const handleChangeForRole = event => {
		setUserClerkData({ ...userClerkData, role: event.target.value });
	};

	const updateData = async () => {
		setLoading(true);
		await instance
			.put(`/settings/user/${param.id}`, {
				firstName: userClerkData.firstName,
				lastName: userClerkData.lastName,
				email: userClerkData.email,
				role: userClerkData.role,
				contactNum: userClerkData.contactNum,
			})
			.then(response => {
				setLoading(false);
				toast.success(response.data.message);
				navigate("/settings");
			})
			.catch(error => {
				toast.error(error.response.data.message);
				if (error.response.status === 401) {
					window.location.href = "/login";
				}

				if (error.response.status === 500) {
					toast.error("Error occured while updating the data.");
					navigate("/settings");
				}

				if (error.response.status === 404) {
					toast.error(error.response.data.message);
					navigate("/settings");
				}
			});
		setLoading(false);
	};

	const deleteData = async () => {
		setLoading(true);
		await instance
			.delete(`/settings/user/${param.id}`)
			.then(response => {
				toast.success(response.data.message);
				navigate("/settings");
			})
			.catch(error => {
				toast.error(error.response.data.message);
				if (error.response.status === 401) {
					window.location.href = "/login";
				}

				if (error.response.status === 500) {
					toast.error("Error occured while updating the data.");
					navigate("/settings");
				}

				if (error.response.status === 404) {
					toast.error(error.response.data.message);
					navigate("/settings");
				}
			});
		setLoading(false);
	};

	useEffect(() => {
		const fetchUserClerkData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/getuser/${param.id}`)
				.then(response => {
					console.log(response.data);
					let userData = response.data.user;
					setUserClerkData(userData);
				})
				.catch(error => {
					toast.error(error.response.data.message);
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}

					if (error.response.status === 500) {
						toast.error("Error occured while updating the data.");
						navigate("/settings");
					}

					if (error.response.status === 404) {
						toast.error(error.response.data.message);
						navigate("/settings");
					}
				});
			setLoading(false);
		};

		fetchUserClerkData();
	}, [param, navigate]);

	return (
		<div className="settings-container">
			<div className="settings-container__wrapper">
				<div className="settings-container__nav">
					<AdminNavbar />
				</div>
				<div className="settings-container__content">
					<div className="settings-container__header">
						<Header />
					</div>

					<div className="header_viewingticket">
						<h3>
							Viewing {userClerkData.firstName} {userClerkData.lastName} details{" "}
						</h3>
					</div>

					{loading ? (
						<div className="container-ticket__loading">
							<h4> Loading please wait ...</h4>
						</div>
					) : (
						<>
							<div className="content-category-details">
								<div className="settings-details__data">
									<div className="settings-details__createdAt">
										<label> Date Joined</label>
										<nobr>
											{" "}
											<p className="requester-details__container">
												{moment(userClerkData.createdAt).format(
													"MMMM D YYYY, h:mm:ss a"
												)}
											</p>
										</nobr>
									</div>

									<div className="settings-details__createdAt">
										<label> Date updated </label>
										<nobr>
											<p className="requester-details__container">
												{moment(userClerkData.updatedAt).format(
													"MMMM D YYYY, h:mm:ss a"
												)}
											</p>
										</nobr>
									</div>
								</div>

								<div className="settings-settingdetailscontent">
									<div className="requestedticket-ticketcontent__wrapper">
										<div className="settings-details__name">
											<label> First Name </label>
											<input
												className="settings-details__namecontainer"
												onChange={handleChange}
												name="firstName"
												value={userClerkData.firstName}
												type="text"
												maxLength="50"
											></input>
										</div>

										<div className="settings-details__name" id="clerkData">
											<label> Last Name </label>
											<input
												className="settings-details__namecontainer"
												onChange={handleChange}
												name="lastName"
												value={userClerkData.lastName}
												type="text"
												maxLength="50"
											></input>
										</div>

										<div className="settings-details__name" id="clerkData">
											<label> Email Address </label>
											<div className="settings-details__clerkcontaineremail">
												<input
													className="settings-details__emailclerkcontainer"
													onChange={handleChange}
													name="email"
													value={userClerkData.email}
													type="text"
													maxLength="100"
												></input>
											</div>
										</div>

										<div className="settings-details__name" id="clerkData">
											<label> Contact Number </label>
											<input
												className="settings-details__namecontainer"
												onChange={handleChange}
												name="contactNum"
												value={userClerkData.contactNum}
												type="text"
												maxLength="11"
											></input>
										</div>

										<div className="settings-details__name" id="clerkData">
											<label> User Role </label>
											<Textfield
												select
												className="settings-details__namecontainer"
												onChange={handleChangeForRole}
												name="role"
												value={userClerkData.role}
												type="text"
												maxLength="50"
											>
												{clerkOptionValue.map((option, index) => (
													<MenuItem id={index} value={option.value}>
														{option.name}
													</MenuItem>
												))}
											</Textfield>
										</div>

										<div className="settings-details__buttons">
											<div className="settings-buttons__delete">
												<Buttons
													buttonSize="btn--medium"
													buttonStyle="btn--danger__solid"
													onClick={deleteData}
												>
													Delete
												</Buttons>
											</div>

											<div className="settings-buttons__update">
												<Buttons
													buttonSize="btn--medium"
													buttonStyle="btn--secondary__solid"
													onClick={updateData}
												>
													Update
												</Buttons>
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserData;
