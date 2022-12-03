import React, { useState } from "react";
import "../styles/header.css";
import { useAuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";
import profileIcon from "../images/svg/profileicon.svg";

const Header = () => {
	const { user } = useAuthContext();
	const [profileClicked, setProfileClicked] = useState(false);
	const { logout } = useLogout();

	const showProfileNav = () => {
		setProfileClicked(!profileClicked);
	};

	const handleClick = () => {
		logout();
	};

	return (
		<>
			<div className="header-container">
				<div className="header-container__wrapper">
					<div
						className="header-container__profileicon"
						onClick={showProfileNav}
					>
						<img src={profileIcon} id="profileicon" alt="" />
					</div>

					{user.map((user, index) => {
						const { id } = user;
						return (
							<div key={index} className="header-container__details">
								<div className="header-clerkName__container">{user.name}</div>
								<div className="header-clerkEmail__container">{user.email}</div>
								<div className="header-clerkRole__container">{user.role}</div>

								{profileClicked && (
									<div key={index} className="header-container__profileNav">
										<button
											className="header-container__profileNav__item__link"
											onClick={
												user.role === "USER_SUPERADMIN" ||
												user.role === "USER_ADMIN"
													? () => {
															window.location.href = `/profile/${id}`;
													  }
													: user.role === "CLERK_HELPDESKSUPPORT"
													? () => {
															window.location.href = `/helpdesksupport/profile/${id}`;
													  }
													: user.role === "CLERK_ITSUPPORT"
													? () => {
															window.location.href = `/itsupport/profile/${id}`;
													  }
													: null
											}
										>
											Profile
										</button>
										<button
											className="header-container__profileNav__item__link"
											onClick={handleClick}
										>
											Logout
										</button>
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default Header;
