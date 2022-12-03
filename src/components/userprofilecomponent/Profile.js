import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { useParams } from "react-router-dom";
import AdminNavbar from "../navbar/AdminNavbar";
import Header from "../Header";
import { Buttons } from "../../assets/buttons";
import UpdatePasswordModal from "../modals/UpdatePasswordModal";
import instance from "../../axios/axios";

const Profile = () => {
	const [userUpdatePasswordModal, setUserUpdatePasswordModal] = useState(false);
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		contactNum: "",
		role: "",
		createdAt: "",
		updatedAt: "",
	});
	const [loading, setLoading] = useState(false);
	const param = useParams();

	useEffect(() => {
		const fetchUserLoggedData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/loggeduser/${param.id}`)
				.then(response => {
					let userData = response.data.user;
					setUser(userData);
				})
				.catch(error => {
					if (error.response) {
						toast.error(error.response.data.message);
					}
				});

			setLoading(false);
		};

		fetchUserLoggedData();
	}, [param]);

	const handleChange = ({ currentTarget: input }) => {
		setUser({ ...user, [input.name]: input.value });
	};

	const updateUser = async () => {
		setLoading(true);
		await instance
			.put(`/settings/loggeduser/${param.id}`, {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				contactNum: user.contactNum,
			})
			.then(response => {
				setLoading(false);
				toast.success(response.data.message);
			})
			.catch(error => {
				setLoading(false);
				toast.error(error.response.data.message);
			});

		setLoading(false);
	};

	return (
		<>
			{userUpdatePasswordModal && (
				<UpdatePasswordModal
					modalOpen={setUserUpdatePasswordModal}
					loading={loading}
				/>
			)}
			<div className="profile-container">
				<div className="profile-container__wrapper">
					<div className="profile-container__nav">
						<AdminNavbar />
					</div>
					<div className="profile-container__content">
						<div className="profile-container__header">
							<Header />
						</div>

						<div className="header_viewingticket">
							<h3>{user.email}</h3>
							<h3>
								{user.firstName} {user.lastName}
							</h3>
							<h3>{user.role}</h3>
						</div>

						{loading ? (
							<div className="container-userdetails__loading">
								<h4> Loading please wait ...</h4>
							</div>
						) : (
							<>
								<div className="content-userprofile-details">
									<div className="settings-details__data">
										<div className="settings-details__createdAt">
											<label> Date Joined</label>
											<nobr>
												{" "}
												<p className="requester-details__container">
													{moment(user.createdAt).format("YYYY-MM-DD HH:mm:ss")}
												</p>
											</nobr>
										</div>
									</div>

									<div className="user-userprofiledetailscontent">
										<div className="requestedticket-ticketcontent__wrapper">
											<div className="settings-details__name">
												<label> First Name </label>
												<input
													className="settings-details__namecontainer"
													onChange={handleChange}
													name="firstName"
													value={user.firstName}
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
													value={user.lastName}
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
														value={user.email}
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
													value={user.contactNum}
													type="text"
													maxLength="11"
												></input>
											</div>
											<div className="profile-user__buttons">
												<div className="profile-buttons__updateuser">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--secondary__solid"
														onClick={updateUser}
													>
														UPDATE
													</Buttons>
												</div>
												<div className="profile-buttons__chnagepass">
													<nobr>
														<Buttons
															buttonSize="btn--medium"
															buttonStyle="btn--primary__solid"
															onClick={() => setUserUpdatePasswordModal(true)}
														>
															CHANGE PASSWORD
														</Buttons>
													</nobr>
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
		</>
	);
};

export default Profile;
