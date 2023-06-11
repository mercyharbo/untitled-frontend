import React, { useState } from 'react'

const PriceRangeFilter = ({ minPrice, maxPrice, onFilter }) => {
  const [range, setRange] = useState([minPrice, maxPrice])

  const handleRangeChange = (e) => {
    const value = e.target.value.split(',').map(Number)
    setRange(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilter(range[0], range[1])
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='range'
          name='range'
          min={minPrice}
          max={maxPrice}
          value={range}
          onChange={handleRangeChange}
          step={0.01}
          style={{ width: '100%' }}
        />
      </form>
    </div>
  )
}

export default PriceRangeFilter
