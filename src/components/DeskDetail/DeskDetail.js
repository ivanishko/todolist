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
        console.log('taskList', taskList);
        return taskList && taskList.map((task,index) => (
                <li key={index}>
                    <span className={`task ${task.done && 'decoration'}`}>{index + 1}. {task.task}</span>
                    <button className="btn check"><FontAwesomeIcon icon={faCheck} onClick={() => this.props.checkTask(task.deskID,task.id) } /></button>
                    <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.props.deleteTask(task.deskID,task.id) } /></button>
                </li>
            )
        )
    };
    getTaskListLength = (status) => {
        const task = this.props.taskList ? this.props.taskList.filter(item => item.done === status) : [];
        return task.length;
    };

    getDoneTaskList = () => {
        const task = this.taskList.filter(item => item.done);
        console.log('tasktasktask',task)
        return this.getAllTaskList(task)
    };

    getNewTaskList = () => {
        const task = this.taskList.filter(item => !item.done);
        return this.getAllTaskList(task)
    };


    render() {
      //console.log('DeskDetail this.props',this.props);
        console.log('[props.match.params.deskID]',this.props.match.params.deskID);
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
                            <li>Активных:{this.getTaskListLength(false)}</li>
                            <li>Выполненных:{this.getTaskListLength(true)}</li>
                        </ul>
                    </div>
                    <div className="DeskDetail-taskList">
                        <h2>My tasks</h2>
                        <ul>
                            {this.getAllTaskList(this.props.taskList)}
                            {/*{this.state.taskMode === 'newTask'  && this.getNewTaskList()}*/}
                            {/*{this.state.taskMode === 'done' && this.getDoneTaskList()}*/}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeskDetail);