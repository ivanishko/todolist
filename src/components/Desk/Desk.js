/* eslint-disable */
import React, {Component} from 'react'
import './Desk.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button'
import Select from "../UI/Select/Select";

const options = [
    {
        key: 'all',
        value: 'Все'
    },
    {
        key: 'done',
        value: 'Выполенные'
    },
    {
        key: 'newTask',
        value: 'Новые'
    },

]

class Desk extends Component{
    state = {
        task: '',
        taskList: [],
        taskMode: 'all',
    };

    checkTask = (id) => () => {
        this.setState(
            prevState => ({
                taskList: prevState.taskList.map(el => {
                        if (el.id === id) {
                            el.done = !el.done
                        }
                        return el
                    }
                )
            }),
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
            }
        )
    };

    deleteTask = (id) => () => {
        //console.log(id);
        this.setState(
            prevState => ({
                taskList: prevState.taskList.filter(el => el.id !== id)
            }),
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
            }
        )
    };

    getAllTaskList = (taskList) => {
        //console.log('taskList ',taskList)
        return taskList.map((task,index) => (
                <li key={index}>
                    <span className={`task ${task.done && 'decoration'}`}>{index + 1}. {task.task}</span>
                    <button className="btn check"><FontAwesomeIcon icon={faCheck} onClick={this.checkTask(task.id) } /></button>
                    <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteTask(task.id) } /></button>
                </li>
            )
        );
    };

    getDoneTaskList = () => {
        const taskList = this.state.taskList.filter(item => item.done);
        return this.getAllTaskList(taskList)
    };

    getTaskListLength = (status) => {
        //console.log(this.state)
        const taskList = this.state.taskList.filter(item => item.done === status);
        //console.log('getTaskListLength ', taskList);
        return taskList.length;
    };

    getNewTaskList = () => {
        const taskList = this.state.taskList.filter(item => !item.done);
        return this.getAllTaskList(taskList)
    };

    onChangeTaskInput = (event) => {
        this.setState(
            {
                task: event.target.value
            }
        );

    };

    onChangeTaskSelect = (event) => {
        //console.log(event.target.value);
        this.setState(
            {
                taskMode:event.target.value
            }
            ,
            () => {
                localStorage.setItem('taskMode', this.state.taskMode)
            }
        )
        //console.log(this.state);
    };

    createTask = () => {
        const index = Math.round(Math.random() * 10000)
        const taskItem = {
            id: index,
            task: this.state.task,
            done:false,
        };

        this.setState(
            (prevState) => {
                return {
                    taskList: [...prevState.taskList, taskItem],
                    task: ''
                }
            },
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
            }
        )
    };

    componentDidMount() {
        //console.log('componentDidMounth')
        const taskList = JSON.parse(localStorage.getItem('taskList') ) || [];
        const taskMode = localStorage.getItem('taskMode') || 'all';
        //console.log('taskList ', taskList)
        // console.log('taskMode ', taskMode)
        this.setState({
            taskList,
            taskMode
        })
    };

    deleteAllTask = () => {
        const isDeleteConfirm = confirm("Delete all?");
        if (isDeleteConfirm) {
            this.setState(
                {
                    task: '',
                    taskList: [],
                },
                () => localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
            )
        }
    };

    render() {
        return(
            <div className="deskItem">
                <h3>Desk {this.props.title}</h3>
                <Input
                    onChange={this.onChangeTaskInput}
                    value={this.state.task}
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
                    disabled={this.state.taskList.length === 0}
                />
                <div className="Desk-status">
                    <ul>
                        <li>Всего: {this.state.taskList.length}</li>
                        <li>Активных:{this.getTaskListLength(false)}</li>
                        <li>Выполненных:{this.getTaskListLength(true)}</li>
                    </ul>
                </div>
                <div className="Desk-taskList">
                    <Select
                        options={options}
                        label="Sort by"
                        value={this.state.taskMode}
                        onChange={this.onChangeTaskSelect}
                    />
                    <h2>My tasks</h2>
                    <ul>
                        {this.state.taskMode === 'all'  && this.getAllTaskList(this.state.taskList)}
                        {this.state.taskMode === 'newTask'  && this.getNewTaskList()}
                        {this.state.taskMode === 'done' && this.getDoneTaskList()}
                    </ul>
                </div>
            </div>
        )
        }
    }

export default Desk;