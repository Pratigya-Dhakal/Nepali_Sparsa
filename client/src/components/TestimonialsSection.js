import React from 'react';
import './styles/TestimonialsSection.css';
import testImage from '../assets/heroSection.png';


const testimonialsData = [
{
    name: "Nat Reynolds",
    image: {testImage},
    feedback: "Vitae suscipit tellus mauris a diam maecenas sed enim ut. Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin."
},
{
    name: "Celia Almeda",
    image: {testImage},
    feedback: "Pharetra vel turpis nunc eget lorem. Quisque id diam vel quam elementum pulvinar etiam. Urna porttitor rhoncus dolor purus non enim praesent elementum."
},
{
    name: "Bob Roberts",
    image: {testImage},
    feedback: "Mauris augue neque gravida in fermentum. Praesent semper feugiat nibh sed pulvinar proin. Nibh nisl dictumst vestibulum rhoncus est pellentesque elit."
}
];

const TestimonialsSection = () => {
return (
    <div className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <p className="subtitle">We place huge value on strong relationships and have seen the benefit they bring to our business. Customer feedback is vital in helping us to get it right.</p>
        <div className="testimonials">
            {testimonialsData.map((testimonial, index) => (
            <div className="testimonial" key={index}>
                <img src={testImage} alt={testimonial.name} />
                <p>{testimonial.feedback}</p>
                <div className="name">{testimonial.name}</div>
            </div>
            ))}
        </div>
    </div>
);
}

export default TestimonialsSection;
