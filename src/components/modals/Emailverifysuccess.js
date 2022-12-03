import React from "react";
import "../../styles/emailverify.css";
import ustLogo from "../../images/img/UST_logoblack.png";
import ustTiger from "../../images/img/Tiger_clipart.png";
import { Buttons } from "../../assets/buttons";
import { Link as Links } from "react-router-dom";

export const Emailverifysuccess = () => {
	return (
		<>
			<div className="container-emailverify">
				<div className="container-emailverify__wrapper">
					<div className="emailverify--container__header">
						<div className="emailverifyheader__logo">
							<img id="emailverify-ustlogoblck" src={ustLogo} alt="" />
						</div>

						<div className="emailverifyheader__text">
							<h6 id="emailverifyheader__ust"> Pontifical and Royal </h6>
							<h1 id="emailverifyheader__ust-sch">University of Santo Tomas</h1>
							<h6 id="emailverifyheader__ust">
								The Catholic University of the Philippines
							</h6>
						</div>
					</div>

					<div className="emailverify--container__content">
						<div className="emailverifycontent__tiger">
							<img id="emailverify-tiger" src={ustTiger} alt="" />
						</div>

						<div className="emailverifycontent__texts">
							<div className="emailverifycontent-text__header">
								<h1> Email Successfully Sent</h1>
							</div>

							<div className="emailverifycontent-text__paragraph">
								<p> Thank you for your patience. </p>
								<p>Please check your inbox for the link.</p>
							</div>

							<div className="emailverifycontent-text__buttons">
								<Links to="/">
									<div className="emailverify-button">
										<Buttons
											buttonSize="btn--medium__average"
											buttonStyle="btn--longhead__success"
										>
											REDIRECT ME TO HOMEPAGE
										</Buttons>
									</div>
								</Links>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
