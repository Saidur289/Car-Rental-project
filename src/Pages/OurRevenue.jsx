
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const OurRevenue = () => {
    const bookingRevenueData = [
        { month: "January", revenue: 5000 },
        { month: "February", revenue: 7500 },
        { month: "March", revenue: 6200 },
        { month: "April", revenue: 8300 },
        { month: "May", revenue: 9100 },
      ];
      
    
    return (
        <div className='container mx-auto pt-5'>
            <h1 className='text-primary text-3xl  text-center'>Trending Revenue</h1>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={bookingRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OurRevenue;