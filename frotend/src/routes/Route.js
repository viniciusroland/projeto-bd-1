import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import AuthLayout from '~/pages/_layouts/auth'
import DefaultLayout from '~/pages/_layouts/default'


export default function RouteWrapper({
  component :  Component,
  isPrivate = false,
  ...rest
}) {
  const signed = useSelector(state => state.auth.signed)

  if(!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if(signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
      {...rest}
    />
  )
}

RouteWrapper.propTypes = {
  isPrivate : PropTypes.bool,
  component : PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired

}

RouteWrapper.defaultProps = {
  isPrivate : false,
}