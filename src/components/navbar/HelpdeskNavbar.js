import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar-admin.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ViewHeadlineOutlinedIcon from "@mui/icons-material/ViewHeadlineOutlined";
import ustLogo from "../../images/img/UST_logoblack.png";

const AdminNavbar = () => {
	const navbarData = [
		{
			id: 1,
			title: "Dashboard",
			icon: <DashboardIcon />,
			link: "/helpdesksupport/dashboard",
			description: "DASHBOARD",
		},
		{
			id: 2,
			title: "Tickets",
			icon: <ConfirmationNumberIcon />,
			link: "/helpdesksupport/tickets",
			description: "TICKETS",
		},
		{
			id: 3,
			title: "Requests",
			icon: <AssignmentIcon />,
			link: "/helpdesksupport/servicerequests",
			description: "REQUESTS",
		},
	];

	const navigate = useNavigate();

	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => {
		setSidebar(!sidebar);
	};

	return (
		<>
			<div className="navbar-container">
				<div className="navbar-container__wrapper">
					<div className="adminnavbar-icons__widgets">
						<div className="adminnavbar-icons__menu" onClick={showSidebar}>
							<ViewHeadlineOutlinedIcon />
						</div>
						{navbarData.map((data, index) => {
							return (
								<div
									className={
										sidebar
											? "navbar-widgets__active"
											: "navbar-widgets__passive"
									}
									key={index}
									onClick={() => {
										navigate(data.link);
									}}
								>
									<li>{data.icon}</li>

									<h6 className={sidebar ? "active-nav" : "hidden"}>
										{data.description}
									</h6>
								</div>
							);
						})}
					</div>

					<div className="adminnavbar-icons__ustlogo">
						<div className="icon-ustlogo__container">
							<img
								style={{ width: sidebar ? "55px" : "50px" }}
								id="navbar-ustlogo"
								src={ustLogo}
								alt="ust-logo"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminNavbar;
