
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const OurRevenue = ({cars}) => {
        
    return (
        <div className='container mx-auto pt-5'>
            <h1 className='text-primary text-3xl  text-center'>Trending Revenue</h1>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={cars}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="model" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="dailyPrice" fill="#800080" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OurRevenue;