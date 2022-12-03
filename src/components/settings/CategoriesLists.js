import React, { useState } from "react";
import "../../styles/settingstable.css";
import sortIcon from "../../images/svg/sort.svg";
import moment from "moment";

const CategoriesLists = ({ categoriesData, loading, setCategoriesData }) => {
	const [order, setOrder] = useState("ASC");

	const sorting = col => {
		if (order === "ASC") {
			const sorted = [...categoriesData].sort((a, b) =>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			);
			setCategoriesData(sorted);
			setOrder("DSC");
		}
		if (order === "DSC") {
			const sorted = [...categoriesData].sort((a, b) =>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			);
			setCategoriesData(sorted);
			setOrder("ASC");
		}
	};

	return (
		<>
			<div className="settings-container__settingslists">
				{loading ? (
					<div className="loading-container ">
						<h5> Categories data are loading. Please wait .... </h5>
					</div>
				) : (
					<>
						{categoriesData.length === 0 ? (
							<div className="noavailability__container">
								<h3> No Categories available </h3>
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
													onClick={() => sorting("categoryName")}
													style={{ cursor: "pointer" }}
												/>
											</span>
										</th>

										<th className="tableheader-title">
											Category Description
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
									{categoriesData.map((category, index) => {
										const { _id: id } = category;

										return (
											<tr key={id} className="tickettable-row">
												<td
													className="tickettable-cell"
													style={{
														cursor: "pointer",
														color: "#000",
													}}
													onClick={() =>
														(window.location.pathname = `/settings/category/${id}`)
													}
												>
													<strong>{category.categoryName}</strong>
												</td>
												<td className="tickettable-cell">
													{category.description}
												</td>
												<td className="tickettable-cell">
													{moment(category.createdAt).format(
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

export default CategoriesLists;
