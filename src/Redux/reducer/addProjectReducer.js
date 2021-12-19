
import { SET_PROJECT_NAME, SET_SHOW } from '../constants/index'

const initialState={
  showproject:false,
  projectName:''
}

export const addProjectReducer=(state =initialState,action)=>{
  switch(action.type){
    case SET_SHOW:return{
      showproject:action.payload
    }
    case SET_PROJECT_NAME:return{
      projectName:action.payload
    }
    default:return state;
  }
}