import React from "react"
import ReactDOM from "react-dom"


class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.takeVideo = this.takeVideo.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.takeVideo();
  }

  takeVideo(){
      var video = this.refs.video;

      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // Not adding `{ audio: true }` since we only want video now
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
              video.src = window.URL.createObjectURL(stream);
              video.play();
          });
      }
  }

  handleClick(evt){
    var context = this.refs.canvas.getContext('2d');
    var video = this.refs.video;
    context.drawImage(video, 0, 0, 640, 480);
  }


  render() {
    return (
      <div>
        <video id="video" ref="video" width="640" height="480" autoPlay></video>
        <button id="snap" onClick={this.handleClick}>Snap Photo</button>
        <canvas id="canvas" ref="canvas" width="640" height="480"></canvas>
      </div>
    )
  }
}

export default Camera;
