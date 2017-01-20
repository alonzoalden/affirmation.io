/**
*
* Phase
*
*/

import React from 'react';
import { Link } from 'react-router';
import './Phases.css';
import '../Animate.css';

class Phases extends React.Component {
  componentDidMount(){
    window.reload();
  }
  render() {
    const center = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    const flexbox = {
      'display': '-webkit-flex',
      'display': '-ms-flexbox',
      'display': 'flex',
      'overflow': 'hidden'
    };
    return (

      <div>
        <div className={flexbox}>
          <Link to="/WantToLearn">
            <div className="col-xs-12 col-md-6 bg1" style={{ 'height': '46vh' }}>
              <div style={center}>
                <a href="javascript:">
                      <div className="icon-box-01 bg1 col-sm-5ths col-xs-6">
                        <div className="icon-wrapper">
                          <div className="livicon-evo" data-options="
                              name: bulb.svg;
                              style: lines;
                              strokeColor: #ffffff;
                              strokeColorAction: #fff;
                              colorsOnHover: custom;
                              eventOn: self;
                              drawOnViewport: false
                          "></div>
                          <h5 className="text-center text-uppercase white">I WANT TO LEARN TO CODE</h5>
                          </div>
                        </div>
                      </a>
                </div>
            </div>
          </Link>
          <Link to="/LearningToCode">
            <div className="col-xs-12 col-md-6 bg2" style={{ 'height': '46vh' }}>
              <div style={center}>
                    <a href="javascript:">
                      <div className="icon-box-01 bg2 col-sm-5ths col-xs-6">
                          <div className="icon-wrapper">
                            <div className="livicon-evo" data-options="
                                name: rocket.svg;
                                style: lines;
                                strokeColor: #ffffff;
                                strokeColorAction: #fff;
                                colorsOnHover: custom;
                                eventOn: self;
                                drawOnViewport: true
                            "></div>
                            <h5 className="text-center text-uppercase white">I AM LEARNING TO CODE</h5>
                        </div>
                      </div>
                    </a>
                </div>
            </div>
          </Link>
          <Link to="/JobHunt">
            <div className="col-xs-12 col-md-6 bg3" style={{ 'height': '5vh' }}>
              <div style={center}>
                  <a href="javascript:">
                      <div className="icon-box-01 bg3 col-sm-5ths col-xs-6" style={{ 'height': '45vh' }}>
                        <div className="icon-wrapper">
                          <div className="livicon-evo" data-options="
                              name: dashboard.svg;
                              style: lines;
                              strokeColor: #ffffff;
                              strokeColorAction: #fff;
                              colorsOnHover: custom;
                              eventOn: self;
                              drawOnViewport: true
                          "></div>
                          <h5 className="text-center text-uppercase white">I AM ON THE JOB HUNT</h5>
                        </div>
                      </div>
                    </a>
                </div>
            </div>
          </Link>
          <Link to="/OnTheJob">
            <div className="col-xs-12 col-md-6 bg1" style={{ 'height': '5vh' }}>
              <div style={center}>
                <a href="javascript:">
                    <div className="icon-box-01 bg1 col-sm-5ths col-xs-6" style={{ 'height': '45vh' }}>
                      <div className="icon-wrapper">
                        <div className="livicon-evo" data-options="
                            name: paper-plane.svg;
                            style: lines;
                            strokeColor: #ffffff;
                            strokeColorAction: #fff;
                            colorsOnHover: custom;
                            eventOn: self;
                            drawOnViewport: true
                        "></div>
                        <h5 className="text-center text-uppercase white">I AM ON THE JOB</h5>
                      </div>
                    </div>
                  </a>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Phases;
