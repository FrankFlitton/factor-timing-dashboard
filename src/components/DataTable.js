import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledTable = styled.div`
  width: 100%;
  overflow-x: scroll;
  table {
    width: 100%;
    max-width: 600px;
    min-width: 600px;
  }
  tbody {
    color: gray;
  }
  th, td {
    font-size: 0.9rem;
    padding: 1em;
    text-align: center;
    line-height: 1.5em;
    &:first-of-type {
      text-align: left;
      word-spacing: 20px;
      width: 80px;
    }
  }
`;

const DataTable = ({rows, columns}) => {
  return (
    <StyledTable>
      <table>
        <thead>
          <tr>
            { columns.map( column => (
              <th key={column}>{ column }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { rows.map( row => (
            <tr key={JSON.stringify(row)}>
              { columns.map( column => (
                <td key={row[0] + row[column]}>{ row[column] }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  )
}

DataTable.prototype = {
  rows: PropTypes.arrayOf(PropTypes.string).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default DataTable