import React from 'react'
import Icon from './Icon'

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-between p-2'>
      <a className='flex text-gray-500' href='https://github.com/lucas3359/expense-reconciliation' target='_blank'>
        <span>Powered by Tom &amp; Lu</span>
        <Icon icon='github' />
      </a>
    </footer>
  )
}

export default Footer
