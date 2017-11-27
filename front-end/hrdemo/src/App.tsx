import * as React from 'react';
import './App.css';

//types
import { Guy } from './shared/types'

//components
import * as summaryTemplates from './summary/templates'
//import * as detailsTemplates from './details/templates'

const logo = require('./logo.svg');

const dummyData: Guy[] = [
  { firstName: 'edgar', lastName: 'martinez' },
  { firstName: 'john', lastName: 'doe' },
  { firstName: 'jane', lastName: 'doe' }
]

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          <summaryTemplates.Summary guys={dummyData} />
        </p>
      </div>
    );
  }
}

export default App;
