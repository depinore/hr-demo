import * as React from 'react';
import * as redux from 'redux'
import { connect, Provider } from 'react-redux'
import './App.css';

import * as types from './types'
import * as actions from './actions'
import { Summary as _Summary } from '../summary/templates'
import { Details as _Details } from '../details/templates'
import { applyMiddleware } from 'redux';
import { default as thunk } from 'redux-thunk'
import { reduce } from './reducers'

const logo = require('./logo.svg');

const Details = connect(x => x, actions.generateDetailsSideEffects)(_Details);
const Summary = connect(x => x, actions.generateSummarySideEffects)(_Summary);

function renderSummary(state: types.States.Summary) {
  return state.app_summaryLoading
    ? <p>Loading...</p>
    : <Summary summary_employees={state.summary_employees} />
}
function renderDetails(state: types.States.Details) {
  return <Details details_formData={state.details_formData} details_formDisabled={state.details_formDisabled}/>
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
  private store = redux.createStore(reduce, this.state, applyMiddleware(thunk))

  componentDidMount() {
    this.store.subscribe(() => {
      const newState = this.store.getState();
      if(newState)
        this.setState(newState)
    })
    actions.getEmployees(this.store.dispatch.bind(this.store))
  }
  render() { 
    return (
      <Provider store={this.store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            {generateBody(this.state)}
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
