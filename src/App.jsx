import { useState } from 'react';
import './App.css';
import NavBar from './NavBar/NavBar.jsx';
import SignIn from './Signing/SignIn.jsx';
import SignUp from './Signing/SignUp.jsx';
import Footer from './Footer/Footer.jsx';
import Home from './Home/Home.jsx';
import {Routes , Route} from 'react-router-dom';
import ProfileDrawer from './ProfileDrawer.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isProfileDrawerOpen, setProfileDrawerOpen] = useState(false);

    const toggleProfileDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setProfileDrawerOpen(open);
    };

    return (
    <>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onProfileClick={() => setProfileDrawerOpen(true)} />
        <Routes>
            <Route path='/' element={<Home searchTerm={searchTerm} />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
        </Routes>
        <ProfileDrawer
            open={isProfileDrawerOpen}
            onClose={toggleProfileDrawer(false)}
            onOpen={toggleProfileDrawer(true)}
        />

        <Footer/>
    </>
    )
  
}

export default App
