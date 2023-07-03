import React from 'react' // import your spinner styles

function Spinner() {
  return (
    <div className='spinner'>
      {/* use divs to create the spinner animation */}
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
      <div className='bounce4'></div>
    </div>
  )
}

export default Spinner
