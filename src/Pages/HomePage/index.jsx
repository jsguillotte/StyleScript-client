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
          <img src="../../public/images/Folded-clothing.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Keep track of laundry</h3>
          <img src="../../public/images/laundry.jpg" alt="" width={300}/>
        </article>
        <article>
          <h3>Create your packing list</h3>
          <img src="../../public/images/packing.jpg" alt="" width={300}/>
        </article>
        
      </div>

    </section>
    <footer className="footer">
      <div >
        <div className="footer-text">
          
        <p> Julia Guillotte <a href="https://www.linkedin.com/in/julia-guillotte" target="_blank" rel="noopener noreferrer"><img src="../../public/images/linkedin.png" height="15px" width="15px" alt=""/></a><a href="https://github.com/jsguillotte" target="_blank" rel="noopener noreferrer"><img src="../public/images/github.png" height="15px" width="15px" alt=""/></a>
        | Maureen Treacy <a href="https://www.linkedin.com/in/maureen-treacy-30714190/" target="_blank" rel="noopener noreferrer"><img src="../../public/images/linkedin.png" height="15px" width="15px" alt=""/></a><a href="https://github.com/maureen-treacy" target="_blank" rel="noopener noreferrer"><img src="../public/images/github.png" height="15px" width="15px" alt=""/></a></p>
        </div>
      </div>

    </footer>
  
    </div>
  );
}

export default HomePage;