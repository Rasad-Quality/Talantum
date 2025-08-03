import React from "react";
import './Footer.css';
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";



function Footer() {
    return(
            <div className="footer-content">
                <div className="icons">
                    <FaFacebookF className="icon"/>
                    <AiFillInstagram className="icon"/>
                    <FaTwitter className="icon"/>
                </div>
                <p className="footer-text">© 2025 IT Vacancies. All rights reserved.</p>
                <p className="footer-text">TLM™</p>
            </div>
    )

}

export default Footer;