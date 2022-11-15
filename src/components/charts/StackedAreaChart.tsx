import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface stackedAreaChart {
    data:any;
    color?:string;
    dataKey?:string;
}

export const StackedAreaChart = ({ data, color = "#556ee6", dataKey = "Cantidad" }:stackedAreaChart) => {

    return (
        <div className="stacked-area-chart">

            <ResponsiveContainer width="100%" aspect={3}>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3"/> */}
                    <XAxis dataKey="Dia" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={dataKey} stackId="1" stroke={color} fill={color} />
                    {/* <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" /> */}
                    {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}
