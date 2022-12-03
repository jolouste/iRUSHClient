import React from "react";
import "../../styles/filterstyle.css";
import moment from "moment";

const FilterDate = ({ setDateFrom, setDateTo }) => {
	const onSelectChangeDateFrom = ({ currentTarget: input }) => {
		setDateFrom({ dateFrom: input.value });
	};

	const onSelectChangeDateTo = ({ currentTarget: input }) => {
		setDateTo({ dateTo: input.value });
	};

	return (
		<>
			<div className="filter-container">
				<div className="filter-container__wrapper">
					<div className="form-control__date">
						<span> From: </span>
						<input
							type="date"
							className="formdate-input"
							onChange={onSelectChangeDateFrom}
							max={moment().format("YYYY-MM-DD")}
						/>
						<span> To: </span>
						<input
							type="date"
							className="formdate-input"
							onChange={onSelectChangeDateTo}
							max={moment().format("YYYY-MM-DD")}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default FilterDate;
