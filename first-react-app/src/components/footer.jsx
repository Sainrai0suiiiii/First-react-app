import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col brand">
        <div className="footer-logo-row">
          <span className="footer-logo-icon">
            {/* Location Pin SVG */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M12 22s8-7.58 8-12A8 8 0 0 0 4 10c0 4.42 8 12 8 12Z" stroke="#1de9b6" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="10" r="3" stroke="#1de9b6" strokeWidth="2" fill="none"/>
            </svg>
          </span>
          <span className="footer-logo-text"><b>24Hrs Online Grocery</b></span>
        </div>
        <p className="footer-desc">
        Since last 25 years we are involved in grocery product So we insure to deliver the best quality product on time at reasonable price to your doorstep.
        </p>
        <div className="footer-socials">
          <a href="#"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H6v4h4v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z" stroke="#b2fef7" strokeWidth="2" fill="none"/></svg></a>
          <a href="#"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.7.11 1.03A12.94 12.94 0 0 1 3 1.1a4.48 4.48 0 0 0-.61 2.27c0 1.56.8 2.93 2.02 3.74A4.52 4.52 0 0 1 2 6.13v.06c0 2.18 1.55 4 3.7 4.42a4.52 4.52 0 0 1-2.04.08c.58 1.8 2.26 3.12 4.25 3.16A9.05 9.05 0 0 1 1 19.54a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3Z" stroke="#b2fef7" strokeWidth="2" fill="none"/></svg></a>
          <a href="#"><svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#b2fef7" strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="5" stroke="#b2fef7" strokeWidth="2" fill="none"/><circle cx="17.5" cy="6.5" r="1.5" fill="#b2fef7"/></svg></a>
        </div>
      </div>
      <div className="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Home</a></li>   
          <li><a href="#">Search</a></li>
          <li><a href="#">Shopping List</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Categories</h4>               
        <ul>
          <li><a href="#">Grocery</a></li>
          <li><a href="#">Breverage</a></li>
          <li><a href="#">Meat</a></li>
          <li><a href="#">Kitchen</a></li>
          <li><a href="#">Home</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Contact Us</h4>              
        <ul className="footer-contact">
          <li>
            <span className="footer-icon">
              {/* Location SVG */}
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M12 22s8-7.58 8-12A8 8 0 0 0 4 10c0 4.42 8 12 8 12Z" stroke="#1de9b6" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="10" r="3" stroke="#1de9b6" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            Subidha marg, Subidha Chowk , Koteshower-32
          </li>
          <li>
            <span className="footer-icon">
              {/* Mail SVG */}
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="#1de9b6" strokeWidth="2" fill="none"/>
                <path d="m22 7-10 6-10-6" stroke="#1de9b6" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            24hrs@OnlineGrocery.com
          </li>
          <li>
            <span className="footer-icon">
              {/* Phone SVG */}
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 2 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.06.72 3.03a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.97.35 1.98.59 3.03.72A2 2 0 0 1 22 16.92Z" stroke="#1de9b6" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            9823400234
          </li>
        </ul>
      </div>
    </footer>
  );
}
