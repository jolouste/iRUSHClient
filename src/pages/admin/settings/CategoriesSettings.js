import React, { useState, useEffect } from "react";
import "../../../styles/categoriessettings.css";
import Pagination from "../../../components/filters/Pagination";
import CategoriesLists from "../../../components/settings/CategoriesLists";
import { Buttons } from "../../../assets/buttons";
import AddCategoryModal from "../../../components/modals/AddCategoryModal";
import instance from "../../../axios/axios";

const CategoriesSettings = ({ settingsNavId }) => {
	const [openCategoryModal, setOpenCategoryModal] = useState(false);
	const [categoriesData, setCategoriesData] = useState([]);
	const [loading, setLoading] = useState(false);
	//for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");

	useEffect(() => {
		const fetchCategoriesData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/categorydata?page=${page}&limit=${limit}`)
				.then(response => {
					setCategoriesData(response.data.filterCategoryData);
					setLimit(response.data.limit);
					setTotal(response.data.total);
				})
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			setLoading(false);
		};

		fetchCategoriesData();
	}, [page, limit]);

	//everytime modal is closed, reload the component to show the new data
	useEffect(() => {
		if (!openCategoryModal) {
			const fetchCategoriesData = async () => {
				setLoading(true);
				await instance

					.get(`/settings/categorydata?page=${page}&limit=${limit}`)
					.then(response => {
						let categories = response.data.filterCategoryData;
						const limit = response.data.limit;
						const total = response.data.total;
						setCategoriesData(categories);
						setLimit(limit);
						setTotal(total);
					})
					.catch(error => {
						console.log(error);
						if (error.response.status === 401) {
							window.location.href = "/login";
						}
					});
				setLoading(false);
			};

			fetchCategoriesData();
		}
	}, [openCategoryModal, page, limit]);

	if (settingsNavId === 1) {
		return (
			<>
				{openCategoryModal && (
					<AddCategoryModal
						modalOpen={setOpenCategoryModal}
						loading={loading}
					/>
				)}
				<div className="categories-content__container">
					<div className="categoriescontent__header">
						<h2> Categories Setting </h2>
					</div>

					<div className="categoriescontainer-filtercategories">
						<div className="filtercategories-container__wrapper"></div>
						<div className="filtertickets-searchandreport__container"></div>
					</div>

					<CategoriesLists
						categoriesData={categoriesData}
						loading={loading}
						setCategoriesData={setCategoriesData}
					/>

					<Pagination
						page={page}
						total={total}
						setPage={page => setPage(page)}
						limit={limit}
						setLimit={limit => setLimit(limit)}
					/>

					<div
						className="tablesetting-button"
						style={{ display: loading ? "none" : "block" }}
					>
						<Buttons
							id="addCategoryBtn"
							buttonSize="btn--medium"
							buttonStyle="btn--primary__solid"
							onClick={() => setOpenCategoryModal(true)}
						>
							ADD CATEGORY
						</Buttons>
					</div>
				</div>
			</>
		);
	}
};

export default CategoriesSettings;
