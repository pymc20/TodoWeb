import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Typography, Drawer, Form, Input, Radio, Button, DatePicker, InputNumber } from 'antd';
import { update } from '../redux/action/index';

const moment = require('moment');

class EditTodo extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            data: {
                ...this.props.data,
                complete:false
            }
        }
    }

    editTodo = () => {
        //validation
        if(this.state.data.title === undefined){
            alert("Please enter a title");
			return;
        } else if(this.state.data.contents === undefined){
			alert("Please enter a contents");
			return;
		} else if(this.state.data.isUsed) {
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
        //data sort and update
        const todoList = this.props.todoList;
        let newData = [];
        todoList.forEach((item, index) => {
            if(item.id !== this.state.data.id)
                newData.push(item);
            else
                newData.push(this.state.data);
        });
        newData.sort((a,b) => {
            return a.priority < b.priority ? -1 : a.priority === b.priority ? 0 : 1;
        });
        this.props.updateTodo(newData);
        //close drawer
        this.setState({
            visible: false
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
                id: this.state.data.id
            }
        } else if(e.target.value === undefined) {
            newData = {
                complete: e.target.checked,
                id: this.state.data.id
            }
        } else {
            newData = {
                [e.target.id]: e.target.value,
                id: this.state.data.id
            }
        }

        this.setState({
            data: Object.assign(this.state.data, newData),
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
    //Change state when props are changed
    static getDerivedStateFromProps(nextProps, prevState) {
    	if(nextProps.data !== prevState.data)
    		return { data: nextProps.data}
    	return null;
    }

    render() {
        return (
            <div>
                <div onClick={this.showDrawer}>edit</div>
                <Drawer
                    title="Edit Todo"
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
                                ? (
                                <DatePicker 
                                    value={moment(this.state.data.expDate)} 
                                    id="expDate" 
                                    onChange={this.onChangeExpDate}
                                />
                                ) 
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
                            <Checkbox
                                onChange={this.onChange}
                                id="complete"
                                checked={this.state.data.complete}
                            >
                                Complete
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.editTodo}>Edit Todo</Button>
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
        updateTodo: (data) => dispatch(update(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)