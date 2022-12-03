import React, { useState } from "react";
import "../../styles/settingstable.css";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const VoidingReasonsLists = ({
	voidReasonData,
	loading,
	setVoidReasonData,
}) => {
	console.log("voidReasonData", voidReasonData);

	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...voidReasonData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setVoidReasonData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...voidReasonData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setVoidReasonData(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="settings-container__settingslists">
				{loading ? (
					<div className="loading-container ">
						<h5> Void Reason Data are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{voidReasonData.length === 0 ? (
							<div className="noavailability__container">
								<h3> No Void Reason available </h3>
							</div>
						) : (
							<table className="table-container__settings">
								<thead className="tablesettings-header">
									<tr>
										<th className="tableheader-title">
											Void Reason Name
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("voidReasonName")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											Void Reason Description
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
									{voidReasonData.map((voidreason, index) => {
										const { _id: id } = voidreason;

										return (
											<tr key={id} className="tickettable-row">
												<td
													className="tickettable-cell"
													style={{
														cursor: "pointer",
														color: "#000",
													}}
													onClick={() =>
														(window.location.pathname = `/settings/voidreason/${id}`)
													}
												>
													<strong>{voidreason.voidReasonName}</strong>
												</td>
												<td className="tickettable-cell">
													{voidreason.description}
												</td>
												<td className="tickettable-cell">
													{moment(voidreason.createdAt).format(
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

export default VoidingReasonsLists;
