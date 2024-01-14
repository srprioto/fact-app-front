import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export const ChartPieMontoTotalUsuario = ({ data }:any) => {
    
    return (
        <>
            {
                !!data && 
                <div>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <PieChart width={400} height={400}>
                            <Pie
                                dataKey="total_vendido"
                                nameKey='name'
                                isAnimationActive={false}
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            }
        </>
    )
}
