import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import LoginForm from './login';

const NotFoundPage = () => {
  return (
    <section style={{ padding: '40px 0', background: '#fff', fontFamily: 'Arvo, serif' }} className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div
                style={{
                  backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                  height: '400px',
                  backgroundPosition: 'center',
                }}
                className="four_zero_four_bg"
              >
                <h1 style={{ fontSize: '80px' }} className="text-center">
                  404
                </h1>
              </div>

              <div style={{ marginTop: '-50px' }} className="contant_box_404">
                <h3 style={{ fontSize: '80px' }} className="h2">
                  Look like you're lost
                </h3>

                <p>The page you are looking for is not available!</p>

                <Link
                  to="/"
                  style={{
                    color: '#fff!important',
                    padding: '10px 20px',
                    background: '#39ac31',
                    margin: '20px 0',
                    display: 'inline-block',
                  }}
                  className="link_404"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
