import {createStore,combineReducers} from 'redux'

const filter = (state={},action)=>{
  switch (action.type) {
    case 'add_filter':
      return {
        add:true,
        name:action.payload
      }
    case 'remove_filter':
      return {
        add:false,
        name:action.payload
      }
    default: return state

  }
}
const loading = (state=false,action)=>{
  switch (action.type) {
    case 'loading':
      return action.payload
    default: return state

  }
}
export default createStore(combineReducers({filter,loading}))
