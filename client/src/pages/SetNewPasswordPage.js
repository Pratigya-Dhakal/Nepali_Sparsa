import React from 'react';
import './SetNewPasswordPage.css';

const SetNewPasswordPage = () => {
return (
    <div className="set-new-password">
    <div className="set-new-password-content">
        <div className="form-section">
        <h2>Set new password</h2>
        <p>Must be at least 8 characters</p>
        <form>
            <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input type="password" id="password" placeholder="Enter Password" required />
            </div>
            <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password *</label>
            <input type="password" id="confirm-password" placeholder="Enter Password" required />
            </div>
            <button type="submit" className="reset-password">Reset Password</button>
        </form>
        </div>
        <div className="image-section">
        <img src="/path-to-image.jpg" alt="Fashion Enthusiast" />
        <div className="quote">
            <p>“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.”</p>
            <span>Leslie Alexander</span>
            <span>Fashion Enthusiast</span>
        </div>
        </div>
    </div>
    </div>
);
};

export default SetNewPasswordPage;
