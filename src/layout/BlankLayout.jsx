import React from 'react'

export default function BlankLayout({children}) {
  return (
      <div className='antialiased bg-gray-light layout-mini'>
          {children}
    </div>
  )
}
