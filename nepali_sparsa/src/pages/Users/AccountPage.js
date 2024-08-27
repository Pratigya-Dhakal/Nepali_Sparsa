import React from 'react';
import Sidebar from '../../components/UserComponents/profile/Sidebar';
import UserCard from '../../components/UserComponents/profile/UserCard';
import AddressCard from '../../components/UserComponents/profile/AddressCard';
import OrderCard from '../../components/UserComponents/profile/OrderCard';
import './styles/AccountPage.css';
import Navbar from '../../components/UserComponents/Navbar';

const AccountPage = () => {
    return (
        <div>
            <Navbar />  
            <div className="account-page">
                <Sidebar />
                <div className="account-content">
                    <div className="cards-section">
                        <UserCard />
                        <AddressCard />
                    </div>
                    <div className="orders-section">
                        <OrderCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
