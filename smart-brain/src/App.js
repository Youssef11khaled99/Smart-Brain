import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
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
const app = new Clarifai.App({
  apiKey: 'a5731e15cb6349c2b12b4ddf400a7a2a'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }
  onChangeInput = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({isSignedIn: false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }
  
  render() {
    return (
      <div className="App">
       
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        <Particles 
          className='particles' 
          params={particlesOptions}
          />
          {(() => {
            switch (this.state.route) {

              case "signin":   return  <SignIn onRouteChange={this.onRouteChange} />;

              case "register": return <Register onRouteChange={this.onRouteChange} />;

              default:      return (
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm 
                          onChangeInput={this.onChangeInput} 
                          onSubmit={this.onSubmit} 
                          />
                        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
                      </div>
              )  
                    
            }
          })()}
      </div>
    );
  }

  
}

export default App;
