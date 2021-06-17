import PropTypes from 'prop-types'
import styled from 'styled-components'
import icons from '../assets/icons'

const Select = styled.select`
  appearance: none; // reset
  border-radius: 0.32rem;
  width: 100%;
  height: 2.25rem;
  min-width: 140px;
  font-size: 16px; // prevent zoom on mobile
  padding: 0.5rem !important;
  color: grey;
  border: lightgrey 1px solid;
  background-image: url('${props => icons[props.icon || 'none']}');
  background-size: 1.5em auto, 100%;
  background-repeat: no-repeat;
  background-position: right 0.5em top 50%;
`;

const InputSelector = ({options, handleChange, name, id, value, icon}) => {
  function onChange (e) {
    const value = e.target?.value
    const key = e.target.name
    handleChange({
      [key]: value
    })
  };

  function makeOptions() {
    let optionList = Array.isArray(options) ? options : []
    return [ ...new Set([ ...optionList, value ])]
  }

  return (
    <Select name={name} icon={icon} id={id || name} onChange={(e) => onChange(e)} value={value}>
      {makeOptions().map((option) => <option
        value={option}
        key={name + option}>
          {option}
        </option>
      )}
    </Select>
  )
}

InputSelector.prototype = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
}

export default InputSelector