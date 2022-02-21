import Link from 'next/link'
import React from 'react'

const Card = ({ title, children, link }: { title?: string; children: any; link?: string | boolean }) => {
  const renderTitle = () => {
    if (title) {
      return <div className='mx-2 pt-4 text-lg font-semibold text-gray-800'>{title}</div>
    } else {
      return
    }
  }

  const renderChild = () => {
    return (
      <div
        className={`rounded-xl px-2 py-2 mx-2 filter drop-shadow-md text-blue-400 bg-gray-50 bg-opacity-75 ${
          link ? 'cursor-pointer hover:bg-blue-400 hover:text-white' : ''
        }`}>
        {renderTitle()}
        <div className='mx-2 py-2 text-justify'>{children}</div>
      </div>
    )
  }

  if (typeof link === 'string') {
    return <Link href={link}>{renderChild()}</Link>
  } else {
    return <>{renderChild()}</>
  }
}

export default Card
