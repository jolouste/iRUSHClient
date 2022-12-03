import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import instance from "../../axios/axios";

const BarChart = () => {
	const [chartData, setChartData] = useState({});
	ChartJS.register(BarElement, CategoryScale, LinearScale);

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance
				.get(`/settings/fetchusers`)
				.catch(error => {
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			setChartData({
				labels: data.map(user => user.firstName + " " + user.lastName),
				datasets: [
					{
						data: data.map(user => user.resolvedTickets),
						//set the background color of each data in the given array
						backgroundColor: [
							"#A4761C",
							"#C99023",
							"#E87F0F",
							"#FCA93E",
							"#FEC882",
							"#A4761C",
							"#C99023",
							"#E87F0F",
							"#B3FB91",
							"#92ED69",
							"#AEF0CD",
							"#75E8D1",
							"#41D6EA",
							"#B3FB91",
							"#92ED69",
							"#AEF0CD",
						],
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
								text: "RESOLVED TICKETS PER USER",
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

export default BarChart;
