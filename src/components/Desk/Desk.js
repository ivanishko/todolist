/* eslint-disable */
import React, {Component} from 'react'
import './Desk.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button'
import Select from '../UI/Select/Select';
import {Link} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom'
import {withRouter} from 'react-router-dom'



class Desk extends Component{
    state = {
        task: '',
        deskID: '',
        taskList: {
        },
        taskMode: '',
    };

    checkTask = (taskID) => () => {
        this.props.checkTask(this.props.id,taskID)
    };

    deleteTask = (taskID) => () => {
        this.props.deleteTask(this.props.id,taskID)
    };

    getAllTaskList = (taskList) => {

        return taskList && taskList.map((task,index) => (
                <li key={index}>
                    <span className={`task ${task.done && 'decoration'}`}>{index + 1}. {task.task}</span>
                    <button className="btn check"><FontAwesomeIcon icon={faCheck} onClick={this.checkTask(task.id) } /></button>
                    <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteTask(task.id) } /></button>
                </li>
                )
        )
    };

    getDoneTaskList = () => {
        const task = this.props.taskList.filter(item => item.done);
        return this.getAllTaskList(task)
    };

    getNewTaskList = () => {
        const task = this.props.taskList.filter(item => !item.done);
        return this.getAllTaskList(task)
    };

    onChangeTaskSelect = (event) => {
        this.setState(
            {
                taskMode:event.target.value
            },
        this.props.onChangeTaskSelectInput(this.props.id,event.target.value)
        )};


    getTaskListLength = (status) => {
            const task = this.props.taskList ? this.props.taskList.filter(item => item.done === status) : [];
            return task.length;
    };

    onChangeTaskInput = (event) => {
        this.setState(
            {
                task: event.target.value
            }
        );

    };


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

    componentDidMount() {
        const taskList = JSON.parse(localStorage.getItem('taskList') ) || [];
        const taskMode = localStorage.getItem('taskMode') || 'all';
        this.setState({
            taskList,
            taskMode
        })
    };

    deleteAllTask = () => {
        const isDeleteConfirm = confirm("Delete all?");

        if (isDeleteConfirm) {
            this.props.deleteAllTask(this.props.id)
        }
    };

    deleteDesk = () => {
        this.props.deleteDesk(this.props.id)
    };

    render() {
       // console.log(props);
        return(

                <div className="deskItem">
                    <button className="btn delete delete-desk" onClick={this.deleteDesk}><FontAwesomeIcon icon={faTimes}   /></button>
                    <Link to={`/desk/${this.props.id}`}><h3>Desk {this.props.title} (ID: {this.props.id})</h3></Link>
                    <Input
                        onChange={this.onChangeTaskInput}
                        value={this.state.task}
                    />
                    <hr/>
                    <Button
                        onClick={this.createTask(this.props.id)}
                        disabled={!this.state.task}
                        buttonText='Add task'
                    />
                    <Button
                        onClick={this.deleteAllTask}
                        buttonText='Delete All'
                        disabled={!this.props.taskList || !this.props.taskList.length}
                    />
                    <div className="Desk-status">
                        <Select
                            options={this.props.options}
                            label="Sort by"
                            value={this.props.taskMode}
                            onChange={this.onChangeTaskSelect}
                        />
                        <ul>
                            <li>Всего: {this.props.taskList ? this.props.taskList.length : '0'}</li>
                            <li>Активных:{this.getTaskListLength(false)}</li>
                            <li>Выполненных:{this.getTaskListLength(true)}</li>
                        </ul>
                    </div>
                    <div className="Desk-taskList">

                        <h2>My tasks</h2>
                        <ul>
                            {this.props.taskMode === 'all'  && this.getAllTaskList(this.props.taskList)}
                            {this.props.taskMode === 'newTask'  && this.getNewTaskList()}
                            {this.props.taskMode === 'done' && this.getDoneTaskList()}
                        </ul>
                    </div>
                </div>

        )
        }
    }

export default withRouter(Desk);