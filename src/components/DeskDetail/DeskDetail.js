/* eslint-disable */
import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {withRouter, Link} from "react-router-dom";
import './DeskDetail.css';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";



class DeskDetail extends Component {
    state = {
        task: '',
        taskMode: 'all'
    };

    createTask  = () => {
        const index = Math.round(Math.random() * 10000)
        const taskItem = {
            id: index,
            task: this.state.task,
            done:false,
            deskID: this.props.id
        };

        this.props.createTask(this.props.id,taskItem);
        this.setState( {
                task:''
            }
        )
    };
    checkEnterKey = (event) => {
        if (event.keyCode === 13) {
            this.onChangeTaskInput(event);
            this.createTask();
        }
    };

    deleteAllTask = () => {
        const isDeleteConfirm = confirm("Delete desk?");

        if (isDeleteConfirm) {
            this.props.deleteAllTask(this.props.id);
        }
    };

    deleteDesk = () => {
        const isDeleteConfirm = confirm("Delete desk?");

       if (isDeleteConfirm) {
            this.props.deleteDesk(this.props.id);
       }
       // this.props.history.push('/');
    };

    onChangeTaskInput = (event) => {
        this.setState(
            {
                task: event.target.value
            }
        );
    };

    getTaskListLength = (status) => {
        const task = this.props.taskList ? this.props.taskList.filter(item => item.done === status) : [];
        return task.length;
    };

    getAllTaskList = (taskList) => {
        return taskList && taskList.map((task,index) => (
                <li key={index}>
                    <span className={`task ${task.done && 'decoration'}`}>{index + 1}. {task.task}</span>
                    <button className="btn check"><FontAwesomeIcon icon={faCheck} onClick={() => this.props.checkTask(task.deskID,task.id) } /></button>
                    <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} onClick={() => this.props.deleteTask(task.deskID,task.id) } /></button>
                </li>
            )
        )
    };

    getDoneTaskList = () => {
        const task = this.props.taskList.filter(item => item.done);
        return this.getAllTaskList(task);
    };

    getNewTaskList = () => {
        const task = this.props.taskList.filter(item => !item.done);
        return this.getAllTaskList(task);
    };

    onChangeTaskSelect = (event) => {
        this.setState({
            taskMode: event.target.value
        })
    };

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdateDESKDETAIL');
        if (this.props.title != prevProps.title && !this.props.title ) {
            this.props.history.push('/');
        }
    }

    render() {
        return (

            <div className='DeskDetail'>
                <div className="container">
                <Link to="/">Home</Link>

                <h1>Desk {this.props.title ? this.props.title : 'null' } (ID:{this.props.match.params.deskID})</h1>
                <div className="deskItem">

                        <Input
                            onChange={this.onChangeTaskInput}
                            value={this.state.task}
                            onKeyUp = {this.checkEnterKey}
                        />
                        <hr/>
                        <Button
                            onClick={this.createTask}
                            disabled={!this.state.task}
                            buttonText='Add task'
                        />
                        <Button
                            onClick={this.deleteAllTask}
                            buttonText='Delete All'
                            disabled={!this.props.taskList || !this.props.taskList.length}
                        />
                        <hr/>
                        <div className="DeskDetail-status">
                            <Select
                                options={this.props.options}
                                label="Sort by"
                                value={this.taskMode}
                                onChange={this.onChangeTaskSelect}
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
                                {this.state.taskMode === 'all'  &&this.getAllTaskList(this.props.taskList)}
                                {this.state.taskMode === 'newTask'  && this.getNewTaskList()}
                                {this.state.taskMode === 'done' && this.getDoneTaskList()}
                            </ul>
                        </div>
                    </div>
                <button className="btn delete delete-desk" onClick={this.deleteDesk}>Delete this desk</button>
                </div>
            </div>
        );
    }
}

export default withRouter(DeskDetail);
