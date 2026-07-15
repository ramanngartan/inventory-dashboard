

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#2563EB",
    "#14B8A6",
    "#F59E0B",
    "#F43F5E",
    "#8B5CF6",
    "#0EA5E9",
    "#22C55E",
];

export default function CategoryPieChart({ data }) {

    return (

        <div className="bg-white rounded-2xl shadow border border-slate-200 p-8">

            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Products by Category
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={105}
                            paddingAngle={3}
                            isAnimationActive={true}
                            animationDuration={700}
                        >

                            {data.map((entry, index) => (

                                <Cell
                                    key={entry.category}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip 
                            formatter={(value) => [`${value} Products`, "Count"]}
                        />

                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            iconType="circle"
                            wrapperStyle={{
                                paddingLeft: "30px",
                                lineHeight: "30px",
                                fontSize: "15px",
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}