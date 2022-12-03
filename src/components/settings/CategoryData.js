import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/updatedeleteviewingdata.css";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import AdminNavbar from "../navbar/AdminNavbar";
import { Buttons } from "../../assets/buttons";
import { toast } from "react-toastify";
import instance from "../../axios/axios";

const CategoryData = () => {
	const param = useParams();
	const navigate = useNavigate();
	const [categoryData, setCategoryData] = useState({
		categoryName: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = ({ currentTarget: input }) => {
		setCategoryData({ ...categoryData, [input.name]: input.value });
	};

	//function update category data
	const updateCategoryData = async () => {
		setLoading(true);
		await instance
			.put(`/settings/category/${param.id}`, {
				categoryName: categoryData.categoryName,
				description: categoryData.description,
			})
			.then(response => {
				setLoading(true);
				toast.success(response.data.message);
			})
			.catch(error => {
				toast.error(error.response.data.message);
				if (error.response.status === 401) {
					window.location.href = "/login";
				}

				if (error.response.status === 500) {
					toast.error("Error occured while updating the data.");
				}

				if (error.response.status === 404) {
					toast.error(error.response.data.message);
					navigate("/settings");
				}
			});
		setLoading(false);
	};

	const deleteCategorydata = async () => {
		setLoading(true);
		await instance
			.delete(`/settings/category/${param.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
				},
			})
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
		const fetchCategoryData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchcategorydata/${param.id}`)
				.then(response => {
					let category = response.data.category;
					setCategoryData(category);
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

		fetchCategoryData();
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
							<h3>Viewing {categoryData.categoryName} details </h3>
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
													{moment(categoryData.createdAt).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</p>
											</nobr>
										</div>

										<div className="settings-details__createdAt">
											<label> Date updated </label>
											<nobr>
												<p className="requester-details__container">
													{moment(categoryData.updatedAt).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</p>
											</nobr>
										</div>
									</div>

									<div className="settings-settingdetailscontent">
										<div className="requestedticket-ticketcontent__wrapper">
											<div className="settings-details__name">
												<label> Category Name </label>
												<input
													className="settings-details__namecontainer"
													onChange={handleChange}
													name="categoryName"
													value={categoryData.categoryName}
													type="text"
													maxLength="50"
												></input>
											</div>

											<div className="settings-details__description">
												<label> Category Description </label>
												<div className="settings-details__descriptioncontainer">
													<input
														className="settings-details__descriptioncontainerinput"
														onChange={handleChange}
														name="description"
														value={categoryData.description}
														type="text"
														maxLength="100"
													/>
												</div>
											</div>

											<div className="settings-details__buttons">
												<div className="settings-buttons__delete">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--danger__solid"
														onClick={deleteCategorydata}
													>
														Delete
													</Buttons>
												</div>

												<div className="settings-buttons__update">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--secondary__solid"
														onClick={updateCategoryData}
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

export default CategoryData;
