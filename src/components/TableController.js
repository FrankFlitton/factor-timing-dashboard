import { useContext, useEffect, useState } from "react"
import { Context } from "../state"
import { Col, Row } from "./Grid"
import { H2 } from "./Headers"
import DataTable from "./DataTable"
import { hash } from "../util/hash"

const TableController = () => {
  const [ loaded, setLoaded ] = useState(false)
  const [ tableHash, setTableHash ] = useState(0)
  const { startDate, endDate, factorOptions, dateOptions, factorOne, factorTwo, fields, setFields, data, setData, tableData, getTableData } = useContext(Context)

  useEffect(() => {
    const fetchTableData = () => {
      fetch('/json/data.json')
        .then(response => {
          return response.json()
        }).then(results => {
          const data = [ ...results]
          setData(data)
        })
        .catch(e => console.error(e))
    }

    const fetchFields = () => {
      fetch('/json/fields.json')
        .then(response => {
          return response.json()
        }).then(results => {
          const fields = [ ...results]
          setFields(fields)
        })
        .catch(e => console.error(e))
    }

    if (!loaded && !!factorOptions.length && !!dateOptions.length && !fields.length && !data.length) {
      fetchTableData()
      fetchFields()
      setLoaded(true) // Prevents being called again while fetching
    }

    if (loaded && !!data.length && !!fields.length) {
      const newHash = hash('' + startDate + endDate + factorOne + factorTwo)
      const shouldUpdate = newHash !== tableHash
      if (shouldUpdate) {
        setTableHash(newHash)
        getTableData() // Run calculations
      }
    }
  }, [startDate, endDate, factorOptions, dateOptions, factorOne, factorTwo, fields, setFields, data, setData, getTableData, loaded, setLoaded, tableHash, setTableHash]);

  if (!loaded) {
    return (
      <Row>
        <Col>
          <H2>Loading...</H2>
        </Col>
      </Row>
    )
  }

  if (!tableData.length) {
    return (
      <Row>
        <Col>
          <H2>Please select a different value</H2>
        </Col>
      </Row>
    )
  }

  return (
    <>
      { tableData.map( table => (
        <Row key={table.id}>
          <Col width="100%">
            <H2><br />{ table.title }</H2>
          </Col>
          <Col>
            <DataTable rows={table.rows} columns={table.columns} />
          </Col>
        </Row>
      )) }
    </>
  )
}

export default TableController