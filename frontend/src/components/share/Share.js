import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Navbar from '../browsing/Navbar';

export default class Share extends Component {
  render() {
    const shareUrl = 'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRyZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60';

    return (
      <div className='nav'>
        <Navbar />
        <div
          style={{
            background: '#f0f0f0', 
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px', 
          }}
        >
          <h1>Stylize</h1>
          <h2
            style={{
              fontSize: '24px', 
              color: '#333', 
              marginBottom: '20px', 
            }}
          >
            Want to share your match?
          </h2>
          <div
            style={{
              backgroundColor: '#1877f2', 
              color: '#fff', 
              padding: '10px 20px',
              borderRadius: '5px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center', 
            }}
          >
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={40} className="icon" />
              <span
                style={{
                  marginLeft: 15, 
                }}
              >
                Share on Facebook
              </span>
            </FacebookShareButton>
          </div>
        </div>
      </div>
    );
  }
}
