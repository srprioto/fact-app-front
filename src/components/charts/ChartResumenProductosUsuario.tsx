import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export const ChartResumenProductosUsuario = ({ data }:any) => {

    const valorMaximo:number = data ? Math.max(...data.map((d:any) => d.valor_venta_total)) : 0;
    const diesCiento:number = data ? Math.trunc(valorMaximo * 0.07) : 0;

    return (
        <>
            {
                !!data && 
                <ResponsiveContainer height="100%" aspect={2}>
                    <ComposedChart
                        layout="vertical"
                        data={data}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis 
                            type="number" 
                            domain={[0, valorMaximo + diesCiento]}
                        />
                        <YAxis width={300} dataKey="name" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="valor_venta_total" name='Total unid. vendidas' barSize={20} fill="#f1b44c" />
        
                    </ComposedChart>
                </ResponsiveContainer>
            }
        </>
    )
}
