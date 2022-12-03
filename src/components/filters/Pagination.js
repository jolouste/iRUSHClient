import React from "react";
import "../../styles/pagination.css";

const Pagination = ({ page, total, limit, setPage, setLimit }) => {
	const totalPages = Math.ceil(total / limit);

	const setLimitEntries = e => {
		setLimit(e.target.value);
		setPage(1);
	};

	//next button
	const next = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

	//previous button
	const previous = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	//show display
	const showDisplay = () => {
		if (total === 0) {
			return "Showing 0 to 0 of 0 entries";
		} else if (page === totalPages) {
			return `Showing ${
				limit * (page - 1) + 1
			} to ${total} of ${total} entries`;
		} else {
			return `Showing ${limit * (page - 1) + 1} to ${
				limit * page
			} of ${total} entries`;
		}
	};

	return (
		<div className="pagination-container">
			<div className="pagination-container__wrapper">
				{total > 0 && (
					<>
						<span className="show-entries"> Show entries by: </span>
						<select
							className="pagination-limitselect"
							onChange={e => setLimitEntries(e)}
							value={limit}
						>
							<option className="option-limitval" value="8">
								DEFAULT
							</option>
							<option className="option-limitval" value="20">
								20
							</option>
							<option className="option-limitval" value="30">
								30
							</option>
							<option className="option-limitval" value="50">
								50
							</option>
						</select>

						<button
							className="pagination-container__prev-button"
							onClick={previous}
						>
							PREV
						</button>
						<button
							className="pagination-container__next-button"
							onClick={next}
						>
							NEXT
						</button>

						<span className="show-entries">{showDisplay()}</span>
					</>
				)}
			</div>
		</div>
	);
};

export default Pagination;
