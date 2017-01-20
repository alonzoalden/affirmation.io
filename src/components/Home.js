import React, {Component, PropTypes} from 'react';
import { connectProfile, newLock } from '../auth';
import Auth0Lock from 'auth0-lock';
import './Home.css';
import './Animate.css';
import {isLoggedIn} from '../auth';
// import Paper from 'material-ui/Paper';
import $ from 'jquery';

class Home extends Component {
  static propTypes = {
    ...connectProfile.PropTypes
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  componentWillMount() {
    if (isLoggedIn()) {
      this.context.router.push('/dashboard');
    }

  }
  componentDidMount(){
    newLock();

    //bulb
    $(".livion-evo").addLiviconEvo({ name: "bulb.svg", style: "linesAlt", size: "180px", strokeStyle: "original", strokeWidth: "original", tryToSharpen: true, rotate: "none", flipHorizontal: false, flipVertical: false, strokeColor: "#0093FF", strokeColorAction: "#b3421b", strokeColorAlt: "#867dcc", strokeColorAltAction: "#ab69c6", fillColor: "#91e9ff", fillColorAction: "#ff926b", solidColor: "#6C7A89", solidColorAction: "#4C5A69", solidColorBg: "#ffffff", solidColorBgAction: "#ffffff", colorsOnHover: "none", colorsHoverTime: 0.3, colorsWhenMorph: "none", brightness: 0.1, saturation: 0.07, morphState: "start", morphImage: "none", allowMorphImageTransform: false, strokeWidthFactorOnHover: "none", strokeWidthOnHoverTime: 0.3, keepStrokeWidthOnResize: false, animated: true, eventType: "hover", eventOn: "self", autoPlay: true, delay: 0, duration: "default", repeat: "default", repeatDelay: "default", drawOnViewport: true, viewportShift: "oneThird", drawDelay: 0, drawTime: 1, drawStagger: 0.1, drawStartPoint: "middle", drawColor: "same", drawColorTime: 1, drawReversed: false, drawEase: "Power1.easeOut", eraseDelay: 0, eraseTime: 1, eraseStagger: 0.1, eraseStartPoint: "middle", eraseReversed: true, eraseEase: "Power1.easeOut", touchEvents: false});

    // rocket
    $(".livicon-evo").addLiviconEvo({ name: "rocket.svg", style: "linesAlt", size: "180px", strokeStyle: "original", strokeWidth: "original", tryToSharpen: true, rotate: "none", flipHorizontal: false, flipVertical: false, strokeColor: "#0093FF", strokeColorAction: "#b3421b", strokeColorAlt: "#867dcc", strokeColorAltAction: "#867dcc", fillColor: "#91e9ff", fillColorAction: "#ff926b", solidColor: "#6C7A89", solidColorAction: "#4C5A69", solidColorBg: "#ffffff", solidColorBgAction: "#ffffff", colorsOnHover: "none", colorsHoverTime: 0.3, colorsWhenMorph: "none", brightness: 0.1, saturation: 0.07, morphState: "start", morphImage: "none", allowMorphImageTransform: false, strokeWidthFactorOnHover: "none", strokeWidthOnHoverTime: 0.3, keepStrokeWidthOnResize: false, animated: true, eventType: "hover", eventOn: "self", autoPlay: true, delay: 0, duration: "default", repeat: "default", repeatDelay: "default", drawOnViewport: true, viewportShift: "oneThird", drawDelay: 0, drawTime: 1, drawStagger: 0.1, drawStartPoint: "middle", drawColor: "same", drawColorTime: 1, drawReversed: false, drawEase: "Power1.easeOut", eraseDelay: 0, eraseTime: 1, eraseStagger: 0.1, eraseStartPoint: "middle", eraseReversed: true, eraseEase: "Power1.easeOut", touchEvents: false});

    // desktop
    $(".livicon-evo").addLiviconEvo({ name: "desktop.svg", style: "linesAlt", size: "180px", strokeStyle: "original", strokeWidth: "original", tryToSharpen: true, rotate: "none", flipHorizontal: false, flipVertical: false, strokeColor: "#0093ff", strokeColorAction: "#b3421b", strokeColorAlt: "#867dcc", strokeColorAltAction: "#ab69c6", fillColor: "#91e9ff", fillColorAction: "#ff926b", solidColor: "#6C7A89", solidColorAction: "#4C5A69", solidColorBg: "#ffffff", solidColorBgAction: "#ffffff", colorsOnHover: "none", colorsHoverTime: 0.3, colorsWhenMorph: "none", brightness: 0.1, saturation: 0.07, morphState: "start", morphImage: "none", allowMorphImageTransform: false, strokeWidthFactorOnHover: "none", strokeWidthOnHoverTime: 0.3, keepStrokeWidthOnResize: false, animated: true, eventType: "hover", eventOn: "self", autoPlay: true, delay: 0, duration: "default", repeat: "default", repeatDelay: "default", drawOnViewport: true, viewportShift: "oneThird", drawDelay: 0, drawTime: 1, drawStagger: 0.1, drawStartPoint: "middle", drawColor: "same", drawColorTime: 1, drawReversed: false, drawEase: "Power1.easeOut", eraseDelay: 0, eraseTime: 1, eraseStagger: 0.1, eraseStartPoint: "middle", eraseReversed: true, eraseEase: "Power1.easeOut", touchEvents: false});

    // plane
    $(".livicon-evo").addLiviconEvo({ name: "paper-plane.svg", style: "linesAlt", size: "180px", strokeStyle: "original", strokeWidth: "original", tryToSharpen: true, rotate: "none", flipHorizontal: false, flipVertical: false, strokeColor: "#0093ff", strokeColorAction: "#b3421b", strokeColorAlt: "#867dcc", strokeColorAltAction: "#ab69c6", fillColor: "#91e9ff", fillColorAction: "#ff926b", solidColor: "#6C7A89", solidColorAction: "#4C5A69", solidColorBg: "#ffffff", solidColorBgAction: "#ffffff", colorsOnHover: "none", colorsHoverTime: 0.3, colorsWhenMorph: "none", brightness: 0.1, saturation: 0.07, morphState: "start", morphImage: "none", allowMorphImageTransform: false, strokeWidthFactorOnHover: "none", strokeWidthOnHoverTime: 0.3, keepStrokeWidthOnResize: false, animated: true, eventType: "hover", eventOn: "self", autoPlay: true, delay: 0, duration: "default", repeat: "default", repeatDelay: "default", drawOnViewport: true, viewportShift: "oneThird", drawDelay: 0, drawTime: 1, drawStagger: 0.1, drawStartPoint: "middle", drawColor: "same", drawColorTime: 1, drawReversed: false, drawEase: "Power1.easeOut", eraseDelay: 0, eraseTime: 1, eraseStagger: 0.1, eraseStartPoint: "middle", eraseReversed: true, eraseEase: "Power1.easeOut", touchEvents: false});
  }

  render() {
    const text = {
      marginTop: 50
    };
    const learn = {
      marginTop: 90,
      fontSize: 34,
      fontWeight: 'bold'
    };
    const main = {
      marginTop: 120,
      color: '#fff'
    };
    const icon = {
      marginLeft: 17,
      height: 100,
      width: 100,
      marginTop: 75,
      marginBottom: 35,
    };
    const iconLast = {
      height: 100,
      width: 100,
      marginTop: 125
    };
    const auth = {
      paddingTop: 80,
      paddingLeft: 15
    };
    const github = {
      color: '#fff',
      textDecoration: 'none'
    };
    const onTheJob = {
      marginTop: 50,
    };
    const iconPlane = {
      marginLeft: 5,
      height: 100,
      width: 100,
      marginTop: 75,
      marginBottom: 35,
    };

    return (
      <div>
        <div className="row">
          <div className="col-xs-12">
            <div className="alert alert-info main" role="alert">
              <div className="col-sm-4 col-sm-offset-2">
                <h4 style={main}>Candid Advice from Experienced Software Engineers</h4>
              </div>
              <div style={auth} className="col-xs-3 col-xs-offset-1">
                <div id="hiw-login-container"></div>
              </div>
            </div>
          </div>
        </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success learn" role="alert">
            <div className="col-xs-6 col-xs-offset-3">
              <h1 style={learn}>Great advice for great talent</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
            <h1 style={text}>Want to learn?</h1>
            <h3>
              Are you thinking about learning to write code? Does the field of software engineering excite you? We know that it may be challenging to find out where to begin and what path to take. Let the advice from experienced software engineers guide you on the beginning of your journey!
            </h3>
          </div>
            <div className="col-xs-3 col-xs-offset-1">
              <div className="livicon-evo" style={icon} data-options=" name: bulb.svg; style: linesAlt; size: 180px; strokeStyle: original; strokeWidth: original; tryToSharpen: true; rotate: none; flipHorizontal: false; flipVertical: false; strokeColor: #0093FF; strokeColorAction: #b3421b; strokeColorAlt: #867dcc; strokeColorAltAction: #ab69c6; fillColor: #91e9ff; fillColorAction: #ff926b; solidColor: #6C7A89; solidColorAction: #4C5A69; solidColorBgAction: #ffffff; solidColorBg: #ffffff; colorsOnHover: none; colorsHoverTime: 0.3; colorsWhenMorph: none; brightness: 0.1; saturation: 0.07; morphState: start; morphImage: none; allowMorphImageTransform: false; strokeWidthFactorOnHover: none; strokeWidthOnHoverTime: 0.3; keepStrokeWidthOnResize: false; animated: true; eventType: hover; eventOn: self; autoPlay: true; delay: 0; duration: default; repeat: default; repeatDelay: default; drawOnViewport: true; viewportShift: oneThird; drawDelay: 0; drawTime: 1; drawStagger: 0.1; drawStartPoint: middle; drawColor: same; drawColorTime: 1; drawReversed: false; drawEase: Power1.easeOut; eraseDelay: 0; eraseTime: 1; eraseStagger: 0.1; eraseStartPoint: middle; eraseReversed: true; eraseEase: Power1.easeOut; touchEvents: false ">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <div className="livicon-evo" style={icon} data-options=" name: rocket.svg; style: linesAlt; size: 180px; strokeStyle: original; strokeWidth: original; tryToSharpen: true; rotate: none; flipHorizontal: false; flipVertical: false; strokeColor: #0093FF; strokeColorAction: #b3421b; strokeColorAlt: #867dcc; strokeColorAltAction: #867dcc; fillColor: #91e9ff; fillColorAction: #ff926b; solidColor: #6C7A89; solidColorAction: #4C5A69; solidColorBgAction: #ffffff; solidColorBg: #ffffff; colorsOnHover: none; colorsHoverTime: 0.3; colorsWhenMorph: none; brightness: 0.1; saturation: 0.07; morphState: start; morphImage: none; allowMorphImageTransform: false; strokeWidthFactorOnHover: none; strokeWidthOnHoverTime: 0.3; keepStrokeWidthOnResize: false; animated: true; eventType: hover; eventOn: self; autoPlay: true; delay: 0; duration: default; repeat: default; repeatDelay: default; drawOnViewport: true; viewportShift: oneThird; drawDelay: 0; drawTime: 1; drawStagger: 0.1; drawStartPoint: middle; drawColor: same; drawColorTime: 1; drawReversed: false; drawEase: Power1.easeOut; eraseDelay: 0; eraseTime: 1; eraseStagger: 0.1; eraseStartPoint: middle; eraseReversed: true; eraseEase: Power1.easeOut; touchEvents: false ">
              </div>
            </div>
            <div className="col-xs-4">
              <h1 style={text}>Learning to code?</h1>
                <h3>
                  Have you taken the plunge to learn to write code? Stuck trying to figure out what resources you should use? There are many detours and rabbit holes one can fall into while learning to code. Let the advice from experienced software engineers help you make the best use of your time and energy!
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-success" role="alert">
            <div className="col-xs-4 col-xs-offset-2">
              <h1 style={text}>Job hunting?</h1>
                <h3>
                  Are you looking for your dream job? Have you prepared for the personal and technical challenges that await you in the job hunting process? Let the advice from experienced software engineers help you crush every interview that will come your way!
                </h3>
            </div>
            <div className="col-xs-3 col-xs-offset-1">
            <div className="livicon-evo" style={icon} data-options=" name: dashboard.svg; style: linesAlt; size: 180px; strokeStyle: original; strokeWidth: original; tryToSharpen: true; rotate: none; flipHorizontal: false; flipVertical: false; strokeColor: #0093ff; strokeColorAction: #b3421b; strokeColorAlt: #867dcc; strokeColorAltAction: #ab69c6; fillColor: #91e9ff; fillColorAction: #ff926b; solidColor: #6C7A89; solidColorAction: #4C5A69; solidColorBgAction: #ffffff; solidColorBg: #ffffff; colorsOnHover: none; colorsHoverTime: 0.3; colorsWhenMorph: none; brightness: 0.1; saturation: 0.07; morphState: start; morphImage: none; allowMorphImageTransform: false; strokeWidthFactorOnHover: none; strokeWidthOnHoverTime: 0.3; keepStrokeWidthOnResize: false; animated: true; eventType: hover; eventOn: self; autoPlay: true; delay: 0; duration: default; repeat: default; repeatDelay: default; drawOnViewport: true; viewportShift: oneThird; drawDelay: 0; drawTime: 1; drawStagger: 0.1; drawStartPoint: middle; drawColor: same; drawColorTime: 1; drawReversed: false; drawEase: Power1.easeOut; eraseDelay: 0; eraseTime: 1; eraseStagger: 0.1; eraseStartPoint: middle; eraseReversed: true; eraseEase: Power1.easeOut; touchEvents: false ">
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info last" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <div className="livicon-evo" style={iconPlane} data-options=" name: paper-plane.svg; style: linesAlt; size: 180px; strokeStyle: original; strokeWidth: original; tryToSharpen: true; rotate: none; flipHorizontal: false; flipVertical: false; strokeColor: #0093ff; strokeColorAction: #b3421b; strokeColorAlt: #867dcc; strokeColorAltAction: #ab69c6; fillColor: #91e9ff; fillColorAction: #ff926b; solidColor: #6C7A89; solidColorAction: #4C5A69; solidColorBgAction: #ffffff; solidColorBg: #ffffff; colorsOnHover: none; colorsHoverTime: 0.3; colorsWhenMorph: none; brightness: 0.1; saturation: 0.07; morphState: start; morphImage: none; allowMorphImageTransform: false; strokeWidthFactorOnHover: none; strokeWidthOnHoverTime: 0.3; keepStrokeWidthOnResize: false; animated: true; eventType: hover; eventOn: self; autoPlay: true; delay: 0; duration: default; repeat: default; repeatDelay: default; drawOnViewport: true; viewportShift: oneThird; drawDelay: 0; drawTime: 1; drawStagger: 0.1; drawStartPoint: middle; drawColor: same; drawColorTime: 1; drawReversed: false; drawEase: Power1.easeOut; eraseDelay: 0; eraseTime: 1; eraseStagger: 0.1; eraseStartPoint: middle; eraseReversed: true; eraseEase: Power1.easeOut; touchEvents: false ">
              </div>
            </div>
            <div className="col-xs-4">
              <h1 style={onTheJob}>On the job?</h1>
                <h3>
                  You've made it! But the journey has just begun. Are you curious as to how to effectively navigate the workspace? Would you like to know how to get the most out of this opportunity? Let the advice from experienced software engineers guide you in not only making your employer happy, but also to make sure that your learning never stops!
                </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="alert alert-info footer" role="alert">
            <div className="col-xs-3 col-xs-offset-3">
              <br/>
              <br/>
              <h5>Alonzo Alden</h5>
              <h5>David Flowers</h5>
              <h5>Diogenis Panagiotis</h5>
              <h5>Luke Golden</h5>
              <h5>Raj Desai</h5>
            </div>
            <div className="col-xs-3 col-xs-offset-1">
              <br/>
              <br/>
              <h5><a style={github} href='https://github.com/alonzoalden'>github.com/alonzoalden</a></h5>
              <h5><a style={github} href='https://github.com/DavFlo-16'>github.com/DavFlo-16</a></h5>
              <h5><a style={github} href='https://github.com/DiogenisPanagiotis'>github.com/DiogenisPanagiotis</a></h5>
              <h5><a style={github} href='https://github.com/DhammaLuke'>github.com/DhammaLuke</a></h5>
              <h5><a style={github} href='https://github.com/RADesai'>github.com/RADesai</a></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connectProfile(Home);
