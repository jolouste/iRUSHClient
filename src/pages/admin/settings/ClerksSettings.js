import React, { useState, useEffect } from "react";
import Pagination from "../../../components/filters/Pagination";
import { Buttons } from "../../../assets/buttons";
import UserLists from "../../../components/settings/UserLists";
import AddUserModal from "../../../components/modals/AddUserModal";
import instance from "../../../axios/axios";

const ClerksSettings = ({ settingsNavId }) => {
	const [openAddUserModal, setOpenAddUserModal] = useState(false);
	const [clerkData, setClerkData] = useState([]);
	const [loading, setLoading] = useState(false);
	//for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");

	useEffect(() => {
		const fetchUsersData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/irushusers?page=${page}&limit=${limit}`)
				.then(response => {
					console.log(response.data);
					let users = response.data.filterIrushUsers;
					const limit = response.data.limit;
					const total = response.data.total;
					setClerkData(users);
					setLimit(limit);
					setTotal(total);
				})
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});
			setLoading(false);
		};

		fetchUsersData();
	}, [page, limit]);

	//everytime modal is closed, reload the component to show the new data
	useEffect(() => {
		if (!openAddUserModal) {
			const fetchUsersData = async () => {
				setLoading(true);
				await instance
					.get(`/settings/irushusers?page=${page}&limit=${limit}`)
					.then(response => {
						setClerkData(response.data.filterIrushUsers);
						setLimit(response.data.limit);
						setTotal(response.data.total);
					})
					.catch(error => {
						console.log(error);
						if (error.response.status === 401) {
							window.location.href = "/login";
						}
					});
				setLoading(false);
			};
			fetchUsersData();
		}
	}, [openAddUserModal, page, limit]);

	if (settingsNavId === 2) {
		return (
			<>
				{openAddUserModal && (
					<AddUserModal modalOpen={setOpenAddUserModal} loading={loading} />
				)}
				<div className="categories-content__container">
					<div className="categoriescontent__header">
						<h2> User Settings </h2>
					</div>

					<div className="categoriescontainer-filtercategories">
						<div className="filtercategories-container__wrapper"></div>
						<div className="filtertickets-searchandreport__container"></div>
					</div>

					<UserLists
						clerkData={clerkData}
						loading={loading}
						setClerkData={setClerkData}
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
							onClick={() => setOpenAddUserModal(true)}
						>
							ADD USER
						</Buttons>
					</div>
				</div>
			</>
		);
	}
};

export default ClerksSettings;
