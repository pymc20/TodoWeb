export const ADD_TODO = 'ADD_TODO'
	
export const UPDATE_TODO = 'UPDATE_TODO'

export function add(data) {
    return {
    	type: ADD_TODO,
    	data
    };
}

export function update(data) {
    return { 
    	type: UPDATE_TODO,
		data
    };
}