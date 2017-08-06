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
    this.styling = this.styling.bind(this);
  }

  componentDidMount() {
    this.takeVideo();
    this.styling();
  }

  takeVideo() {
    var video = this.refs.video;
    // Get access to the camera!
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
      });
    }
  }

  clearCanvas() {
    var context = this.refs.canvas.getContext('2d');
    context.drawImage(video, 0, 0, 0, 0);
  }


  handleClick(evt) {
    var context = this.refs.canvas.getContext('2d');
    var video = this.refs.video;
    var capturedImage = context.drawImage(video, 0, 0, 640, 480);
    var img = this.refs.canvas.toDataURL("image/jpeg");
    this.setState({image: img});
    this.props.saveImage(img);
    this.clearCanvas();
  }

  styling(){
    var page = this.refs.page;
    // This transition can be defined in the CSS if preferred.
    var transition = 'top .8s cubic-bezier(0.77, 0, 0.175, 1)';
    page.style.transition = transition;
    page.onclick = slideDown;

    function slideDown(e) {
      // Delegate.
      if (e.target.className !== 'next') {
        return;
      }

      // Prevent firing simultaneously.
      page.onclick = '';
      var self = e.target.parentNode;
      var offset = self.getBoundingClientRect();
      var scroll = self.offsetTop;

      // CSS Transition slide.
      page.style.top = (-offset.height-offset.top) + 'px';

      setTimeout(function () {
        // Reposition the real scrollbar.
        page.style.transition = 'none';
        page.style.top = '';
        window.scrollTo(0, offset.height+scroll);
        page.style.transition = transition;
        // Reattach event.
        page.onclick = slideDown;

        // This timeout length should match the CSS animation time (.8s).
      }, 800);
    }
  }

  render() {
    return (
      <div id="page" ref="page">
         <section className="one">
           <video id="video" ref="video" width="640" height="480" autoPlay></video>
          <button className="next" id="snap" onClick={this.handleClick}>Snap Photo</button>
        </section>
        <section className="two">
          <canvas id="canvas" ref="canvas" width="640" height="480"></canvas>
          <div className="next"></div>
        </section>
        <section className="three">
          {
            (this.props.emotion && this.props.emotion === 'anger')
            ? <img src='https://developer.affectiva.com/wp-content/uploads/sites/2/2017/05/rage.png' width="200" height="200"></img>
            : (this.props.emotion &&  this.props.emotion === 'contempt')
            ? <img src='http://68.media.tumblr.com/b219317c75d2ce2a6b43d1f60f259557/tumblr_ni6hvw0Ttu1sfxbt8o1_540.gif' width="200" height="200"></img>
            : (this.props.emotion &&  this.props.emotion === 'disgust')
            ? <img src='https://cdn.shopify.com/s/files/1/1061/1924/products/Confounded_Face_Emoji_large.png?v=1480481051' width="200" height="200"></img>
            : (this.props.emotion &&  this.props.emotion === 'fear')
            ? <img src='https://developer.affectiva.com/wp-content/uploads/sites/2/2017/05/scream.png' width="200" height="200"></img>
            : (this.props.emotion &&  this.props.emotion === 'happiness')
            ? <img src='https://s-media-cache-ak0.pinimg.com/originals/36/f2/af/36f2af1e2e85b403a247f52c78eace8d.png'width="200" height="200" ></img>
            : (this.props.emotion &&  this.props.emotion === 'neutral')
            ? <img src='https://developer.affectiva.com/wp-content/uploads/sites/2/2017/05/flushed.png' width="200" height="200"></img>
            : (this.props.emotion && this.props.emotion === 'sadness')
            ? <img src='https://developer.affectiva.com/wp-content/uploads/sites/2/2017/05/disappointed.png' width="200" height="200"></img>
            : <img src='https://developer.affectiva.com/wp-content/uploads/sites/2/2017/05/flushed.png' width="200" height="200"></img>
          }
        </section>
      </div>

    )
  }
}
const mapStateToProps = ({ emotion }) => ({ emotion })

const mapDispatchToProps = (dispatch) => {
  return {
    saveImage(imageContent) {
      dispatch(saveImageContent(imageContent));
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Camera));

