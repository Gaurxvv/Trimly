/* eslint-disable react/prop-types */
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

export default function Location({ stats = [] }) {
    const cityCount = stats.reduce((acc, item) => {
        if (acc[item.city]) {
            acc[item.city] += 1;
        } else {
            acc[item.city] = 1;
        }
        return acc;
    }, {});

    const cities = Object.entries(cityCount)
        .map(([city, count]) => ({
            city,
            count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#44455a] text-white p-2 border border-gray-500 rounded shadow">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm">Visits: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-72 flex flex-col justify-center">
            <div className="text-white text-lg font-semibold mb-2">Top 5 Locations</div>
            <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cities} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#b8b9c1" />
                        <XAxis 
                            dataKey="city" 
                            angle={-45}
                            textAnchor="end"
                            height={70}
                            interval={0}
                            stroke="#fff"
                            tick={{ fill: '#fff' }}
                        />
                        <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#b8b9c1', strokeWidth: 1 }} />
                        <Legend wrapperStyle={{ color: '#fff' }} />
                        <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#b8b9c1" 
                            strokeWidth={2}
                            dot={{ r: 4, stroke: '#fff', fill: '#b8b9c1' }}
                            activeDot={{ r: 6, stroke: '#fff', fill: '#b8b9c1' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}