import React, { useState, useEffect } from "react";
import "../styles/passwordreset.css";
import { Link, useParams } from "react-router-dom";
import ustLogoblck from "../images/img/UST_logoblack.png";
import { Buttons } from "../assets/buttons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Textfield from "@mui/material/TextField";
import Pagebroken from "../components/Pagebroken";
import Circularspinner from "../components/spinner/Circularspinner";
import instanceNoAuth from "../axios/instanceNoAuth";

const Passwordreset = () => {
	const defaultLink = {
		color: "#000",
	};

	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				setValidUrl(true);
				await instanceNoAuth.get(
					`/auth/resetpassword/${param.id}/verify/${param.token}`
				);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param]);

	const handleSubmit = async e => {
		e.preventDefault();

		setIsLoading(true);

		if (password !== confirmpassword) {
			setTimeout(() => {
				setError("");
			}, 3000);
			return setError("Passwords do not match");
		}

		try {
			const { data } = await instanceNoAuth.post(
				`/auth/resetpassword/${param.id}/verify/${param.token}`,
				{ password }
			);
			setMessage(data.message);
			toast.success(data.message);
			setError("");
			window.location = "/login";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMessage("");
			}

			setTimeout(() => {
				setError("");
			}, 3000);
		}
		setIsLoading(false);
	};

	return (
		<>
			{validUrl ? (
				<form onSubmit={handleSubmit}>
					<div className="passwordreset-container">
						<div className="passwordreset-container__wrapper">
							<Link style={defaultLink} to="/">
								<div className="container-loginheader">
									<div className="loginheader__logo">
										<img
											id="forgotpass-ustlogoblck"
											src={ustLogoblck}
											alt=" "
										/>
									</div>
									<div className="loginheader--text">
										<h6 id="loginheader__ust"> Pontifical and Royal </h6>
										<h1 id="loginheader__ust-sch">
											{" "}
											University of Santo Tomas{" "}
										</h1>
										<h6 id="loginheader__ust">
											The Catholic University of the Philippines
										</h6>
									</div>
								</div>
							</Link>
							{!isLoading ? (
								<>
									<div className="passwordreset-container__user">
										<div className="passwordreset-user__wrapper">
											<div className="passwordreset-user__paragraphs">
												<div className="passwordreset-paragraphs__header">
													<h5> PASSWORD MUST INCLUDE ATLEAST: </h5>
													<div className="passwordreset-passwordreminder">
														<ul className="passreminders">
															<li id="passreminders-li">8 CHARACTERS LONG</li>
															<li id="passreminders-li">1 UPPERCASE LETTER</li>
															<li id="passreminders-li">1 LOWERCASE LETTER</li>
															<li id="passreminders-li">1 NUMBER</li>
															<li id="passreminders-li">AND A SYMBOL</li>
														</ul>
													</div>
												</div>
											</div>

											<div className="passwordreset-user__password">
												<div className="passwordreset-user--container__password">
													<Textfield
														className="passwordreset-userinput__password"
														label="NEW PASSWORD"
														type="password"
														name="password"
														onChange={e => setPassword(e.target.value)}
														value={password}
													/>
												</div>
											</div>

											<div className="passwordreset-user__password">
												<div className="passwordreset-user--container__password">
													<Textfield
														className="passwordreset-userinput__password"
														label="CONFIRM PASSWORD"
														type="password"
														name="password"
														onChange={e => setConfirmPassword(e.target.value)}
														value={confirmpassword}
													/>
												</div>
											</div>
											{error && <div className="error_message">{error}</div>}
											{message && (
												<div className="passwordreset-message_msg">
													{message}
												</div>
											)}
											<div className="forgot-container__button">
												<div className="button-user__sendlink">
													<Buttons
														buttonSize="medium"
														buttonStyle="btn--longhead__solid"
													>
														RESET PASSWORD
													</Buttons>
												</div>
											</div>
										</div>
									</div>
								</>
							) : (
								<Circularspinner />
							)}
						</div>
					</div>
				</form>
			) : (
				<Pagebroken />
			)}
		</>
	);
};

export default Passwordreset;
