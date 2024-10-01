import React from "react";
import { FaLinkedin, FaGithub, FaDownload } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-6">

      <div className="flex flex-col md:flex-row items-center justify-center mb-10 mt-10">

        <div className="bg-white  shadow-lg p-8 flex flex-col items-center w-full md:w-1/3 mb-6 md:mb-0 md:mr-5" style={{borderRadius:'50px'}}>
          <img
            src="https://res.cloudinary.com/dq5bhyeii/image/upload/v1726750135/profile_atgamq.jpg"
            alt="Aditya"
            className="rounded-full w-48 h-48 border-4 border-blue-500 mb-6"
          />
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://www.linkedin.com/in/aditya-ayush-a76a81271"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedin style={{fontSize:'50px'}}/>
            </a>
            <a
              href="https://github.com/letscodeaditya"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <FaGithub style={{fontSize:'50px', color:'black'}}/>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 w-full md:w-2/3 text-center md:text-left" style={{borderRadius:'50px'}}>
          <h1 className="text-5xl font-bold mb-4 text-gray-800" style={{fontFamily:'"Josefin Sans", system-ui',fontWeight:'400',fontStyle:'normal',fontSize:'50px'}}>About Me</h1>
          <p className="text-lg text-gray-600" style={{fontFamily:'"Josefin Sans", sans-serif',fontWeight:'300',fontStyle:'normal'}}>
          Hi, I’m Aditya Ayush, the developer behind this real estate project built with{" "}
            <strong>React, Spring Boot, and MySQL</strong>. This project enables users
            to find properties, interact with sellers, and manage their listings through
            a modern, user-friendly interface. I'm passionate about full-stack development
            and continuously exploring new technologies such as <strong>DevOps</strong> and 
            <strong> AWS cloud services</strong>. The chat functionality
            in this project is built using the <strong>MERN stack</strong>, and the application itself utilizes
            a <strong>microservices</strong> architecture to ensure scalability and efficiency.
          </p>
        </div>
      </div>


      <section className="skills mb-10">
        <div className="bg-white rounded-lg shadow-lg p-8"style={{borderRadius:'40px'}}>
         
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 d-flex align-items-center" style={{fontFamily:'"Josefin Sans", system-ui',fontWeight:'1000',fontStyle:'normal',fontSize:'30px'}}>MADE with <FaHeart style={{color:'red',marginRight:'10px',marginLeft:'10px'}}/> And -</h2>
       
          <ul className="ms-5 grid grid-cols-2 md:grid-cols-5 gap-7 text-lg text-gray-600 ">
            <li>React</li>
            <li>Spring Boot</li>
            <li>MySQL</li>
            <li>JavaScript</li>
            <li>Node.js</li>
            <li>Bootstrap</li>
            <li>Material.UI</li>
            <li>React-Toasty</li>
            <li>AOS</li>
            <li>React-icon</li>
            <li>React-icon</li>
            <li>AWS</li>
            <li>Docker</li>
            <li>Vercel</li>
            <li></li>
          </ul>
        </div>
      </section>


      <section className="resume mb-10 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full md:w-1/2" style={{borderRadius:'50px'}}>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800"style={{fontFamily:'"Josefin Sans", system-ui',fontWeight:'400',fontStyle:'normal',fontSize:'50px'}}>Resume</h2>
          <a
            href="https://drive.google.com/file/d/19i893UueP4Vfd7RAHMOvRyCtP9x_o_kw/view?usp=drive_link"
            download
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md inline-flex items-center"
          >
            <FaDownload className="mr-2" />
            Download My Resume
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
