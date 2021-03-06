import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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

const initialState= {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    })
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

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input});
    fetch('https://frozen-crag-19910.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input,
      })
    })
    .then( response => response.json())
    .then( response => {
      this.displayFaceBox(this.calculateFaceLocation(response))
      if (response) {
        fetch('https://frozen-crag-19910.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id,
          })
          
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      
    })
    .catch(err => console.log(err));
  }
 
  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
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

              case "signin":   return  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;

              case "register": return <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>;

              default:      return (
                    <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm 
                          onChangeInput={this.onChangeInput} 
                          onPictureSubmit={this.onPictureSubmit} 
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
