import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { uploadImageContent, updateEmotion } from '../store';


class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    }
    this.takeVideo = this.takeVideo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.styling = this.styling.bind(this);
    this.emotionRedirect = this.emotionRedirect.bind(this);
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

  handleClick(evt) {
    var context = this.refs.canvas.getContext('2d');
    var video = this.refs.video;
    var capturedImage = context.drawImage(video, 0, 0, 640, 480);
    var img = this.refs.canvas.toDataURL("image/jpeg");
    this.setState({image: img});
    this.props.uploadImage(img);
  }

  handlePage(evt){
    evt.preventDefault();
    var context = this.refs.canvas.getContext('2d');
    context.clearRect(0, 0, 640, 480);
    this.props.updateEmotion();
    window.scrollTo(0, 0);
  }
  emotionRedirect(){
    switch(this.props.emotion){
      case 'anger':
        return 'https://youtu.be/xFKe03Z8ASU'
      case 'contempt':
        return 'https://www.youtube.com/watch?v=UzPMMSKfKZQ'
      case 'disgust':
        return 'https://youtu.be/XyNlqQId-nk?t=39s'
        // cat video
      case 'sadness':
        return 'https://www.youtube.com/watch?v=Jc8VaMQ5aOo'
      case 'fear':
        return 'https://www.youtube.com/watch?v=kFv4qYZQz1g'
      case 'happiness':
        return 'https://youtu.be/ZbZSe6N_BXs?t=17s'
      case 'neutral':
        return 'https://www.youtube.com/watch?v=Jc8VaMQ5aOo'
      case 'surprise':
        return 'https://www.youtube.com/watch?v=GRls1Gslc9Y'
        //surprsing facts about earth'
    }
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
      //returns the size of an element and its position relative to the viewport.
      var offset = self.getBoundingClientRect();
      //returns the distance of the current element relative to the top of the offsetParent node.
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
         <section className="camera-one">
            <h1 className = "one-child description">check this out of you want to see magic happen</h1>
            <div className="nav one-child">
                <h1 style={{color: 'pink'}}><Link to='/camera'>analyze your mood</Link></h1>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">EMOJIFY</Link></li>
                </ul>
            </div>
          <div className="next"></div>
        </section>
        <section className="camera-two">
          <h1 className = "two-child description">
            <video className="video" id="video" ref="video" width="640" height="480" autoPlay></video>
            </h1>
            <div className="nav two-child">
                <h1 style={{color: 'pink'}}><Link to='/camera'>How are you feeling?</Link></h1>
            </div>

          <button className="next" id="snap" onClick={this.handleClick}><span className="glyphicon">&#xe046;</span></button>
        </section>
        <section className="camera-three">
            <h1 className = "two-child description">
            <canvas className="canvas" id="canvas" ref="canvas" width="640" height="480"></canvas>
            </h1>
            <div className="nav two-child">
                <h1 style={{color: 'white'}}><Link to='/camera'>Your picture</Link></h1>
            </div>
          <div className="next"></div>
        </section>
        <section className="camera-four">
          <div className = "four-child description">
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
            : (this.props.emotion && this.props.emotion === 'surprise')
            ? <img src='https://developer.affectiva.com/wp-content/uploads/sites/2/2017/05/flushed.png' width="200" height="200"></img>
            : <h1>Please take a picture having human face!</h1>
          }
              {
                this.props.emotion !=='nothing' ? <a href={this.emotionRedirect()}>{this.props.emotion}</a> : <p>Please take a picture having human face! :) </p>
              }
          </div>
          <div className="first" onClick={this.handlePage}></div>
          <div className="nav four-child">
            <h1 style={{color: 'white'}}><a href='https://youtu.be/xFKe03Z8ASU'>Your Results</a></h1>
          </div>
        </section>
      </div>

    )
  }
}
const mapStateToProps = ({ emotion }) => ({ emotion })

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage(imageContent) {
      dispatch(uploadImageContent(imageContent));
    },
    updateEmotion(){
      dispatch(updateEmotion('nothing'));
    }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Camera));
