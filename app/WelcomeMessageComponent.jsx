import React from 'react';
import Fc from './FunctionalComponent';
import FunctionalComponent from "./FunctionalComponent";

class WelcomeMessageComponent extends React.Component {
  render() {
    return <div className={'welcome'}>
      <p>Hello {this.props.name},</p>
      <p>You did the big catch. We are welcoming you!</p>
    </div>
    <FunctionalComponent name="Me" />
  }
}

export default WelcomeMessageComponent;
