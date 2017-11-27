import * as React from 'react';
import * as redux from 'redux'
import './App.css';

import * as types from './types'
import * as summaryTemplates from '../summary/templates'
import * as detailsTemplates from '../details/templates'

const logo = require('./logo.svg');

export const dummyData = []

function renderSummary(state: types.AppState) {
  return state.summary !== 'isLoading'
    ? <summaryTemplates.Summary employees={state.summary.employees} />
    : <p>Loading...</p>
}
function renderDetails(state: types.AppState) {
  return state.details !== 'isLoading' && typeof state.details !== 'undefined'
    ? <detailsTemplates.Details formData={state.details.formData} id={state.details.id} />
    : <p>Loading...</p>
}

function generateBody(state: types.AppState) {
  switch(state.currentView) {
    case 'details': return renderDetails(state)
    case 'summary': return renderSummary(state)
  }
}

class App extends React.Component {
  state: types.AppState = {
    currentView: 'summary',
    summary: 'isLoading',
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
