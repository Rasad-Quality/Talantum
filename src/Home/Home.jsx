import React, { useState, useEffect, useMemo } from 'react'
import './Home.css'
import { Grid, Drawer, Box, Typography, Button, Divider } from '@mui/material' 
import Jobs from './Jobs'
import { toast } from 'react-toastify';
import jobsData from '../data/jobsData.json'
import { IoIosArrowDown } from "react-icons/io";

const initialFilters = {
    category: '',
    experience: null,
    jobType: null,
    salary: { min: '', max: '' }
};

function Home({ searchTerm }) {
    const [filters, setFilters] = useState(initialFilters);
    const [selectedJob, setSelectedJob] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    // Flatten jobs from categories and add category property to each job
    const allJobs = useMemo(() =>
        Object.entries(jobsData.categories).flatMap(([category, jobs]) =>
            jobs.map(job => ({ ...job, category }))
        ), []);

    const [displayedJobs, setDisplayedJobs] = useState(allJobs);

    useEffect(() => {
        let filteredJobs = allJobs;

        // Search filter
        setTimeout(() => {
            if (searchTerm) {
            filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (filters.category) {
            filteredJobs = filteredJobs.filter(job => job.category === filters.category);
        }

        // Experience filter
        if (filters.experience) {
            const experienceMap = { entry: '1-2 Years', interm: '2-5 Years', expert: '5+ Years' };
            filteredJobs = filteredJobs.filter(job => job.experience === experienceMap[filters.experience]);
        }

        // Job Type filter
        if (filters.jobType) {
            const jobTypeMap = { parttime: 'Part-Time', fulltime: 'Full-Time', freelance: 'Freelance' };
            filteredJobs = filteredJobs.filter(job => job.jobType === jobTypeMap[filters.jobType]);
        }

        // Salary filter
        const minSalary = Number(filters.salary.min);
        const maxSalary = Number(filters.salary.max);
        if (minSalary > 0) {
            filteredJobs = filteredJobs.filter(job => job.salary.min >= minSalary);
        }
        if (maxSalary > 0) {
            filteredJobs = filteredJobs.filter(job => job.salary.max <= maxSalary);
        }

        setDisplayedJobs(filteredJobs);
            
        }, 500);
    }, [searchTerm, filters, allJobs]);

    const resetFilters = () => {
        setFilters(initialFilters);
        setDisplayedJobs(allJobs);
    };

    const handleButtonClick = (e) => {
        const { id, dataset } = e.currentTarget;
        const category = dataset.category;

        if (category) {
            setFilters(prev => ({
                ...prev,
                [category]: prev[category] === id ? null : id,
            }));
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSalaryChange = e => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, salary: { ...prev.salary, [name]: value } }));
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        // Delay clearing selected job to allow drawer to transition out smoothly
        setTimeout(() => setSelectedJob(null), 300);
    };

    const handleApplyClick = () => {
        toast.info("This is a demo project. Job listings are not real opportunities.");
    };

    return (
        <Grid container spacing={1} className="MMMcontainer">
            <Grid  
            marginLeft={'15px'} spacing={1} className="filter" size = {3.3} >
                <div className="ccontainer">
                    <div className="catbtns">
                        <button className="btncat2" onClick={resetFilters}>Reset</button>
                    </div>
                    <div className="categoryD" id='category'>
                    <p>Category : </p>
                    <br />
                    <div className="select-wrapper">
                        <select name="category" value={filters.category} id="searchc" className='searchc' onChange={handleInputChange}>
                            <option className='option1' value="">All Categories</option>
                            <option className='option1' value="Frontend Development">Frontend Development</option>
                            <option className='option1' value="Backend Development">Backend Development</option>
                            <option className='option1' value="Mobile Development">Mobile Development</option>
                            <option className='option1' value="Data Science">Data Science</option>
                            <option className='option1' value="DevOps">DevOps</option>
                            <option className='option1' value="UI/UX Design">UI/UX Design</option>
                            <option className='option1' value="Quality Assurance">Quality Assurance</option>
                            <option className='option1' value="Cybersecurity">Cybersecurity</option>
                        </select>
                        <IoIosArrowDown className='arrowc'/>
                    </div>


                </div>
                <div className="categoryD" id='experience'>
                    <p>Experience : </p>
                    <br />
                    <div className="experiencecc">
                    <button
                        onClick={handleButtonClick}
                        data-category="experience"
                        className={`fidiv ${filters.experience === 'entry' ? 'active' : ''}`}
                        id='entry'
                    >
                            1-2 Years
                    </button>
                    
                    <button
                        onClick={handleButtonClick}
                        data-category="experience"
                        className={`fidiv ${filters.experience === 'interm' ? 'active' : ''}`}
                        id='interm'
                    >
                        2-5 Years
                    </button>

                    <button
                        onClick={handleButtonClick}
                        data-category="experience"
                        className={`fidiv ${filters.experience === 'expert' ? 'active' : ''}`}
                        id='expert'>
                        5+ Years
                    </button>
                    </div>
                </div>
                <div className="categoryD" id='salary'>
                    <p>Salary : </p>
                    <br />
                    <div className="numbs" id='numbssalary'>
                    <input type="number" className='numb' name="min" id="min" placeholder='Min' min={0} value={filters.salary.min} onChange={handleSalaryChange} />
                    -
                    <input type="number" className='numb' name="max" id="max" placeholder='Max' min={0} value={filters.salary.max} onChange={handleSalaryChange} />
                    </div>
                    
                </div>
                <div className="categoryD" id='jobtype'>
                    <p>Job Type : </p>
                    <br />
                    <div className="experiencecc" id='experiencecc'>
                    <button
                        onClick={handleButtonClick}
                        data-category="jobType"
                        className={`fidiv ${filters.jobType === 'parttime' ? 'active' : ''}`}
                        id='parttime'>
                            Part-Time
                    </button>
                    <button
                        onClick={handleButtonClick}
                        data-category="jobType"
                        className={`fidiv ${filters.jobType === 'fulltime' ? 'active' : ''}`}
                        id='fulltime'>
                            Full-Time
                    </button>
                    
                    <button
                        onClick={handleButtonClick}
                        data-category="jobType"
                        className={`fidiv ${filters.jobType === 'freelance' ? 'active' : ''}`}
                        id='freelance'>
                        Freelance
                    </button>
                    </div>
                </div>   

    
                </div>
            </Grid>
            <Grid className = 'jobs' size = {8.1} >
                <h3 id='h33'>{displayedJobs.length} Jobs Found</h3>
                <div className="joblisting">
                    {displayedJobs.map((job) => (
                        <Jobs
                            key={job.id}
                            job={job}
                            onApplyClick={handleApplyClick}
                            onMoreClick={handleJobClick}
                            jobTitle={job.title}
                            experienceLevel={job.experience}
                            companyName={job.companyName}
                            jobLocation={job.jobType === "Freelance" ? "Remote" : job.city}
                        />
                    ))}
                </div>
            </Grid>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
            >
                {selectedJob && (
                    <Box
                        sx={{ width: 450 , padding: '20px', backgroundColor: '#000',display: 'flex', flexDirection: 'column', height: '100%' }}
                        role="presentation"
                    >
                        <Box sx={{color: '#fff'}} 
                        flexGrow={1}>
                            <Typography variant="h5" gutterBottom>{selectedJob.title}</Typography>
                            <Typography variant="subtitle1" color='#fff'>{selectedJob.companyName}</Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography><strong>Category:</strong> {selectedJob.category}</Typography>
                            <Typography><strong>Experience:</strong> {selectedJob.experience}</Typography>
                            <Typography><strong>Job Type:</strong> {selectedJob.jobType}</Typography>
                            <Typography><strong>Location:</strong> {selectedJob.jobType === "Freelance" ? "Remote" : selectedJob.city}</Typography>
                            <Typography><strong>Salary:</strong> ${selectedJob.salary.min} - ${selectedJob.salary.max}</Typography>
                            <Typography sx={{ mt: 2 }}><strong>Description:</strong></Typography>
                            <Typography paragraph>
                                {selectedJob.description || 'Detailed job description is not available for this position. Please contact the employer for more information.'}
                            </Typography>
                        </Box>
                        <Box>
                            <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#0BA40F', '&:hover': { backgroundColor: '#09940d' } }} onClick={handleApplyClick}>Apply Now</Button>
                            <Button variant="outlined" fullWidth onClick={handleDrawerClose} sx={{ mt: 1, border: '2px solid #0BA40F',borderColor: '#0BA40F', color: '#fff' }}>Close</Button>
                        </Box>
                    </Box>
                )}
            </Drawer>
        </Grid>
    )
}

export default Home;