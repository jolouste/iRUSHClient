import React, { useState } from "react";
import "../../styles/settingstable.css";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const CategoriesLists = ({ clerkData, loading, setClerkData }) => {
	const [order, setOrder] = useState("ASC");

	console.log(clerkData);
	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...clerkData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setClerkData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...clerkData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setClerkData(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="settings-container__settingslists">
				{loading ? (
					<div className="loading-container ">
						<h5> User data are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{clerkData.length === 0 ? (
							<div className="noavailability__container">
								<h3> No Users available </h3>
							</div>
						) : (
							<table className="table-container__settings">
								<thead className="tablesettings-header">
									<tr>
										<th className="tableheader-title">
											User details
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("firstName" && "lastName")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											contact number
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("contactNum")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											user email
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("email")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											user role
											<span>
												<img
													id="sortIcon"
													src={sortIcon}
													alt=""
													onClick={() => sorting("role")}
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
									{clerkData.map((user, index) => {
										const { _id: id } = user;

										return (
											<tr key={id} className="tickettable-row">
												<td
													className="tickettable-cell"
													style={{
														cursor: "pointer",
														color: "#000",
													}}
													onClick={() =>
														(window.location.pathname = `/settings/user/${id}`)
													}
												>
													<strong>
														{user.firstName} {user.lastName}
													</strong>
												</td>
												<td className="tickettable-cell">{user.contactNum}</td>
												<td className="tickettable-cell">{user.email}</td>
												<td className="tickettable-cell">{user.role}</td>
												<td className="tickettable-cell">
													{moment(user.createdAt).format("YYYY/MM/DD HH:mm:ss")}
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

export default CategoriesLists;
