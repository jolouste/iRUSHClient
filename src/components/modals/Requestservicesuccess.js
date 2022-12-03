import React from "react";
import "../../styles/requestservicesuccess.css";
import ustLogo from "../../images/img/UST_logoblack.png";
import ustTiger from "../../images/img/Tiger_clipart.png";

export const Requestservicesuccess = () => {
	return (
		<>
			<div className="container-requestsuccess">
				<div className="container-requestsuccess__wrapper">
					<div className="requestsuccess--container__header">
						<div className="requestsuccessheader__logo">
							<img id="requestsuccess-ustlogoblck" src={ustLogo} alt="" />
						</div>

						<div className="requestsuccessheader__text">
							<h6 id="requestsuccessheader__ust"> Pontifical and Royal </h6>
							<h1 id="requestsuccessheader__ust-sch">
								University of Santo Tomas
							</h1>
							<h6 id="requestsuccessheader__ust">
								The Catholic University of the Philippines
							</h6>
						</div>
					</div>

					<div className="requestsuccess--container__content">
						<div className="requestsuccesscontent__tiger">
							<img id="requestsuccess-tiger" src={ustTiger} alt="" />
						</div>

						<div className="requestsuccesscontent__texts">
							<div className="requestsuccesscontent-text__header">
								<h1> Email Successfully Sent</h1>
							</div>

							<div className="requestsuccesscontent-text__paragraph">
								<p> Thank you for your patience. </p>
								<p>Please check your inbox for the link.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
