import React, { useState } from "react";
import "../styles/forgotpassword.css";
import { Link } from "react-router-dom";
import { Buttons } from "../assets/buttons";
import ustLogoblck from "../images/img/UST_logoblack.png";
import Textfield from "@mui/material/TextField";
import { Emailverifysuccess } from "../components/modals/Emailverifysuccess";
import Circularspinner from "../components/spinner/Circularspinner";
import instanceNoAuth from "../axios/instanceNoAuth";

function Forgotpassword() {
	const defaultLink = {
		color: "#000",
	};

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async e => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const { data } = await instanceNoAuth.post(`/auth/forgotpassword`, {
				email,
			});
			setTimeout(() => {
				setMessage("");
			}, 3000);
			setMessage(data.message);
			setIsSubmitted(true);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}

			setTimeout(() => {
				setIsLoading(false);
			}, 1000);

			setTimeout(() => {
				setError("");
			}, 3000);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				{!isSubmitted ? (
					<>
						<div className="forgotpassword-container">
							<div className="forgotpassword-container__wrapper">
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
										<div className="forgotpassword-container__user">
											<div className="forgotpass-user__wrapper">
												<div className="forgotpass-user__emailaddress">
													<div className="forgotpass-user--container__emailaddress">
														<Textfield
															className="forgotpass-userinput__emailaddress"
															label="EMAIL ADDRESS"
															type="email"
															name="email"
															onChange={e => setEmail(e.target.value)}
															value={email}
														/>
													</div>
												</div>
												{error && <div className="error_message">{error}</div>}
												{message && (
													<div className="forgotpassword-message_msg">
														{message}
													</div>
												)}

												<div className="forgot-container__button">
													<div className="button-user__sendlink">
														<Buttons
															buttonSize="medium"
															buttonStyle="btn--longhead__solid"
														>
															SEND RESET LINK
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
					</>
				) : (
					<Emailverifysuccess />
				)}
			</form>
		</>
	);
}

export default Forgotpassword;
