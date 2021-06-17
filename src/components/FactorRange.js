import { Col } from './Grid'
import InputSelector from './InputSelector'
import Label from './Label'
import { Context } from '../state'
import { useContext, useEffect, useState } from 'react'
import { snakeToTile } from '../util/snakeToTitle'
import { titleToSnake } from '../util/titleToSnake'

const FactorRange = () => {
  const { setAction, setFactorOne, setFactorTwo, factorOptions, setFactorOptions } = useContext(Context)

  const [formData, setFormData] = useState({})

  useEffect(() => {
    defaultFactors(factorOptions)

    const getFactorOptions = () => {
      fetch('/json/factors.json')
        .then(response => {
          return response.json()
        }).then(results => {
          const data = [ ...results]
          setFactorOptions(data);

          defaultFactors(data);
        })
        .catch(e => console.error(e))
    }
    getFactorOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange (value) {
    let action = Object.keys(value)[0]
    let newState = titleToSnake(value[action])
    let newLocalState = value[action]
    setAction(action, newState)
    setFormData({
      ...formData,
      [action]: newLocalState
    })
  }

  function defaultFactors(dateOptions) {
    // only on init, kicks off dates

    let fOne = ''
    let fTwo = ''

    if (typeof dateOptions === 'object') {
      fOne = dateOptions[0]
      fTwo = dateOptions[1]
      setFactorOne(fOne)
      setFactorTwo(fTwo)
      setFormData({
        factorOne: snakeToTile(fOne),
        factorTwo: snakeToTile(fTwo)
      })
    } else {
      setFactorOne(fOne)
      setFactorTwo(fTwo)
      setFormData({
        factorOne: fOne,
        factorTwo: fTwo
      })
    }
  }

  return (
    <>
      <Col width="47%">
        <Label htmlFor="factorOne" srOnly={true}>Factor One</Label>
        <InputSelector
          id={'factorOne'}
          name={'factorOne'}
          options={factorOptions.map(opt => snakeToTile(opt))}
          value={formData.factorOne}
          handleChange={handleChange}
        />
      </Col>
      <Col>-</Col>
      <Col width="47%">
        <Label htmlFor="factorTwo" srOnly={true}>Factor Two</Label>
        <InputSelector
          id={'factorTwo'}
          name={'factorTwo'}
          options={factorOptions.map(opt => snakeToTile(opt))}
          value={formData.factorTwo}
          handleChange={handleChange}
        />
      </Col>
    </>
  )
}

export default FactorRange