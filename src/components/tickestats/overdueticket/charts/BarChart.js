import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import instance from "../../../../axios/axios";

const BarChart = () => {
	const [chartData, setChartData] = useState({});
	ChartJS.register(BarElement, CategoryScale, LinearScale);

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance
				.get(`/tickets/overduetickets`)
				.catch(error => {
					console.log(error);
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			const categories = [
				...new Set(data.overdueTickets.map(ticket => ticket.ticketCategory)),
			];

			//find the length of each category
			const ticketCategoryData = [
				...new Set(data.overdueTickets.map(ticket => ticket.ticketCategory)),
			].map(category => {
				return data.overdueTickets.filter(
					ticket => ticket.ticketCategory === category
				).length;
			});

			setChartData({
				labels: categories,
				datasets: [
					{
						data: ticketCategoryData.map(data => {
							return data;
						}),
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
						responsive: false,
						plugins: {
							legend: {
								display: false,
							},
							title: {
								display: true,
								text: "CURRENT OVERDUE TICKETS PER CATEGORY",
							},
						},
					}}
				/>
			) : (
				<span
					className="loading-container"
					style={{
						textAlign: "center",
						fontWeight: "700",
						color: "rgba(0, 0, 0, 0.5)",
						textTransform: "uppercase",
						fontSize: "13px",
					}}
				>
					No data yet to display
				</span>
			)}
		</div>
	);
};

export default BarChart;
