import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveImageContent } from '../store';


class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
    this.takeVideo = this.takeVideo.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
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

  clearCanvas(){
    var context = this.refs.canvas.getContext('2d');
    // context.fillStyle = "#AAA";
    // context.fillRect(0, 0, 640, 480);
    context.drawImage(video, 0, 0, 0, 0);
  }


  handleClick(evt){
    var context = this.refs.canvas.getContext('2d');
    var video = this.refs.video;
    var capturedImage = context.drawImage(video, 0, 0, 640, 480);
    var img = this.refs.canvas.toDataURL("image/png");
    // {"data:image/png;base64,
    //img = img.replace(/^data:image\/\w+;base64,/, "");
    this.setState({image: img});
    this.props.saveImage(img);
    this.clearCanvas();
  }

  render() {
    console.log("image: ", this.state.image)
    return (
      <div>
        <video id="video" ref="video" width="640" height="480" autoPlay></video>
        <button id="snap" onClick={this.handleClick}>Snap Photo</button>
        <canvas id="canvas" ref="canvas" width="640" height="480"></canvas>
        <img src={this.state.image}  />
      </div>
    )
  }
}

const mapStateToProps = ({  }) => ({  });

const mapDispatchToProps = (dispatch) => {
  return {
    saveImage(imageContent) {
      dispatch(saveImageContent(imageContent));
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Camera));

