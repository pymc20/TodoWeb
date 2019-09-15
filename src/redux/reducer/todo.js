import {ADD_TODO, UPDATE_TODO} from '../action/index';  

const todoList = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...action.data];
    case UPDATE_TODO:
    	return action.data;
    default:
      return state;
  }
}

export default todoList;