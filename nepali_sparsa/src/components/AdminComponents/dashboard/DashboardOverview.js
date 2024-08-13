import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import StatsCard from './StatsCard';
import LatestOrders from './LatestOrders';
import './styles/DashboardOverview.css';

const DashboardOverview = () => {
// const [totalSales, setTotalSales] = useState(0);
// const [totalUsers, setTotalUsers] = useState(0);
// const [totalSoldItems, setTotalSoldItems] = useState(0);
// const [latestOrders, setLatestOrders] = useState([]);

// useEffect(() => {
//     const fetchData = async () => {
//     const salesResponse = await axios.get('/api/sales/total');
//     const usersResponse = await axios.get('/api/users/total');
//     const itemsResponse = await axios.get('/api/items/sold/total');
//     const ordersResponse = await axios.get('/api/orders/latest');
    
//     setTotalSales(salesResponse.data.total);
//     setTotalUsers(usersResponse.data.total);
//     setTotalSoldItems(itemsResponse.data.total);
//     setLatestOrders(ordersResponse.data.orders);
//     };

//     fetchData();
// }, []);

return (
    <div className="dashboard">
    <div className="dashboard-content">
        <div className="stats-cards">
        {/* <StatsCard title="Total Sales" value={`$${totalSales}`} />
        <StatsCard title="Total Users" value={totalUsers} />
        <StatsCard title="Total Sold Items" value={totalSoldItems} /> */}
        <StatsCard title="Total Sales" value={''} />
        <StatsCard title="Total Users" value={''} />
        <StatsCard title="Total Sold Items" value={''} />
        </div>
        <div className="chart">
        {/* Add your chart component here */}
        </div>
        {/* <LatestOrders orders={latestOrders} /> */}
    </div>
    </div>
);
};

export default DashboardOverview;
