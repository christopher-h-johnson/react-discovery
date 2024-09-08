import { Slider } from '@mui/material'
import { OSCore, setSelectedIndex, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'

export const SizeSelector: React.FC<any> = (): ReactElement => {
  const dispatch = useAppDispatch()
  const size = OSCore.state.getSize()

  const sizeSpec = [
    {
      label: '10',
      value: 10
    },
    {
      label: '50',
      value: 50
    },
    {
      label: '100',
      value: 100
    }
  ]

  // eslint-disable-next-line no-empty-pattern
  const handleSizeChange = ({}, value): void => {
    dispatch(setSelectedIndex({ selectedIndex: 0 }))
    dispatch(OSCore.state.setSize({ size: value }))
  }

  const valuetext = (value: number): string => {
    return `${value}`
  }

  return (
    <Slider
      aria-labelledby="discrete-slider-always"
      defaultValue={size}
      getAriaValueText={valuetext}
      key={`slider-${size}`}
      marks={sizeSpec}
      min={10}
      onChange={handleSizeChange}
      step={10}
      valueLabelDisplay="auto"
    />
  )
}
