import React, { useState, useEffect } from "react";
import "../../styles/filterstyle.css";
import instance from "../../axios/axios";

const FilterCategory = ({ setCategory }) => {
	const [categories, setCategories] = useState([]);

	const onSelectChange = ({ currentTarget: input }) => {
		setCategory({ category: input.value });
	};

	useEffect(() => {
		const fetchCategories = async () => {
			await instance
				.get("/settings/fetchcategory")
				.then(response => {
					setCategories(response.data);
				})
				.catch(error => console.log(error));
		};

		fetchCategories();
	}, []);

	return (
		<>
			<div className="categoryfilter-container">
				<div className="filter-container__wrapper">
					<span> Category: </span>
					<select className="filter-select" onChange={onSelectChange}>
						<option value="All">Show All</option>
						{categories.map(category => (
							<option key={category._id} value={category.categoryName}>
								{category.categoryName}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
};

export default FilterCategory;
