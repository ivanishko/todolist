import React, {Component} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {faCheck} from '@fortawesome/free-solid-svg-icons'


import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button'
import Select from "./components/UI/Select/Select";

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
        key: 'new',
        value: 'Новые'
    }
]

class App extends Component{
    state = {
        task: '',
        taskList: [],
        taskMode: 'all',
    };

    checkTask = (id) => () => {
        console.log(this.state);
        this.setState(
            prevState => ({
                taskList: prevState.taskList.map(el => {
                        if (el.id === id) {
                            el.done = !el.done
                        }
                        return el
                    }
                )
            })
        )
    };

    deleteTask = (id) => () => {
        //console.log(id);
        this.setState(
            prevState => ({
                taskList: prevState.taskList.filter(el => el.id !== id)
            })
        )
    };

    getAllTasklist = (taskList) => {
        return taskList.map((task,index) => (
                <li key={index}>
                    <span className={`task ${task.done && 'decoration'}`}>{index + 1}. {task.task}</span>
                    <button className="btn check"><FontAwesomeIcon icon={faCheck} onClick={this.checkTask(task.id) } /></button>
                    <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteTask(task.id) } /></button>
                </li>
            )
        );
    };

    getDoneTasklist = () => {

        const taskList = this.state.taskList.filter(item => item.done)
        return this.getAllTasklist(taskList)
    }


    getNewTasklist = () => {

        const taskList = this.state.taskList.filter(item => !item.done)
        return this.getAllTasklist(taskList)
    }

    onChangeTaskInput = (event) => {
        this.setState(
            {
                task: event.target.value
            }
        );

    };

    onChangeTaskSort = (event) => {
        console.log(event.target.value);
        this.setState(
            {
                taskMode:event.target.value
            })
    }


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
             }
        )


    };

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <Input
                        label="Sort by"
                        onChange={this.onChangeTaskInput}
                        value={this.state.task}
                    />
                    <hr/>
                    <Button
                        onClick={this.createTask}
                        disabled={!this.state.task}
                        />
                </header>
                <section>
                    <div className="App-tasklist">
                        <Select
                            options={options}
                            label="Sort by"
                            value={this.state.taskMode}
                            onChange={this.onChangeTaskSort}
                        />
                        <h2>My tasks</h2>
                        <ul>
                            {this.state.taskMode === 'all'  && this.getAllTasklist(this.state.taskList)}
                            {this.state.taskMode === 'new'  && this.getNewTasklist()}
                            {this.state.taskMode === 'done' && this.getDoneTasklist()}

                        </ul>
                    </div>
                </section>

            </div>
        );
    }
    }
export default App;