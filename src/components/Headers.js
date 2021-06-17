import styled from 'styled-components'

const H1 = styled.h1`
font-size: 2em;
line-height: 1rem;
`;

const H2 = styled.h2`
  color: grey;
  font-size: 1rem;
  margin: 0;
  font-weight: 400;
  display: ${props => !!props.srOnly ? 'none' : 'block'}
`

export { H1, H2 }