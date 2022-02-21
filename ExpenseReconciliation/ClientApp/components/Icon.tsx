import React from 'react'

const Icon = (props: any) => {
  const icon = props.icon
  const classes = props.classes

  switch (icon) {
    case 'left':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
        </svg>
      )
    case 'up':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
        </svg>
      )
    case 'right':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
        </svg>
      )
    case 'github':
      return (
        <svg
          className={`${classes ? classes : 'w-5 h-5 mx-1'} fill-current`}
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z'></path>
        </svg>
      )
    case 'dots':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'} fill-current`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z'
          />
        </svg>
      )
    case 'profile':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      )
    case 'upload':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
          />
        </svg>
      )
    case 'clipboard':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
          />
        </svg>
      )
    case 'pie-chart':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
          />
        </svg>
      )
    case 'sort-asc':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
          />
        </svg>
      )
    case 'tick':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
        </svg>
      )
    case 'cross':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
          />
        </svg>
      )
    case 'trash':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${classes ? classes : 'h-6 w-6'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1}
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          />
        </svg>
      )
    default:
      return <></>
  }
}

export default Icon
