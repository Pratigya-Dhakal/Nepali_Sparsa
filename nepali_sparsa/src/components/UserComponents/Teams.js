import React from 'react';
import teamMember1 from '../../assets/heroSection.png';
import './styles/Teams.css';

const Teams = () => {
    return (
        <section className="team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
            <img src={teamMember1} alt="Team Member 1" />
            <h3>Pushpa Dhakal</h3>
            <p>Founder & CEO</p>
        </div>
        </section>
    );
}

export default Teams;
