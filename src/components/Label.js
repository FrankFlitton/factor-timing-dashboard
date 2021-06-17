import styled from 'styled-components'

const Label = styled.label`
  color: grey;
  margin: -0.75rem 0.75rem !important;
  display: ${props => !!props.srOnly ? 'none' : 'block'};
  &:after {
    content: " ";
  }
`

export default Label