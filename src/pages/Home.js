// Home.js
import React from 'react';

function Home() {
  return (
    <body>
    <div class="container">
      <div class="login-popup">
        <div class="login-contents">
          <img src="../assets/images/yujilogo.png" height="40px"/>
          <h1 class="dare">Millions of songs. <br/> Free on Spotify.</h1>
          {/* <!-- Fixed the structure here --> */}
          <button>
            <div class="button-content">
              Log In
              <img src="../assets/images/Login.png" height="20px"/>
            </div>
          </button>
        </div>
      </div>
    </div>
  </body>
  );
}

export default Home;
