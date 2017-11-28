import * as React from 'react';
import * as redux from 'redux'
import './App.css';

import * as types from './types'
import * as summaryTemplates from '../summary/templates'
import * as detailsTemplates from '../details/templates'

const logo = require('./logo.svg');

export const dummyData = []

function renderSummary(state: types.States.Summary) {
  return state.app_summaryLoading
    ? <p>Loading...</p>
    : <summaryTemplates.Summary summary_employees={state.summary_employees} />
}
function renderDetails(state: types.States.Details) {
  // return state.details_formData !== 'isLoading' && typeof state.details_formData !== 'undefined'
  //   ? <detailsTemplates.Details details_formData={state} />
  //   : <p>Loading...</p>
  return <detailsTemplates.Details details_formData={state.details_formData} />
}

function generateBody(state: types.States.Any) {
  switch(state.app_currentView) {
    case 'details': return renderDetails(state as types.States.Details)
    case 'summary': return renderSummary(state as types.States.Summary)
    default:
      throw 'Unexpected view detected'
  }
}

class App extends React.Component {
  state: types.States.Any = {
    app_currentView: 'summary',
    app_summaryLoading: true,
    summary_employees: []
  }
  private store = redux.createStore((() => null), this.state)

  componentDidMount() {
    this.store.subscribe(() => {
      const newState = this.store.getState();
      if(newState)
        this.setState(newState)
    })
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          {generateBody(this.state)}
        </p>
      </div>
    );
  }
}

export default App;
