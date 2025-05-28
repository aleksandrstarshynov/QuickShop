import React from 'react';
import Header from '../components/Header';

function About() {
  return (
    <>
      <main className="about-main">
        <h1>About the project</h1>
        <p className="about">My name is Oleksandr Starshynov. I am a former Senior Delivery manager. Now I am on my wey of switshibg to the full stecj developer position. So, the value of this project for me is precisely in the opportunity to study and apply certain knowledge in practice.</p>
        <p className="about">You are studing personal learning project. Sorry, but at the moment it is still not the real e-commers project. But, it will after I finished. My nearest plan if to update the logic of CSS file. Next main releas will be to bring the Basket-Checkout-Payment process</p>
        <p className="contacts about">Feel free to contact me through any of the following resources: <a href="https://github.com/aleksandrstarshynov">Git</a>, <a href="https://www.linkedin.com/in/oleksandr-starshynov-5a13ab58/">LinkEdIn</a>, <a href="mailto:starrdialogues@gmail.com">E-mail</a></p>
        {/* <div className="tech-div"><h2>Tech stack</h2>
        <p><ul>Front-end<li>Reach</li><li>Css</li><li>Javascript</li><li>Figma</li></ul></p>
        <p><ul>Back-end<li>Node.js + Express</li><li>React-Masonry-css</li><li>Bcrypt</li></ul></p>
        <p><ul>Databases<li>MongoBD</li><li>RestAPI</li><li>Swagger</li></ul></p>
        <p><ul>3rd-party servises<li>Strip</li><li>Cloudinary</li></ul></p>
        <p><ul>Deployment<li>CI/CD + GitHub Actions</li><li>AWS EC2</li><li>Netlify</li></ul></p>
        </div> */}
      </main>
    </>
  );
}

export default About;