import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CgProfile } from "react-icons/cg";
import './Navbar.css'; 
import { AuthContext } from '../AuthContext';
import { IoSearch } from "react-icons/io5";


function NavBar({ searchTerm, setSearchTerm, onProfileClick }) {
    const { user } = useContext(AuthContext);

    return (
        
            <nav className="nav">
                <h3 style={{ height: '40px',fontWeight:'bold', fontSize: '2em',marginLeft : '20px' , marginBottom: '-px' ,color:'#0BA40F'}}>Talantum</h3>
                <div className="sandv">
                <ul>
                    <li> <Link className='link' to="/">Home</Link>  </li>
                    <li> 
                        <Link className='link' to="#" onClick={(e) => { e.preventDefault(); toast.info("This is a demo project. This feature is not available."); }}>
                            Create New
                        </Link>
                    </li>                   
                </ul>
                <div className="search">
                    <label htmlFor="search"></label>
                    <input
                        type="text"
                        placeholder="Search Vacansies..."
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                </div>
                {user ? (
                    <div className="user-actions">
                        
                        <button onClick={onProfileClick} style={{borderRadius:'50%' , padding: '0px'}} className='navbarb'><CgProfile style={{fontSize:'2.7em' , color: '#0BA40F',} } /></button>
                    </div>
                ) : (
                    <Link to={"/signin"}><button className='navbarb2'>Sign in to Account</button></Link>
                )}
            </nav>
        
    )

}

export default NavBar