import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function DeviceStats({ stats = [] }) {
    const deviceCount = stats.reduce((acc, item) => {
        if (!acc[item.device]) {
            acc[item.device] = 0;
        }
        acc[item.device]++;
        return acc;
    }, {});

    const result = Object.keys(deviceCount).map((device) => ({
        device,
        count: deviceCount[device],
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#44455a] text-white p-2 border border-gray-500 rounded shadow">
                    <p className="font-semibold">{payload[0].name}</p>
                    <p className="text-sm">Count: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-80 flex flex-col justify-center">
            <div className="text-white text-lg font-semibold mb-2">Device Distribution</div>
            <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={result}
                            dataKey="count"
                            nameKey="device"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={({ device, percent }) => 
                                `${device}: ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                        >
                            {result.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#b8b9c1', strokeWidth: 1 }} />
                        <Legend wrapperStyle={{ color: '#fff' }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}