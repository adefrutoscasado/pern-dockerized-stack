import React from 'react'
import ReactDOM from 'react-dom'
import './i18n'

import App from './App'
import ErrorBoundary from 'components/ErrorBoundary'

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)
