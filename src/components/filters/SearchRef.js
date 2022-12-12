import React from "react";
import "../../styles/search.css";
import SearchIcon from "../../images/svg/search.svg";

const Search = ({ setSearch }) => {
	return (
		<div className="search-container">
			<div className="search-container__wrapper">
				<img src={SearchIcon} alt="" className="search-icon" />

				<input
					type="text"
					className="search-input"
					placeholder="Search Reference No."
					onChange={({ currentTarget: input }) => setSearch(input.value)}
				/>
			</div>
		</div>
	);
};

export default Search;
