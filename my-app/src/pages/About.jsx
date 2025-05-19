import React from 'react';
import Header from '../components/Header';

function About() {
  return (
    <>
      <main>
        <h1>About the project</h1>
        <p>You are studing personal learning project. Sorry, but at the moment it is still not the real e-commers project. But, it will after I finished.</p>
        <p>My name is Oleksandr Starshynov. I am a former Senior Delivery manager. Now I am on my wey of switshibg to the full stecj developer position. So, the value of this project for me is precisely in the opportunity to study and apply certain knowledge in practice. If you are interested, below is a list of the technologies, plugins and third-party services used. And you can contact me through the following resources:</p>
        <p>Git, linkedin, e-mail</p>
        <div className="tech-div"><h2>Tech stack</h2>
        <p><ul>Front-end<li>Reach</li><li>Css</li><li>Javascript</li><li>Figma</li></ul></p>
        <p><ul>Back-end<li>Node.js + Express</li><li>React-Masonry-css</li><li>Bcrypt</li></ul></p>
        <p><ul>Databases<li>MongoBD</li><li>RestAPI</li><li>Swagger</li></ul></p>
        <p><ul>3rd-party servises<li>Strip</li><li>Cloudinary</li></ul></p>
        <p><ul>Deployment<li>CI/CD + GitHub Actions</li><li>AWS EC2</li><li>Netlify</li></ul></p>
        </div>
      </main>
    </>
  );
}

export default About;