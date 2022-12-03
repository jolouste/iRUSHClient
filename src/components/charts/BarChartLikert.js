import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import instance from "../../axios/axios";

const BarChartLikert = () => {
	const [chartData, setChartData] = useState({});
	ChartJS.register(BarElement, CategoryScale, LinearScale);

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance
				.get(`/tickets/fetchlikertscale`)
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			//get the rating from the data
			const likertScale = [
				...new Set(data.likert.map(likert => likert.rating)),
			];

			//find the length of each category
			const likertScaleData = [
				...new Set(data.likert.map(likert => likert.rating)),
			].map(rating => {
				return data.likert.filter(likert => likert.rating === rating).length;
			});

			const generateColor = () => {
				const color = [];
				for (let i = 0; i < likertScale.length; i++) {
					if (likertScale[i] === "Excellent") {
						color.push(`#4fbf26`);
					} else if (likertScale[i] === "Good") {
						color.push(`#ffd300`);
					} else if (likertScale[i] === "Poor") {
						color.push(`#fa8128`);
					} else if (likertScale[i] === "Bad") {
						color.push(`#ff0800`);
					}
				}
				return color;
			};

			setChartData({
				labels: likertScale,
				datasets: [
					{
						data: likertScaleData,
						//set the background color of each data in the given array
						backgroundColor: generateColor(),
						barPercentage: 0.6,
						minBarLength: 2,
					},
				],
			});
		};
		fetchChartData();
	}, []);

	return (
		<div className="chart">
			{chartData && chartData.datasets ? (
				<Bar
					data={chartData}
					height={200}
					width={900}
					options={{
						responsive: true,
						plugins: {
							legend: {
								display: false,
							},
							title: {
								display: true,
								text: "CUSTOMER SATISFACTION BASED ON SURVEY",
							},
						},
					}}
				/>
			) : (
				<div
					className="chart-no-data"
					style={{
						textAlign: "center",
						fontWeight: "700",
						color: "rgba(0, 0, 0, 0.5)",
						textTransform: "uppercase",
						fontSize: "13px",
					}}
				>
					No data yet to display
				</div>
			)}
		</div>
	);
};

export default BarChartLikert;
