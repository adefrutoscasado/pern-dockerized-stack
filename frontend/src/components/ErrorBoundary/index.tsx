import React, { Component, ReactNode } from 'react'
import { withTranslation, useTranslation } from 'react-i18next'

type translate = ReturnType<typeof useTranslation>['t']


class ErrorBoundary_ extends Component<{fallback?: ReactNode, t: translate}, {error: any}> {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    // manage external log service here
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback || <div>{this.props.t('There was an error')}</div>
      )
    }
    return this.props.children
  }
}

const ErrorBoundary = withTranslation()(ErrorBoundary_)
export default ErrorBoundary

export const withErrorBoundary = (component: JSX.Element) => <ErrorBoundary>{component}</ErrorBoundary>
