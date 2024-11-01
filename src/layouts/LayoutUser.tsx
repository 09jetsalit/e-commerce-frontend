import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const LayoutUser = (props: Props) => {
  return (
    <div>
        <h1>Nav</h1>
        <Outlet />
    </div>
  )
}

export default LayoutUser