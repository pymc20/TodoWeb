import React from 'react';
import { connect } from 'react-redux';
import { Icon, Card, Typography, Drawer, Form, Input, Radio, Button, DatePicker, InputNumber } from 'antd';
import { add } from '../redux/action/index';

const moment = require('moment');

class AddTodo extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			visible: false,
			id: this.createId(),
			data: {
				priority: 1,
				isUsed: false
			}
		}
	}
	
	addTodo = () => {
		//validation
		if(this.state.data.title === undefined){
            alert("Please enter a title");
			return;
        } else if(this.state.data.contents === undefined){
			alert("Please enter a contents");
			return;
		} else if(this.state.data.isUsed === true) {
			if(this.state.data.expDate === undefined || this.state.data.expDate === 'Invalid date') {
				alert("Please enter a date")
				return;
			}
		} else if(!this.state.data.isUsed) {
            const temp = this.state.data;
            delete temp.expDate;
            this.setState({
                data: temp
            })
		}
		//data sort and save
		let newData = this.props.todoList ? this.props.todoList : [];
		newData.push(this.state.data);
		newData.sort((a,b) => {
            return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
        })
		this.props.addTodo(newData);
		
		//init
        this.setState({
            visible: false,
			id: this.createId(),
			data: {priority: 1, isUsed: false}
        });
	}

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
    	let newData;
    	if(e.target === undefined){
            newData = {
                priority: e,
				id: this.state.id
            }
		} else {
            newData = {
                [e.target.id]: e.target.value,
                id: this.state.id
            }
		}
        this.setState({
            data: Object.assign(this.state.data, newData)
        })
	}
	
    onChangeExpDate = (e) => {
    	const expDate = moment(e).format('YYYY-MM-DD');
    	const newData = {
    		expDate
    	};
    	this.setState({
    		data: Object.assign(this.state.data, newData)
    	});
	}
	
	createId() {
		let code = '';
		for(let i=0; i < 3; i++){
			code += ((1 + Math.random()) * 0x1000 | 0).toString(16);
		}
		return code;
	}

	render() {
		return (
			<div>
				<Card size="small" bordered={false} hoverable onClick={this.showDrawer}>
					<Typography.Title level={4}><Icon type="plus-circle" /> Add Todo</Typography.Title>
				</Card>
                <Drawer
                    title="Add Todo"
                    placement="right"
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Form>
						<Form.Item>
						<Input
							id="title"
                            placeholder="Please enter a title"
							onChange={this.onChange}
							value={this.state.data.title}
						/>
						</Form.Item>
						<Form.Item>
						<Input.TextArea
                            id="contents"
							rows={6}
                            placeholder="Please enter a contents"
                            onChange={this.onChange}
                            value={this.state.data.contents}
						/>
						</Form.Item>
						<Form.Item>
							<Typography.Title level={4}>Expiry Date</Typography.Title>
							<Radio.Group
								defaultValue={false}
								onChange={this.onChange}
								value={this.state.data.isUsed}
							>
								<Radio id="isUsed" value={true}>use</Radio>
								<Radio id="isUsed" value={false}>unused</Radio>
							</Radio.Group>
							{
								this.state.data.isUsed 
								? (<DatePicker id="expDate" onChange={this.onChangeExpDate}/>) 
								: null
							}
						</Form.Item>
						<Form.Item>
                            <Typography.Title level={4}>Priority</Typography.Title>
							<InputNumber
								id="priority"
								onChange={this.onChange}
                                value={this.state.data.priority}
							/>
						</Form.Item>
						<Form.Item>
							<Button type="primary" onClick={this.addTodo}>Add Todo</Button>
						</Form.Item>
					</Form>
                </Drawer>
			</div>
		)
	}
}

const mapStateToProps = state => {
    return {
        todoList: state.todoList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (data) => dispatch(add(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)