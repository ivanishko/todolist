import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {withRouter, Link} from "react-router-dom";
import './DeskDetail.css';

import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";
import Desk from "../Desk/Desk";



class DeskDetail extends Component {
    createTask = (deskID) => () => {
        const index = Math.round(Math.random() * 10000)
        const taskItem = {
            id: index,
            task: this.state.task,
            done:false,
            deskID
        };

        this.props.createTask(deskID,taskItem);
        this.setState( {
                task:''
            }
        )
    };

    getAllTaskList = (taskList) => {
      //  console.log('taskList', taskList);
        return this.props.getAllTaskList(taskList);
    };


    getDoneTaskList = () => {
        const task = this.props.taskList.filter(item => item.done);
        return this.getAllTaskList(task)
    };

    getNewTaskList = () => {
        const task = this.props.taskList.filter(item => !item.done);
        return this.getAllTaskList(task)
    };


    render() {
      //  console.log('this.props',this.props);
     //   console.log('this.state',this.props.state);
       // console.log('title',this.props.title);
        return (

            <div className='DeskDetail'>
                <Link to="/">Home</Link>

                <h1>Desk {this.props.title ? this.props.title : 'null' } (ID:{this.props.match.params.deskID})</h1>
                <div className="deskItem">
                    <button className="btn delete delete-desk" onClick={this.props.deleteDesk}>Delete this desk</button>
                    <br/>
                    <br/>
                    <Input
                        onChange={this.props.onChange}
                        value={this.props.task}
                    />
                    <hr/>
                    <Button
                        onClick={this.createTask(this.props.id)}
                        disabled={!this.props.task}
                        buttonText='Add task'
                    />
                    <Button
                        onClick={this.props.deleteAllTask}
                        buttonText='Delete All'
                        disabled={!this.props.taskList || !this.props.taskList.length}
                    />
                    <div className="DeskDetail-status">
                        <Select
                            options={this.props.options}
                            label="Sort by"
                            value={this.taskMode}
                            onChange={this.props.onChangeTaskSelect}
                        />
                        <ul>
                            <li>Всего: {this.props.taskList ? this.props.taskList.length : '0'}</li>
                            <li>Активных:{this.props.getTaskListLength(false)}</li>
                            <li>Выполненных:{this.props.getTaskListLength(true)}</li>
                        </ul>
                    </div>
                    <div className="DeskDetail-taskList">
                        <h2>My tasks</h2>
                        <ul>
                            {this.getAllTaskList(this.props.taskList)}
                            {this.props.taskMode === 'newTask'  && this.getNewTaskList()}
                            {this.props.taskMode === 'done' && this.getDoneTaskList()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeskDetail);