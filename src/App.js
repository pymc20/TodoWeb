import React from 'react';
import { Card } from 'antd';
import TodoList from './component/TodoList';
import AddTodo from './component/AddTodo';

class App extends React.Component {
	
	render(){
		return (
			    <div>
			    	<Card title="TODO" style={{ marginLeft: '100px', marginTop: '50px', width: 350 }}>
			    			<TodoList/>
			    			<AddTodo/>
			    	</Card>
			    </div>
			  );
	}
}

export default App;
