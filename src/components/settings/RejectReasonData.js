import React, { useState, useEffect } from "react";
import "../../styles/updatedeleteviewingdata.css";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import AdminNavbar from "../navbar/AdminNavbar";
import { Buttons } from "../../assets/buttons";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const RejectReasonData = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [rejectReasonData, setRejecReasonData] = useState({
		rejectReasonName: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setRejecReasonData({ ...rejectReasonData, [input.name]: input.value });
	};

	const updateData = async () => {
		setLoading(true);
		await instance
			.put(`/settings/rejectreason/${param.id}`, {
				rejectReasonName: rejectReasonData.rejectReasonName,
				description: rejectReasonData.description,
			})
			.then(response => {
				setLoading(true);
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
			.delete(`/settings/rejectreason/${param.id}`)
			.then(response => {
				toast.success(response.data.message);
				navigate("/settings");
			})
			.catch(error => {
				if (error) {
					toast.error(error.response.data.message);
				}

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
		const fetchRejectReasonData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchrejectreasondata/${param.id}`)
				.then(response => {
					let rejectreason = response.data.rejectreason;
					setRejecReasonData(rejectreason);

					console.log(response.data);
				})
				.catch(error => {
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

		fetchRejectReasonData();
	}, [param, navigate]);

	return (
		<>
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
							<h3>Viewing {rejectReasonData.rejectReasonName} details </h3>
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
											<label> Date created</label>
											<nobr>
												{" "}
												<p className="requester-details__container">
													{moment(rejectReasonData.createdAt).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</p>
											</nobr>
										</div>

										<div className="settings-details__createdAt">
											<label> Date updated </label>
											<nobr>
												<p className="requester-details__container">
													{moment(rejectReasonData.updatedAt).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</p>
											</nobr>
										</div>
									</div>

									<div className="settings-settingdetailscontent">
										<div className="requestedticket-ticketcontent__wrapper">
											<div className="settings-details__name">
												<label> Reject Reason Name </label>
												<input
													className="settings-details__namecontainer"
													onChange={handleChange}
													name="rejectReasonName"
													value={rejectReasonData.rejectReasonName}
													type="text"
													maxLength="80"
												></input>
											</div>

											<div className="settings-details__description">
												<label> Reject Reason Description </label>
												<div className="settings-details__descriptioncontainer">
													<input
														className="settings-details__descriptioncontainerinput"
														onChange={handleChange}
														name="description"
														value={rejectReasonData.description}
														type="text"
														maxLength="250"
													/>
												</div>
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
		</>
	);
};

export default RejectReasonData;
