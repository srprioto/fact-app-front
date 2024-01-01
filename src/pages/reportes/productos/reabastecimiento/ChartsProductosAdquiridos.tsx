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

export const ChartsProductosAdquiridos = ({ data }:any) => {
  
    const valorMaximo:number = Math.max(...data.map((d:any) => d.total_adquirido));
    const diesCiento:number = Math.trunc(valorMaximo * 0.07);

    
    return (
        <div className="grid-1 gap m-0">
            <h4 className="mb-10 center strong">Productos mas adquiridos</h4>
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
                        <YAxis width={300} dataKey="producto" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total_adquirido" name='Total adquirido' barSize={20} fill="#8884d8" />

                    </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    )
}

