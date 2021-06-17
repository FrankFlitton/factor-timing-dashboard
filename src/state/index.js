import { createContext, useReducer } from 'react'
import tableCalculations from '../util/tableCalculations'

const initialState = {
  startDate: '',
  endDate: '',
  dateOptions: [],
  factorOne: '',
  factorTwo: '',
  factorOptions: [],
  fields: [],
  data: [],
  tableData: []
}

export const Context = createContext(initialState);

export const actions = {
  SET_STARTDATE: "SET_SEED",
  SET_ENDDATE: "SET_DATASET",
  SET_DATEOPTIONS: "SET_DATEOPTIONS",
  SET_FACTORONE: "SET_FACTORONE",
  SET_FACTORTWO: "SET_FACTORTWO",
  SET_FACTOROPTIONS: "SET_FACTOROPTIONS",
  SET_FIELDS: "SET_FIELDS",
  SET_DATA: "SET_DATA",
  GET_TABLEDATA: "GET_TABLEDATA",
  RESET: "RESET"
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SET_STARTDATE:
      return { ...state, startDate: action.value };
    case actions.SET_ENDDATE:
      return { ...state, endDate: action.value };
    case actions.SET_DATEOPTIONS:
      return { ...state, dateOptions: action.value };
    case actions.SET_FACTORONE:
      return { ...state, factorOne: action.value };
    case actions.SET_FACTORTWO:
      return { ...state, factorTwo: action.value };
    case actions.SET_FACTOROPTIONS:
      return { ...state, factorOptions: action.value };
    case actions.SET_FIELDS:
      return { ...state, fields: action.value };
    case actions.SET_DATA:
      return { ...state, data: action.value };
    case actions.GET_TABLEDATA:
      // Check invalid input options
      const validDates = state.dateOptions.indexOf(state.startDate) <= state.dateOptions.indexOf(state.endDate)
      const validFactors = state.factorOne !== state.factorTwo
      if (validDates&& validFactors) {
        const tableData = tableCalculations(state)
        return { ...state, tableData };
      } else {
        return { ...state, tableData: []};
      }
    case actions.RESET:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export function Provider ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    startDate: state.startDate,
    endDate: state.endDate,
    dateOptions: state.dateOptions,
    factorOne: state.factorOne,
    factorTwo: state.factorTwo,
    factorOptions: state.factorOptions,
    fields: state.fields,
    data: state.data,
    tableData: state.tableData,
    setStartDate: value => {
      dispatch({ type: actions.SET_STARTDATE, value });
    },
    setEndDate: value => {
      dispatch({ type: actions.SET_ENDDATE, value });
    },
    setDateOptions: value => {
      dispatch({ type: actions.SET_DATEOPTIONS, value });
    },
    setFactorOne: value => {
      dispatch({ type: actions.SET_FACTORONE, value})
    },
    setFactorTwo: value => {
      dispatch({ type: actions.SET_FACTORTWO, value})
    },
    setFactorOptions: value => {
      dispatch({ type: actions.SET_FACTOROPTIONS, value})
    },
    setFields: value => {
      dispatch({ type: actions.SET_FIELDS, value})
    },
    setData: value => {
      dispatch({ type: actions.SET_DATA, value})
    },
    getTableData: () => {
      dispatch({ type: actions.GET_TABLEDATA })
    },
    setAction: (key, value) => {
      const actionName = key || ''
      dispatch({ type: actions[`SET_${actionName.toUpperCase()}`], value})
    },
    reset: () => {
      dispatch({ type: actions.RESET });
    }
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
