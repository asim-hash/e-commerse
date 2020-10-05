import axios from 'axios'

const initialState = {
  logs: []
}

export default (state=initialState,action)=>{
  if (!action.type.includes('@@')) {
    axios.post('/api/v1/logs', action)
  }

  switch (action.type) {
    case '@@SET_LOGS':
      return { ...state, logs: action.logs }
    default:
      return state
  }
}
