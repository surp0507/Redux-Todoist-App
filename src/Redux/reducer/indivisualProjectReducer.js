
import { SET_SHOW_MODAL } from "../constants";

const initialState={
    showmodal:false
}


export const indivisualProjectReducer = (state = initialState,action) => {
  switch(action.type){
      case SET_SHOW_MODAL:return{
          ...state,
          showmodal:action.payload
      }
      default:return state;
  }
}
