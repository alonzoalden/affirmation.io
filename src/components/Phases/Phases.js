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
  render() {
    return (
        <div>
          <div className="row">
            <div className="col-xs-12">
              <div className="col-xs-6">
              <div class="container">
                <div class="row">
                    <a href="javascript:">
                      <div className="icon-box-01 bg1 col-sm-5ths col-xs-6">
                        <div className="icon-wrapper">
                          <div className="livicon-evo" data-options="
                              name: bulb.svg; 
                              style: lines; 
                              strokeColor: #ffffff; 
                              strokeColorAction: #fff; 
                              colorsOnHover: custom; 
                              eventOn: grandparent; 
                              drawOnViewport: true 
                          "></div>
                          <h5 className="text-center text-uppercase white">I WANT TO LEARN TO CODE</h5>
                          </div>
                        </div>
                      </a>
                  </div>
                </div>                      
              </div>
              <div className="col-xs-6">
              <div class="container">
                <div class="row">
                    <a href="javascript:">
                      <div className="icon-box-01 bg2 col-sm-5ths col-xs-6">
                          <div className="icon-wrapper">
                            <div className="livicon-evo" data-options="
                                name: rocket.svg; 
                                style: lines; 
                                strokeColor: #ffffff; 
                                strokeColorAction: #fff; 
                                colorsOnHover: custom; 
                                eventOn: grandparent; 
                                drawOnViewport: true 
                            "></div>
                            <h5 className="text-center text-uppercase white">I AM LEARNING TO CODE</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>                    
              </div>
            </div>
          </div>
        <div className="row">
          <div className="col-xs-12">
              <div className="col-xs-6">
                <div class="container">
                  <div class="row">                 
                    <a href="javascript:">
                      <div className="icon-box-01 bg3 col-sm-5ths col-xs-6">
                        <div className="icon-wrapper">
                          <div className="livicon-evo" data-options="
                              name: desktop.svg; 
                              style: lines; 
                              strokeColor: #ffffff; 
                              strokeColorAction: #fff; 
                              colorsOnHover: custom; 
                              eventOn: grandparent; 
                              drawOnViewport: true 
                          "></div>
                          <h5 className="text-center text-uppercase white">I AM ON THE JOB HUNT</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>                  
              </div>
              <div className="col-xs-6">
              <div class="container">
                <div class="row">                 
                  <a href="javascript:">
                    <div className="icon-box-01 bg1 col-sm-5ths col-xs-6">
                      <div className="icon-wrapper">
                        <div className="livicon-evo" data-options="
                            name: paper-plane.svg; 
                            style: lines; 
                            strokeColor: #ffffff; 
                            strokeColorAction: #fff; 
                            colorsOnHover: custom; 
                            eventOn: grandparent; 
                            drawOnViewport: true 
                        "></div>
                        <h5 className="text-center text-uppercase white">I AM ON THE JOB</h5>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Phases;
