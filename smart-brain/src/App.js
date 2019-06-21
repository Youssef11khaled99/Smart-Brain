import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  "particles": {
      "number": {
          "value": 100,
          "density": {
            "enable": false
        }
      },
      "size": {
          "value": 4
      }
  },
  "interactivity": {
    "events": {
      "onhover": {
          "enable": true,
          "mode": "bubble repulse"
      }
  },
  "modes": {
      "bubble": {
          "size": 6,
          "distance": 40
      }
  }
  }

}


function App() {
  return (
    <div className="App">
     <Particles className='particles'
    params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* 
      
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
