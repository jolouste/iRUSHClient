import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Legend, Title, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import instance from "../../../../axios/axios";

const PieChart = () => {
	const [chartData, setChartData] = useState({});
	ChartJS.register(ArcElement, Legend, Title, Tooltip);

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance
				.get(`/tickets/requestedreopenedtickets`)
				.catch(error => {
					console.log(error);
					if (error.response.status === 401) {
						window.location.href = "/login";
					}
				});

			//delete all the duplicate data in the array or set a new array with unique values
			const clientunits = [
				...new Set(
					data.reopenedTicketRequests.map(service => service.clientUnit)
				),
			];

			//find the length of each category
			const serviceClientUnitData = [
				...new Set(
					data.reopenedTicketRequests.map(service => service.clientUnit)
				),
			].map(clientUnit => {
				return data.reopenedTicketRequests.filter(
					service => service.clientUnit === clientUnit
				).length;
			});

			setChartData({
				labels: clientunits,
				datasets: [
					{
						data: serviceClientUnitData.map(data => {
							return data;
						}),
						//set the background color of each data in the given array
						backgroundColor: [
							"#fce278",
							"#a484b0",
							"#88a6c9",
							"#d43d51",
							"#00876c",
							"#64ad73",
							"#afd17c",
							"#EEB76B",
							"#E2703A",
							"#9C3D54",
							"#310B0B",
							"#413C69",
						],
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
					<Pie
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
									text: "CURRENT REOPEN TICKET REQUESTS PER TO UNIT",
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

export default PieChart;
