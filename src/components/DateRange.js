import { Row, Col } from './Grid'
import InputSelector from './InputSelector'
import Label from './Label'
import { Context } from '../state'
import { useContext, useEffect } from 'react'

const DateRange = () => {
  const { setAction, startDate, setStartDate, endDate, setEndDate, dateOptions, setDateOptions } = useContext(Context)

  useEffect(() => {
    defaultDates(dateOptions)

    const getDateOptions = () => {
      fetch('/json/dates.json')
        .then(response => {
          return response.json()
        }).then(results => {
          const data = [ ...results]
          setDateOptions(data);

          defaultDates(data);
        })
        .catch(e => console.error(e))
    }
    getDateOptions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange (value) {
    let action = Object.keys(value)[0]
    let newState = value[action]
    setAction(action, newState)
  }

  function defaultDates(dateOptions) {
    // only on init, kicks off dates

    let start = ''
    let end = ''

    if (typeof dateOptions === 'object') {
      start = dateOptions[0]
      end = dateOptions[dateOptions.length - 1]
      setStartDate(start)
      setEndDate(end)
    } else {
      setStartDate(start)
      setEndDate(end)
    }
  }

  return (
    <Row>
      <Col>
        <Label htmlFor="startDate">From</Label>
        <InputSelector
          id={'startDate'}
          name={'startDate'}
          options={dateOptions}
          value={startDate}
          handleChange={handleChange}
          icon={'calendar'}
        />
      </Col>
      <Col>
        <Label htmlFor="endDate">To</Label>
        <InputSelector
          id={'endDate'}
          name={'endDate'}
          options={dateOptions}
          value={endDate}
          handleChange={handleChange}
          icon={"calendar"}
        />
      </Col>
    </Row>
  )
}

export default DateRange