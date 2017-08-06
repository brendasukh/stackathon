import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Camera} from './components'

/**
 * COMPONENT
 */
export const Routes = () => {
  return (
      <Router history={history}>
        <Route exact path='/' component={Camera} />
      </Router>
    )
}

export default Routes;

