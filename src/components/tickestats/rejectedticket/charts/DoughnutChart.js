import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import instance from "../../../../axios/axios";

const DoughnutChart = () => {
	const [chartData, setChartData] = useState({});
	ChartJS.register(ArcElement, Legend, Title, Tooltip);

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance
				.get(`/tickets/rejectedtickets`)
				.catch(error => {
					console.log(error);
					if (error.response.status === 401) {
						window.location.href = "/login";
						sessionStorage.clear();
					}
				});

			//delete all the duplicate data in the array or set a new array with unique values
			const priorityData = [
				...new Set(data.rejectedTickets.map(ticket => ticket.priority)),
			];

			//find the length of each category
			const ticketPriorityData = [
				...new Set(data.rejectedTickets.map(ticket => ticket.priority)),
			].map(priority => {
				return data.rejectedTickets.filter(
					ticket => ticket.priority === priority
				).length;
			});

			const generateColor = () => {
				const color = [];
				for (let i = 0; i < priorityData.length; i++) {
					if (priorityData[i] === "Low") {
						color.push(`#008450`);
					} else if (priorityData[i] === "Mid") {
						color.push(`#EFB700`);
					} else if (priorityData[i] === "High") {
						color.push(`#B81D13`);
					}
				}
				return color;
			};

			setChartData({
				labels: priorityData,
				datasets: [
					{
						data: ticketPriorityData.map(data => {
							return data;
						}),
						//set the background color of each data in the given array
						backgroundColor: generateColor(),
					},
				],
			});
		};

		fetchChartData();
	}, []);

	return (
		<>
			<div className="chart">
				{chartData && chartData.datasets ? (
					<Doughnut
						data={chartData}
						height={600}
						options={{
							responsive: true,
							plugins: {
								legend: {
									position: "bottom",
								},
								title: {
									display: true,
									text: "CURRENT REJECTED TICKETS ACCORDING TO PRIORITY",
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
		</>
	);
};

export default DoughnutChart;
