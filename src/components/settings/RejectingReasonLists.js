import React, { useState } from "react";
import "../../styles/settingstable.css";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const RejectingReasonLists = ({
	rejectReasonData,
	loading,
	setRejectReasonData,
}) => {
	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...rejectReasonData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setRejectReasonData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...rejectReasonData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setRejectReasonData(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="settings-container__settingslists">
				{loading ? (
					<div className="loading-container ">
						<h5> Reject Reason data are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{rejectReasonData.length === 0 ? (
							<div className="noavailability__container">
								<h3> No Reject Reason available </h3>
							</div>
						) : (
							<table className="table-container__settings">
								<thead className="tablesettings-header">
									<tr>
										{/* count the category length */}

										<th className="tableheader-title">
											Category Name
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("rejectReasonName")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											Rejecting Reason Description
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("description")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											Date Created
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("createdAt")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>
									</tr>
								</thead>
								<tbody>
									{rejectReasonData.map((rejectreason, index) => {
										const { _id: id } = rejectreason;

										return (
											<tr key={id} className="tickettable-row">
												<td
													className="tickettable-cell"
													style={{
														cursor: "pointer",
														color: "#000",
													}}
													onClick={() =>
														(window.location.pathname = `/settings/rejectreason/${id}`)
													}
												>
													<strong>{rejectreason.rejectReasonName}</strong>
												</td>
												<td className="tickettable-cell">
													{rejectreason.description}
												</td>
												<td className="tickettable-cell">
													{moment(rejectreason.createdAt).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default RejectingReasonLists;
