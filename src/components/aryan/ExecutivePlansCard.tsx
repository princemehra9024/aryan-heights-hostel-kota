import React from "react";
export const ExecutivePlansCard = () => {
  return (
    <a href="https://executiveplans.antideploy.com/" target="_blank" rel="noopener noreferrer" className="ep-card">
      {/* Noise texture */}
      <div className="ep-noise"></div>
      
      {/* Logo */}
      <div className="ep-logo">
        <span className="ep-logo-mark">EP</span>
        <span className="ep-logo-text">EXECUTIVE <strong>PLANS</strong></span>
        <div className="ep-ornament">
          <div className="ep-line-l"></div>
          <div className="ep-diamond"></div>
          <div className="ep-line-r"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="ep-content">
        <h3>CRAFTED WITH <span className="ep-accent">PURPOSE.</span></h3>
        <p className="ep-sub">Designed & Developed by Executive Plans</p>
        <div className="ep-divider"></div>
        <p className="ep-desc">We build modern digital experiences<br />that help businesses grow.</p>
      </div>
      
      {/* Footer */}
      <div className="ep-bottom">
        <span className="ep-explore">
          EXPLORE OUR WORK 
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </span>
        <span className="ep-domain">?? executiveplans.antideploy.com</span>
      </div>
      
      {/* Shine */}
      <div className="ep-shine"></div>
    </a>
  );
};
