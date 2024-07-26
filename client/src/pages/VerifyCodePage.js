import React, { useState } from 'react';
import './styles/VerifyCode.css';

const VerifyCode = () => {
const [code, setCode] = useState('');

const handleSubmit = (e) => {
    e.preventDefault();
    // Add verification logic here
};

return (
    <div className="verify-code">
    <div className="form-container">
        <div className="logo">C</div>
        <h2>Clothing.</h2>
        <h3>Verify Code</h3>
        <p>Please enter the code we just sent to email</p>
        <form onSubmit={handleSubmit}>
        <label>Code *</label>
        <div className="code-input">
            <input 
            type="text" 
            maxLength="1" 
            value={code[0] || ''} 
            onChange={(e) => setCode(prev => prev.slice(0, 1) + e.target.value)} 
            />
            <input 
            type="text" 
            maxLength="1" 
            value={code[1] || ''} 
            onChange={(e) => setCode(prev => prev.slice(0, 1) + e.target.value)} 
            />
            <input 
            type="text" 
            maxLength="1" 
            value={code[2] || ''} 
            onChange={(e) => setCode(prev => prev.slice(0, 1) + e.target.value)} 
            />
            <input 
            type="text" 
            maxLength="1" 
            value={code[3] || ''} 
            onChange={(e) => setCode(prev => prev.slice(0, 1) + e.target.value)} 
            />
        </div>
        <button type="submit">Verify</button>
        </form>
        <p>Didn’t receive code? <a href="#">Resend Code</a></p>
    </div>
    <div className="image-container">
        <img src="path/to/image.jpg" alt="Fashion Model" />
        <div className="testimonial">
        <p>
            “Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.”
        </p>
        <p>Leslie Alexander</p>
        <span>Fashion Enthusiast</span>
        </div>
    </div>
    </div>
);
};

export default VerifyCode;
