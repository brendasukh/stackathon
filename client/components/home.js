import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

export default class Home extends React.Component {
    constructor() {
    super();
    this.styling = this.styling.bind(this);
    this.scrollUp = this.scrollUp.bind(this);
  }

  componentDidMount() {
    this.styling();
  }

  scrollUp(){
      window.scrollTo(0,0);
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
    render () {
        return (
        <div id="page" ref="page">
            <section className="one">
                <h1 className = "one-child description">bringing together human emotion and technology</h1>
                <div className="nav one-child">
                    <h1 style={{color: 'pink'}}><Link to='/'>👩🏻‍💻 Emotiva</Link></h1>
                    <ul className="nav-links">
                        <li><Link to="/camera">TRY IT YOURSELF</Link></li>
                        <li><Link to="/">EMOJIFY</Link></li>
                    </ul>
                </div>
                <div className="next"></div>
            </section>
            <section className="two">
                <h1 className = "two-child description">we capture your image and use Microsoft's Emotion Detection API to give you suggestions based on your mood</h1>
                <div className="nav">
                    <h1 className="two-child" style={{color: 'pink'}}><Link to='/'>HOW IT WORKS</Link></h1>
                    <ul className="nav-links">
                    </ul>
                </div>
                <div className="next"></div>
            </section>
            <section className="three">
                <h1 className = "two-child description">our mood controls who we are and how we behave and is a big part of our identity</h1>
                <div className="nav">
                    <h1 className="two-child" style={{color: 'pink'}}><Link to='/'>Why Should You Care</Link></h1>
                    <ul className="nav-links">
                    </ul>
                </div>
                <div className="first" onClick={this.scrollUp}></div>
            </section>
        </div>

    )
  }
}
