import React from 'react';
import './styles/ContactSupportForm.css';

const ContactSupportForm = ({ closeModal }) => {
return (
    <div className="modal">
    <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Contact Support</h2>
        <form>
        <div className="input-group">
            <input type="text" id="name" name="name" placeholder="Name" required />
        </div>
        <div className="input-group">
            <input type="email" id="email" name="email" placeholder="Email" required />
        </div>
        <div className="input-group">
        <input type="text" id="subject" name="subject" placeholder="Subject" required />
        </div>
        <div className="input-group">
            <textarea id="message" name="message" placeholder="Message" required></textarea>
        </div>
        <button type="submit">SEND EMAIL</button>
        </form>
    </div>
    </div>
);
};

export default ContactSupportForm;
