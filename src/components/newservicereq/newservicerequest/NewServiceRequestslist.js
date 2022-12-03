import React, { useState } from "react";
import sortIcon from "../../../images/svg/sort.svg";
import moment from "moment";

const NewServiceRequestslist = ({
	loading,
	serviceRequestsData,
	setServiceRequestsData,
}) => {
	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...serviceRequestsData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setServiceRequestsData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...serviceRequestsData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setServiceRequestsData(sorted);
			setOrder("ASC");
		}
	};

	const sortingTicketNo = col => {
		if (order === "ASC") {
			const sorted = [...serviceRequestsData].sort((a, b) =>
				col === "requestNo"
					? parseInt(a[col]) - parseInt(b[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setServiceRequestsData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...serviceRequestsData].sort((a, b) =>
				col === "requestNo"
					? parseInt(b[col]) - parseInt(a[col])
					: a[col] > b[col]
					? 1
					: -1
			);
			setServiceRequestsData(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="servicerequestscontainer-service__servicelists">
				{loading ? (
					<div className="loading-container ">
						<h5> Service requests are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{serviceRequestsData.length === 0 ? (
							<div className="noavailability__container">
								<h3> No Service Requests available </h3>
							</div>
						) : (
							<>
								<table className="table-container__tickets">
									<thead className="tableticket-header">
										<tr>
											<th className="tableheader-title">
												Request No.
												<span>
													<img
														id="sortIcon"
														src={sortIcon}
														alt=""
														onClick={() => sortingTicketNo("requestNo")}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</th>
											<th className="tableheader-title">
												Subject
												<span>
													<img
														id="sortIcon"
														src={sortIcon}
														alt=""
														onClick={() => sorting("subject")}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</th>
											<th className="tableheader-title">
												Category
												<span>
													<img
														id="sortIcon"
														src={sortIcon}
														alt=""
														onClick={() => sorting("category")}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</th>
											<th className="tableheader-title">
												Requester
												<span>
													<img
														id="sortIcon"
														src={sortIcon}
														alt=""
														onClick={() => sorting("requester")}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</th>
											<th className="tableheader-title">
												Unit
												<span>
													<img
														id="sortIcon"
														src={sortIcon}
														alt=""
														onClick={() => sorting("clientUnit")}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</th>
											<th className="tableheader-title">
												Date Requested
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
											<th className="tableheader-title">
												Reference Number
												<span>
													<img
														id="sortIcon"
														src={sortIcon}
														alt=""
														onClick={() => sorting("referenceNo")}
														style={{ cursor: "pointer" }}
													/>
												</span>
											</th>
										</tr>
									</thead>
									<tbody>
										{serviceRequestsData.map((service, index) => {
											const { _id: id } = service;
											return (
												<tr key={index} className="tickettable-row">
													<td
														className="tickettable-cell"
														style={{
															cursor: "pointer",
															color: "#000",
														}}
														onClick={() =>
															(window.location.pathname = `/servicerequests/${id}`)
														}
													>
														<strong>{service.requestNo}</strong>
													</td>
													<td className="tickettable-cell">
														{service.subject}
													</td>
													<td className="tickettable-cell">
														{" "}
														{service.category}
													</td>
													<td className="tickettable-cell">
														{service.requester}
													</td>
													<td className="tickettable-cell">
														{service.clientUnit.toUpperCase()}
													</td>
													<td className="tickettable-cell">
														{moment(service.createdAt).format(
															"YYYY-MM-DD HH:mm:ss"
														)}
													</td>
													<td className="tickettable-cell">
														{service.referenceNo}
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default NewServiceRequestslist;
