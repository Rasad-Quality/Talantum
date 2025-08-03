import React from 'react';
import './Jobs.css';

function Jobs({ job, onMoreClick, onApplyClick, jobTitle, experienceLevel, companyName, jobLocation }){
    return(
        
        <div className="job-container">
            <h2 className='title'>{jobTitle}</h2>
            <p>Experience : {experienceLevel || 'Not specified'}</p>
            <p>{companyName}</p>
            <p>{jobLocation}</p>
            <div className="btns">
            <button className='apply-btn' onClick={onApplyClick}>Apply</button>
            <button className='more-btn' onClick={() => onMoreClick(job)}>More...</button>
            </div>
        </div>
    )
}

export default Jobs;