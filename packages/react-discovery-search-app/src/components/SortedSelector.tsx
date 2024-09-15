import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { getIsSorted, setIsSorted, setSelectedIndex, useAppDispatch } from '@react-discovery/internal'
import React, { ReactElement } from 'react'

export const SortedSelector: React.FC<any> = (): ReactElement => {
  const dispatch = useAppDispatch()
  const isSorted = getIsSorted()

  // eslint-disable-next-line no-empty-pattern
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const is = Boolean(event.target.value)
    dispatch(setSelectedIndex({ selectedIndex: 0 }))
    dispatch(setIsSorted({ isSorted: is }))
  }

  return (
      <FormControl>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          defaultValue={false}
          name="radio-buttons-group"
          row
        >
          <FormControlLabel
            value={''}
            control={
              <Radio
                checked={isSorted === false}
                onChange={handleChange}
                value={''}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'Randomize' }}
              />
            }
            label="Randomize"
            labelPlacement="start"
          />
          <FormControlLabel
            value={true}
            control={
              <Radio
                checked={isSorted === true}
                onChange={handleChange}
                value={true}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'Sort' }}
              />
            }
            label="Sort"
            labelPlacement="start"
          />
        </RadioGroup>
      </FormControl>)
}
