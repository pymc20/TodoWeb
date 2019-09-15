import React from 'react';
import { Typography, List, notification, Descriptions } from 'antd';
import { connect } from 'react-redux';
import EditTodo from './EditTodo';
import { update } from '../redux/action/index'

const moment = require('moment');

class TodoList extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			visible: false,
			data: [],
			notiList: []
		}
	}

	remove = (e) => {
		this.props.removeTodo(this.props.todoList.filter(item => {
			return item.id !== e;
		}))
	};
	
	openNotification = item => {
		notification.warning({
		message: 'EXPIRY DATE',
		description: (<Descriptions>
						<Descriptions.Item label="title" span={3}>
							{item.title}
						</Descriptions.Item>
						<Descriptions.Item label="expDate">
							{item.expDate}
						</Descriptions.Item>
						</Descriptions>),
		duration: 0,
		placement: 'bottomRight',
		});
	};
	//if have expiry date, open notification when refresh page
	componentDidMount() {
        this.props.todoList.forEach(item => {
            if(item.expDate <= moment().format("YYYY-MM-DD")){
				this.openNotification(item);
			}
        })
	}

	render() {
		return (
			<div>
				<List
				dataSource={this.props.todoList}
				renderItem={item => (
					<List.Item
						actions={[<div><EditTodo data={item}/></div>,<div onClick={() => this.remove(item.id)}>remove</div>]}
						style={{marginLeft:'auto'}}
					>
						<Typography.Text
							delete={item.complete}
							ellipsis
						>
							{item.title}
						</Typography.Text>
						<List.Item.Meta/>
					</List.Item>
					)}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
    	todoList: state.todoList
	}
}

const mapDispatchToProps = dispatch => {
    return {
        removeTodo: (data) => {
            dispatch(update(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)