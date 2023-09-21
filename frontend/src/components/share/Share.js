import React, { Component } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

export default class Share extends Component {
  render() {
    const shareUrl = 'https://images.unsplash.com/photo-1533659828870-95ee305cee3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRyZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60';
    return (
      <div
        style={{
          background: '#f0f0f0', // Background color
          minHeight: '100vh', // Minimum height to fill the viewport
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px', // Add some padding
        }}
      >
        <h1>Stylize</h1>
        <h2
          style={{
            fontSize: '24px', // Font size
            color: '#333', // Text color
            marginBottom: '20px', // Spacing at the bottom
          }}
        >
          Want to share your match?
        </h2>

        <div
          style={{
            backgroundColor: '#1877f2', // Blue color
            color: '#fff', // Text color
            padding: '10px 20px', // Padding
            borderRadius: '5px', // Rounded corners
            cursor: 'pointer', // Cursor style
            display: 'flex',
            alignItems: 'center', // Center content vertically
          }}
        >
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={40} className="icon" />
            <span
              style={{
                marginLeft: 15, // Spacing between icon and text
              }}
            >
              Share on Facebook
            </span>
          </FacebookShareButton>
        </div>
      </div>
    );
  }
}
