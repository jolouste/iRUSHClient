import React, { useState } from "react";
import "../../styles/settings.css";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Header from "../../components/Header";
import CategoriesSettings from "./settings/CategoriesSettings";
import ClerksSettings from "./settings/ClerksSettings";
import RejectingreasonSettings from "./settings/RejectingreasonSettings";
import ResolvingsolutionSettings from "./settings/ResolvingsolutionSettings";
import VoidingreasonSettings from "./settings/VoidingreasonSettings";

const Settings = () => {
	const settingsNav = [
		{
			id: 1,
			name: "Categories",
		},
		{
			id: 2,
			name: "Clerks ",
		},
		{
			id: 3,
			name: "Rejecting Reasons",
		},
		{
			id: 4,
			name: "Resolving Solutions",
		},
		{
			id: 5,
			name: "Voiding Reasons",
		},
	];

	const [isClicked, setIsClicked] = useState(0);
	const [settingsNavId, setSettingsNavId] = useState(1);

	const onClick = id => {
		setIsClicked(!isClicked);
		setSettingsNavId(id);
	};
	//show another component based on the id

	return (
		<>
			<div className="settings-container">
				<div className="settings-container__wrapper">
					<div className="settings-container__nav">
						<AdminNavbar />
					</div>
					<div className="settings-container__content">
						<div className="settings-container__header">
							<Header />
						</div>

						<div className="settings-container__content__wrapper">
							<div className="settings-content__settingsstatistics">
								<div className="settings-content__settingsstatistics-container">
									<div className="settingsstatistics-header">
										<h4> settings configuration </h4>

										<div className="settingsstatistic-navigationcontainer">
											<div className="settings-nav__wrapper">
												{settingsNav.map((nav, index) => (
													<div
														key={nav.id}
														className="settings-nav__item"
														style={{ cursor: "pointer" }}
													>
														<p
															onClick={onClick.bind(this, nav.id)}
															className={`${
																settingsNavId === nav.id && "active"
															}`}
														>
															{nav.name}
														</p>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="settings-container__content">
								<CategoriesSettings settingsNavId={settingsNavId} />
								<ClerksSettings settingsNavId={settingsNavId} />
								<RejectingreasonSettings settingsNavId={settingsNavId} />
								<ResolvingsolutionSettings settingsNavId={settingsNavId} />
								<VoidingreasonSettings settingsNavId={settingsNavId} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Settings;
