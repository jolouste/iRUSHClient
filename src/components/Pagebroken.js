import React from "react";
import "../styles/pagebroken.css";
import { Buttons } from "../assets/buttons";
import { Link as Links } from "react-router-dom";

const Pagebroken = () => {
	return (
		<>
			<div className="pagebroken-container">
				<div className="pagebroken-container__wrapper">
					<span>404 | PAGE NOT FOUND</span>

					<Links to="/">
						<div className="pagebroken-button">
							<Buttons
								buttonSize="btn--small"
								buttonStyle="btn--longhead__success"
							>
								HOME
							</Buttons>
						</div>
					</Links>
				</div>
			</div>
		</>
	);
};

export default Pagebroken;
