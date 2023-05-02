import React from 'react'
import { version } from '../../package.json'

const AppVersion = () => (
  <div className="app-version">
    v {version}
  </div>
)

export default AppVersion