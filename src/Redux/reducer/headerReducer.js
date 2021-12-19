
import { SHOW_QUICK_ADD_TASK } from "../constants";

const initialState={
  showQuickAddTask:false,

}

export const headerReducer=(state = initialState,action)=>{
  switch(action.type){
    case SHOW_QUICK_ADD_TASK:return{
      ...state,
      showQuickAddTask:action.payload
    }
    default:return state;
  }
}