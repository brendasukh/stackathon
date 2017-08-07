import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import Home from './components/home'
import Camera from './components/camera'

/**
 * COMPONENT
 */
export const Routes = () => {
  return (
      <Router history={history}>
        <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/camera' component={Camera} />
        </Switch>
      </Router>
    )
}

export default Routes;

