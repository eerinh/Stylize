import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import Navbar from '../navbar/Navbar'; 

export default class Share extends Component {
  render() {
    const shareUrl = this.props.selectedImage;
    
    return (
          <div>
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} className="icon" />
              <span style={{marginLeft: 15, }}></span>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={40} className="icon" />
              <span style={{marginLeft: 15, }}></span>
            </TwitterShareButton>
            <FacebookMessengerShareButton url={shareUrl}>
              <FacebookMessengerIcon size={40} className="icon" />
              <span style={{marginLeft: 15, }}></span>
            </FacebookMessengerShareButton>
          </div>

    );
  }
}
