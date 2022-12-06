import React, { useState } from "react";
import "../../styles/settingstable.css";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const RejectingReasonLists = ({
	resolvingSolutionData,
	loading,
	setResolvingSolutionData,
}) => {
	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...resolvingSolutionData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setResolvingSolutionData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...resolvingSolutionData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setResolvingSolutionData(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="settings-container__settingslists">
				{loading ? (
					<div className="loading-container ">
						<h5> Solution data are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{resolvingSolutionData.length === 0 ? (
							<div className="noavailability__container">
								<h3> No Solution available </h3>
							</div>
						) : (
							<table className="table-container__settings">
								<thead className="tablesettings-header">
									<tr>
										<th className="tableheader-title">
											Solution Name
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("solutionName")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											Solution Description
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
									{resolvingSolutionData.map((solution, index) => {
										const { _id: id } = solution;

										return (
											<tr key={id} className="tickettable-row">
												<td
													className="tickettable-cell"
													style={{
														cursor: "pointer",
														color: "#000",
													}}
													onClick={() =>
														(window.location.pathname = `/settings/resolvingsolution/${id}`)
													}
												>
													<strong>{solution.solutionName}</strong>
												</td>
												<td className="tickettable-cell">
													{solution.description}
												</td>
												<td className="tickettable-cell">
													{moment(solution.createdAt).format(
														"YYYY/MM/DD HH:mm:ss"
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
