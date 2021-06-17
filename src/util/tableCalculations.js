import { cloneDeep } from 'lodash'
import { snakeToTile } from './snakeToTitle'

const formatPercent = (num) => {
  return parseFloat(num).toFixed(2) + "%"
}

const tableCalculations = (state) => {

  const fields = state.fields

  const dateIndexes = [
    state.dateOptions.indexOf(state.startDate),
    state.dateOptions.indexOf(state.endDate) + 1 // Needs length, not index
  ]

  const observations = dateIndexes[1] - dateIndexes[0]

  console.log(observations)

  const factorIndexes = [
    state.factorOptions.indexOf(state.factorOne),
    state.factorOptions.indexOf(state.factorTwo)
  ]

  let factorArrays = []
  for (let index = 0; index < factorIndexes.length; index++) {
    const factorIndex = factorIndexes[index];
    const factorArray = state.data[factorIndex].slice(dateIndexes[0], dateIndexes[1] )
    factorArrays.push(factorArray)
  }

  console.log(state.data[0].length)
  console.log(factorArrays[0].length)

  const timePeriods = fields
    .filter(field => field.includes('D'))
    .map(s => s.split('_').slice(-1)[0].toUpperCase())

  const ratingIndex = fields.indexOf('rating')

  // Init Meta Fields
  const defaultMeta = {
    observations: observations,
    preferredForwardReturn: 0,
    ratedForwardReturn: 0,
    preferredRating: 0,
    preferredRatingSum: 0,
  }
  const meta = {}
  for (let index = 0; index < timePeriods.length; index++) {
    const name = timePeriods[index];
    meta[name] = cloneDeep(defaultMeta)
  }
  const columns = ["Time Period", "Observed", "Predictions", "Forward Return"]
  const emptyTable = { meta: {...meta}, rows: [], title: '', columns, id: '' }
  const tableData = [cloneDeep(emptyTable), cloneDeep(emptyTable)]

  // Calculate meta data
  for (let i = 0; i < observations; i++) {
    const f1 = factorArrays[0][i]
    const f2 = factorArrays[1][i]
    const r1 = f1[ratingIndex]
    const r2 = f2[ratingIndex]
    // For each time period
    for(let n = 0; n < timePeriods.length; n++) {
      const name = timePeriods[n]
      const f1Greater = f1[n] >= f2[n]
      const r1Greater = r1 >= r2

      // Observed Column
      if (f1Greater) tableData[0].meta[name]['preferredForwardReturn']++
      if (!f1Greater) tableData[1].meta[name]['preferredForwardReturn']++

      // Predictions Column
      if (f1Greater && r1Greater) tableData[0].meta[name]['ratedForwardReturn']++
      if (!f1Greater && !r1Greater) tableData[1].meta[name]['ratedForwardReturn']++
      if (r1Greater) tableData[0].meta[name]['preferredRating']++
      if (!r1Greater) tableData[1].meta[name]['preferredRating']++

      // Forward Return Column
      if (r1Greater) tableData[0].meta[name]['preferredRatingSum']+= f1[n]
      if (!r1Greater) tableData[1].meta[name]['preferredRatingSum']+= f2[n]
    }
  }

  // Format Tables
  for (let t = 0; t < tableData.length; t++) {
    const table = tableData[t]
    for (let i = 0; i < timePeriods.length; i++) {
      const timePeriod = timePeriods[i]
      const data = table.meta[timePeriod]

      const observed = `${data.preferredForwardReturn}/${data.observations}`
      const observedPercent = formatPercent(data.preferredForwardReturn / data.observations)

      const predictions = `${data.ratedForwardReturn}/${data.preferredRating}`
      const predictionsPercent = formatPercent(data.ratedForwardReturn / data.preferredRating)

      let forwardReturn = formatPercent(data.preferredRatingSum / data.preferredRating)
      if (data.preferredRatingSum >= 0) forwardReturn = '+' + forwardReturn

      let row = {
        "Time Period": timePeriod,
        "Observed": `${observed} (${observedPercent})`,
        "Predictions": `${predictions} (${predictionsPercent})`,
        "Forward Return": `${forwardReturn}`
      }
      table.rows.push(row)
    }
  }

  // Table Titles
  tableData[0].title = `${snakeToTile(state.factorOne)} >= ${snakeToTile(state.factorTwo)}`
  tableData[1].title = `${snakeToTile(state.factorTwo)} > ${snakeToTile(state.factorOne)}`

  // Table ids for render updates
  tableData[0].id = Math.random()
  tableData[1].id = tableData[0].id + Math.random()

  return tableData
}

export default tableCalculations