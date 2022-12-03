import React, { useState, useEffect } from "react";
import "../../../styles/solutionsettings.css";
import Pagination from "../../../components/filters/Pagination";
import { Buttons } from "../../../assets/buttons";
import VoidingReasonsLists from "../../../components/settings/VoidingReasonsLists";
import AddVoidReasonModal from "../../../components/modals/AddVoidReasonModal";
import instance from "../../../axios/axios";

const VoidingreasonSettings = ({ settingsNavId }) => {
	const [openVoidReasonModal, setOpenVoidReasonModal] = useState(false);
	const [voidReasonData, setVoidReasonData] = useState([]);
	const [loading, setLoading] = useState(false);
	//for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");

	useEffect(() => {
		const fetchVoidingReasonData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchvoidreason?page=${page}&limit=${limit}`)
				.then(response => {
					const voidReason = response.data.filterVoidReasonData;
					const limit = response.data.limit;
					const total = response.data.total;
					setVoidReasonData(voidReason);
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

		fetchVoidingReasonData();
	}, [page, limit]);

	//everytime modal is closed, reload the component to show the new data
	useEffect(() => {
		if (!openVoidReasonModal) {
			const fetchVoidingReasonData = async () => {
				setLoading(true);
				await instance
					.get(`/settings/fetchvoidreason?page=${page}&limit=${limit}`)
					.then(response => {
						setVoidReasonData(response.data.filterVoidReasonData);
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
			fetchVoidingReasonData();
		}
	}, [openVoidReasonModal, page, limit]);

	if (settingsNavId === 5) {
		return (
			<>
				{openVoidReasonModal && (
					<AddVoidReasonModal
						modalOpen={setOpenVoidReasonModal}
						loading={loading}
					/>
				)}
				<div className="solution-content__container">
					<div className="solutioncontent__header">
						<h2> void reason Setting </h2>
					</div>

					<div className="solutioncontainer-filtersolution">
						<div className="filtersolution-container__wrapper"></div>
						<div className="filtertickets-searchandreport__container"></div>
					</div>

					<VoidingReasonsLists
						voidReasonData={voidReasonData}
						loading={loading}
						setVoidReasonData={setVoidReasonData}
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
							onClick={() => setOpenVoidReasonModal(true)}
						>
							ADD REASON
						</Buttons>
					</div>
				</div>
			</>
		);
	}
};

export default VoidingreasonSettings;
