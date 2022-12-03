import React, { useRef, useState } from "react";
import "../../styles/modal.css";
import { Buttons } from "../../assets/buttons";
import Textfield from "@mui/material/TextField";
import { Requestservicesuccess } from "../modals/Requestservicesuccess";
import instanceNoAuth from "../../axios/instanceNoAuth";
import Circularspinner from "../spinner/Circularspinner";

function RequestserviceModal({ RequestserviceOpenModal }) {
	const [data, setData] = useState({
		email: "",
	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();

		setIsLoading(true);

		try {
			const { data: res } = await instanceNoAuth.post(
				`/clients/requestservice`,
				data
			);
			setMessage(res.message);
			setMessage(() => {
				setMessage("");
			});
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
				setError("");
			}, 3000);
		}

		setIsLoading(false);
	};

	const modalRef = useRef();

	const closeModal = e => {
		if (modalRef.current === e.target) {
			RequestserviceOpenModal(false);
		}
	};
	return (
		<>
			<div onClick={closeModal} ref={modalRef} className="container">
				{!isSubmitted ? (
					<div className="container-modal">
						{!isLoading ? (
							<div className="container-modal__wrapper">
								<div className="container-modal__paragraph">
									<p className="modal-text">
										Enter your{" "}
										<span className="text-emailadd">email Address </span>
										so we can verify and send you the link of the request form.
									</p>
								</div>
								<form onSubmit={handleSubmit}>
									<>
										<div className="container-modal_input">
											<div className="modal-email__input">
												<Textfield
													className="user-email__input"
													type="email"
													label="EMAIL ADDRESS"
													onChange={handleChange}
													name="email"
												/>
											</div>
										</div>

										{error && <div className="error_message">{error}</div>}
										{message && (
											<div className="message_message">{message}</div>
										)}

										<div className="container-modal__buttons">
											<div className="modal-btns__wrapper">
												<div className="modal-btn__close">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--danger__solid"
														onClick={() => RequestserviceOpenModal(false)}
													>
														CLOSE
													</Buttons>
												</div>

												<div className="modal-btn__confirm">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--secondary__solid"
													>
														CONFIRM
													</Buttons>
												</div>
											</div>
										</div>
									</>
								</form>
							</div>
						) : (
							<Circularspinner />
						)}
					</div>
				) : (
					<Requestservicesuccess />
				)}
			</div>
		</>
	);
}

export default RequestserviceModal;
