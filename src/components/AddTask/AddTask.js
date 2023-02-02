/* eslint-disable */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Input from './../UI/Input/Input';
import Button from './../UI/Button/Button';
import SelectDesk from './../UI/SelectDesk/SelectDesk';

class AddTask extends Component {

    createTask  = () => {
        const index = Math.round(Math.random() * 10000)
        const taskItem = {
            id: index,
            task: this.props.task,
            done:false,
            deskID: this.props.desk
        };

        this.props.createTask(this.props.desk,taskItem);
        
    };

    render() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Input 
                onChange={this.props.onChange}
                value={this.props.task}
            />
            <SelectDesk 
                onChange={this.props.onChangeDeskInput}
                options={this.props.options}
                value={this.props.desk}
            />
            <Button 
                disabled={this.props.disabled}
                buttonText="Add Task"
                onClick={this.createTask}
            />
        </div>
    );

    }
}

export default AddTask;
