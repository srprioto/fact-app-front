import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

interface PieChartsLabel {
    data:Array<any>;
    color:Array<string>;
    width?:number; // 300 por defecto
    height?:number; // 300 por defecto
}

export function PieChartsLabel({ data, color, width = 300, height = 300 }:PieChartsLabel) {

    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data}
                cx={width/2}
                cy={height/2}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {
                    (data).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={color[index % color.length]} />
                    ))
                }
            </Pie>
        </PieChart>
    );
}