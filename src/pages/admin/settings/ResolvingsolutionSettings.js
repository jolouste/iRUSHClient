import React, { useState, useEffect } from "react";
import "../../../styles/solutionsettings.css";
import Pagination from "../../../components/filters/Pagination";
import { Buttons } from "../../../assets/buttons";
import ResolvingSolutionLists from "../../../components/settings/ResolvingSolutionLists";
import AddSolutionModal from "../../../components/modals/AddSolutionModal";
import instance from "../../../axios/axios";

const ResolvingsolutionSettings = ({ settingsNavId }) => {
	const [openResolvingSolutionModal, setOpenResolvingSolutionModal] =
		useState(false);
	const [resolvingSolutionData, setResolvingSolutionData] = useState([]);
	const [loading, setLoading] = useState(false);
	//for pagination
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState("");
	const [total, setTotal] = useState("");

	useEffect(() => {
		const fetchResolvingSolutionData = async () => {
			setLoading(true);
			await instance
				.get(`/settings/fetchsolution?page=${page}&limit=${limit}`)
				.then(response => {
					const solution = response.data.filterSolutionData;
					const limit = response.data.limit;
					const total = response.data.total;
					setResolvingSolutionData(solution);
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

		fetchResolvingSolutionData();
	}, [page, limit]);

	//everytime modal is closed, reload the component to show the new data
	useEffect(() => {
		if (!openResolvingSolutionModal) {
			const fetchResolvingSolutionData = async () => {
				setLoading(true);
				await instance
					.get(`/settings/fetchsolution?page=${page}&limit=${limit}`)
					.then(response => {
						setResolvingSolutionData(response.data.filterSolutionData);
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
			fetchResolvingSolutionData();
		}
	}, [openResolvingSolutionModal, page, limit]);

	if (settingsNavId === 4) {
		return (
			<>
				{openResolvingSolutionModal && (
					<AddSolutionModal
						modalOpen={setOpenResolvingSolutionModal}
						loading={loading}
					/>
				)}
				<div className="solution-content__container">
					<div className="solutioncontent__header">
						<h2> resolving solution Setting </h2>
					</div>

					<div className="solutioncontainer-filtersolution">
						<div className="filtersolution-container__wrapper"></div>
						<div className="filtertickets-searchandreport__container"></div>
					</div>

					<ResolvingSolutionLists
						resolvingSolutionData={resolvingSolutionData}
						loading={loading}
						setResolvingSolutionData={setResolvingSolutionData}
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
							onClick={() => setOpenResolvingSolutionModal(true)}
						>
							ADD SOLUTION
						</Buttons>
					</div>
				</div>
			</>
		);
	}
};

export default ResolvingsolutionSettings;
