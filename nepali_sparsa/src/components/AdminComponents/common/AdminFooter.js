import React from 'react';
import './styles/AdminFooter.css';


const AdminFooter = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='copyright'>
            <p>&copy; {currentYear} Nepali Sparsa</p>
        </footer>
    );
};

export default AdminFooter;
