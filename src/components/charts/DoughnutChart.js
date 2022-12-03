import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import instance from "../../axios/axios";

const DoughnutChart = () => {
	const [chartData, setChartData] = useState({});
	ChartJS.register(ArcElement, Legend, Title, Tooltip);

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance.get(`/tickets/tickets`).catch(error => {
				if (error.response.status === 401) {
					window.location.href = "/login";
					sessionStorage.clear();
				}
			});

			//delete all the duplicate data in the array or set a new array with unique values
			const statusData = [...new Set(data.ticket.map(ticket => ticket.status))];

			//find the length of each category
			const ticketStatusData = [
				...new Set(data.ticket.map(ticket => ticket.status)),
			].map(status => {
				return data.ticket.filter(ticket => ticket.status === status).length;
			});

			const generateColor = () => {
				const color = [];
				for (let i = 0; i < statusData.length; i++) {
					if (statusData[i] === "Rejected") {
						color.push(`#d61c20`);
					} else if (statusData[i] === "Resolved") {
						color.push(`#21860a`);
					} else if (statusData[i] === "Voided") {
						color.push(`#8c8c8c`);
					} else if (statusData[i] === "Overdue") {
						color.push(`#a20409`);
					} else if (statusData[i] === "Open") {
						color.push(`#ffcc00`);
					} else if (statusData[i] === "Reopened") {
						color.push(`#fee181`);
					}
				}
				return color;
			};

			setChartData({
				labels: statusData,
				datasets: [
					{
						data: ticketStatusData.map(data => {
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
						height={300}
						width={300}
						options={{
							responsive: false,
							plugins: {
								legend: {
									position: "bottom",
								},
								title: {
									display: true,
									text: "TICKETS CREATED ACCORDING TO STATUS",
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
		</>
	);
};

export default DoughnutChart;
