import React from 'react'

const LoadingScreen = ({ loading }) => {
  const loadingScreenActive = useSelector(({ ui }) => ui.loadingScreenActive)
  return (
    <div>
      <h1 className='heading-primary'>Loading</h1>
    </div>
  )
}

export default LoadingScreen
