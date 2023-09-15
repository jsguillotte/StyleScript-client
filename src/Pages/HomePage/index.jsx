import React, { useState } from "react";


function HomePage() {
  
  return (
    <div>

    <div className="home-hero">
      <div className="hero-text">
        
      <h1>Personal Closet Planner</h1>
      </div>
    </div>
     
    <div className="homePage">
     
    </div>
    <section className="features">
      <div>
        <article>
          <h3>Organize your clothes</h3>
          <img src="/images/Folded-clothing.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Keep track of laundry</h3>
          <img src="/images/laundry.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Create your packing list</h3>
          <img src="/images/packing.jpg" alt="" width={300}/>
        </article>
        
      </div>
    </section>
    <section className="calendar">
      <div style={{ textAlign: 'center' }}>
        <h2>Plan outfits with a drag-and-drop calendar</h2>
        <img src="/images/calendar.png" alt="" width={600}/>
      </div>
    </section>
    <footer className="footer">
      <div >
        <div className="footer-text">
          
        <p> Julia Guillotte <a href="https://www.linkedin.com/in/julia-guillotte" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.png" height="15px" width="15px" alt=""/></a><a href="https://github.com/jsguillotte" target="_blank" rel="noopener noreferrer"><img src="/images/github.png" height="15px" width="15px" alt=""/></a>
        | Maureen Treacy <a href="https://www.linkedin.com/in/maureen-treacy-30714190/" target="_blank" rel="noopener noreferrer"><img src="/images/linkedin.png" height="15px" width="15px" alt=""/></a><a href="https://github.com/maureen-treacy" target="_blank" rel="noopener noreferrer"><img src="/images/github.png" height="15px" width="15px" alt=""/></a></p>
        </div>
      </div>

    </footer>
  
    </div>
  );
}

export default HomePage;