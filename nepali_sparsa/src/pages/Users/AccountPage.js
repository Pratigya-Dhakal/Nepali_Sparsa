import React from 'react';
import Sidebar from '../../components/UserComponents/profile/Sidebar';
import './styles/AccountPage.css';
import Navbar from '../../components/UserComponents/Navbar';

const AccountPage = () => {
    return (
        <div>
            <Navbar />  
            <div className="account-page">
                <Sidebar />
                <div className="account-content">
                    {/* Other components like UserCard, AddressCard, and OrderCard will go here */}
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
