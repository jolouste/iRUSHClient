import React, { useState, useEffect } from "react";
import "../../../styles/rejectreasonsettings.css";
import Pagination from "../../../components/filters/Pagination";
import { Buttons } from "../../../assets/buttons";
import AddRejectReasonModal from "../../../components/modals/AddRejectReasonModal";
import RejectingReasonLists from "../../../components/settings/RejectingReasonLists";
import instance from "../../../axios/axios";

const RejectingreasonSettings = ({ settingsNavId }) => {
	const [openRejectReasonModal, setOpenRejectReasonModal] = useState(false);
	const [rejectReasonData, setRejectReasonData] = useState([]);
	const [loading, setLoading] = useState(false);
	//for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");
	//for searching ticket no.

	useEffect(() => {
		const fetchRejectReasonsData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchrejectreason?page=${page}&limit=${limit}`)
				.then(response => {
					let rejectReasons = response.data.filterRejectReasonData;
					const limit = response.data.limit;
					const total = response.data.total;
					setRejectReasonData(rejectReasons);
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

		fetchRejectReasonsData();
	}, [page, limit]);

	//everytime modal is closed, reload the component to show the new data
	useEffect(() => {
		if (!openRejectReasonModal) {
			const fetchRejectReasonsData = async () => {
				setLoading(true);
				await instance
					.get(`/settings/fetchrejectreason?page=${page}&limit=${limit}`)
					.then(response => {
						setRejectReasonData(response.data.filterRejectReasonData);
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

			fetchRejectReasonsData();
		}
	}, [openRejectReasonModal, page, limit]);

	if (settingsNavId === 3) {
		return (
			<>
				{openRejectReasonModal && (
					<AddRejectReasonModal modalOpen={setOpenRejectReasonModal} />
				)}
				<div className="rejectreason-content__container">
					<div className="rejectreasoncontent__header">
						<h2> rejecting reason Setting </h2>
					</div>

					<RejectingReasonLists
						loading={loading}
						rejectReasonData={rejectReasonData}
						setRejectReasonData={setRejectReasonData}
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
							onClick={() => setOpenRejectReasonModal(true)}
						>
							ADD REASON
						</Buttons>
					</div>
				</div>
			</>
		);
	}
};

export default RejectingreasonSettings;
