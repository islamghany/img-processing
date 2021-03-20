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
        
      }
    default: return state

  }
}
const filtersList = (state=[],action)=>{
  switch (action.type) {
    case 'add':
      return [...state,{
        name:action.payload
      }]
    case 'remove':
      return []

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

const img = (state=null,action)=>{
  switch (action.type) {
    case 'image':
      return action.payload
    default: return state

  }
}
export default createStore(combineReducers({img,filter,loading,filtersList}))
