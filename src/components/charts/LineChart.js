import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import instance from "../../axios/axios";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const LineChart = () => {
	const [chartData, setChartData] = useState({});

	useEffect(() => {
		const fetchChartData = async () => {
			const { data } = await instance.get(`/tickets/tickets`).catch(error => {
				if (error.response.status === 401) {
					window.location.href = "/login";
					sessionStorage.clear();
				}
			});

			const createdAtData = [
				...new Set(
					data.ticket.map(ticket =>
						moment(ticket.createdAt).format("YYYY-MM-DD")
					)
				),
			];
			//find the length of each category
			const ticketCategoryData = [
				...new Set(
					data.ticket.map(ticket =>
						moment(ticket.createdAt).format("YYYY-MM-DD")
					)
				),
			].map(createdAt => {
				return data.ticket.filter(
					ticket => moment(ticket.createdAt).format("YYYY-MM-DD") === createdAt
				).length;
			});

			setChartData({
				labels: createdAtData,
				datasets: [
					{
						data: ticketCategoryData.map(data => {
							return data;
						}),
						backgroundColor: ["rgba(254, 192, 15)"],
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
					<Line
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
									text: "NUMBER OF TICKETS CREATED PER DAY",
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

export default LineChart;
