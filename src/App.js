/* eslint-disable */

import React, {Component} from 'react';
import './App.css';
import {BrowserRouter , Route, Switch, Link} from 'react-router-dom';
import Desk from './components/Desk/Desk';
import Desklist from "./components/Desklist/Desklist";
import DeskDetail from "./components/DeskDetail/DeskDetail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck,faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import AddTask from "./components/AddTask/AddTask"

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
];

class App extends Component{
    state = {
        desk: '',
        deskList: [],
        taskList: {
        },
    };

    onChangeDeskInput = (event) => {
        this.setState(
            {
                desk: event.target.value
            }
        );

    };

    createDesk = () => {
        const index = Math.round(Math.random() * 10000);
        const deskItem = {
            id: index,
            desk: this.state.desk,
            taskMode: 'all'
        };

        this.setState(
            (prevState) => {
                return {
                    deskList: [...prevState.deskList, deskItem],
                    desk: ''

                }
            },
            () => {
                localStorage.setItem('deskList', JSON.stringify(this.state.deskList))
            }
        );
    };

    getAllDeskList = (deskList) => {
        return deskList.map((desk,index) => (
            <li key={index}>
                <Desk
                    checkTask = {this.checkTask}
                    taskList = {this.state.taskList[desk.id]}
                    deleteDesk = {this.deleteDesk}
                    createTask = {this.createTask}
                    deleteTask = {this.deleteTask}
                    deleteAllTask = {this.deleteAllTask}
                    title={desk.desk}
                    id={desk.id}
                    onChange={this.onChangeTaskInput}
                    onChangeTaskSelectInput={this.onChangeTaskSelectInput}
                    taskMode = {desk.taskMode}
                    options={options}
                   // getAllTaskList = {this.getAllTaskList}
                />
            </li>
            
        ));
        
    };

    createTask = (deskID,taskItem) => {
        this.setState(
            (prevState) => {
                const taskList = prevState.taskList[deskID] ? [...prevState.taskList[deskID], taskItem] : [taskItem];
                const taskListObject = {};
                taskListObject[deskID] = taskList;
                return {
                    taskList: {
                        ...prevState.taskList,
                        ...taskListObject
                    }
                }
            },
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
                this.setState( {
                     task: '',
                    desk: ''
                }
                )
            }
        )
    };

    deleteTask = (deskID,taskID) => {
        this.setState(
            prevState => ({
                taskList: {
                    ...prevState.taskList,
                    [deskID]:prevState.taskList[deskID].filter(el => el.id !== taskID)
                }
            })
            ,
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
            }
        )
    };

    deleteAllTask = (deskID) => {
        const copyState = {...this.state};
        delete copyState.taskList[deskID];

        this.setState( copyState,
            () => localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
        )
    };

    checkTask = (deskID,taskID) => {
        this.setState(
            prevState => ({
                taskList: {
                    ...prevState.taskList,
                    [deskID]:prevState.taskList[deskID].map(el => {
                        if (el.id === taskID) {
                            el.done = !el.done
                        }
                        return el
                    })
                }
            }),
            () => {
                localStorage.setItem('taskList', JSON.stringify(this.state.taskList))
            }
        )

    };

    componentDidMount(){
        const deskList = JSON.parse(localStorage.getItem('deskList') ) || [];
        const taskList = JSON.parse(localStorage.getItem('taskList') ) || {};
        this.setState({
            deskList,
            taskList
        })
    };

    deleteDesk = (id) => {
        this.deleteAllTask(id);
        this.setState(
            prevState => ({
                deskList: prevState.deskList.filter(el => el.id !== parseInt(id))
            }),
            () => {
                localStorage.setItem('deskList', JSON.stringify(this.state.deskList))
            }
        );

    };
    onChangeTaskInput = (event) => {
        this.setState(
            {
                task: event.target.value
            }
        );

    };

    checkEnterKey = (event) => {
        if (event.keyCode === 13) {
            this.onChangeDeskInput(event);
            this.createDesk();
        }
    };

    onChangeTaskSelectInput = (id,event) => {
        this.setState(
            prevState => ({
                deskList: prevState.deskList.map(el => {
                    if (el.id === id) {
                        el.taskMode = event
                    }
                    return el
                }),
            }),
            () => {
                localStorage.setItem('deskList', JSON.stringify(this.state.deskList));
            }
        )
    };

    getAllTaskList = (taskList) => {
        return taskList && taskList.map((task,index) => (
                <li key={index}>
                    <span className={`task ${task.done && 'decoration'}`}>{index + 1}. {task.task}</span>
                    <button className="btn check"><FontAwesomeIcon icon={faCheck} onClick={this.checkTask(task.deskID,task.id) } /></button>
                    <button className="btn delete"><FontAwesomeIcon icon={faTrashAlt} onClick={this.deleteTask(task.deskID,task.id) } /></button>
                </li>
            )
        )
    };

    getTaskListLength = (status) => {
        const task = this.props.taskList ? this.props.taskList.filter(item => item.done === status) : [];
        return task.length;
    };
    getDeskTitle = (deskID) => {
        const deskList = this.state.deskList ;
        const deskTitle = deskList.find(desk => desk.id == deskID) || {};
        return(deskTitle.desk);
    };
    render() {


        return (
            <div className="App">
            <BrowserRouter>
                    <Switch>
                        <Route exact path="/desk/:deskID"

                              render={(props) => {
                                  const deskID = props.match.params.deskID;
                                  return (<DeskDetail
                                      options={options}
                                      createTask = {this.createTask}
                                      taskList={this.state.taskList[deskID]}
                                      checkTask={this.checkTask}
                                      deleteTask={this.deleteTask}
                                      deleteAllTask={this.deleteAllTask}
                                      deleteDesk = {this.deleteDesk}
                                      getTaskListLength = {this.getTaskListLength}
                                      taskMode={'All'}
                                      getAllTaskList={this.getAllTaskList}
                                      onChangeTaskSelectInput={this.onChangeTaskSelectInput}
                                      title={this.getDeskTitle(props.match.params.deskID)}
                                      id = {parseInt(props.match.params.deskID)}
                                      task = {this.state.task}
                                  />)}} />

                        <Route exact path="/" render={() =>  {
                            return (<Desklist
                            deskList={this.state.deskList}
                            getAllDeskList = {this.getAllDeskList}
                            onChangeDeskInput = {this.onChangeDeskInput}
                            createDesk = {this.createDesk}
                            desk={this.state.desk}
                            onKeyUp={this.checkEnterKey}

                        />)}} />

                        <Route 
                        path="/addtask"
                                render={() => {
                                    return (
                                    <AddTask 
                                    createTask={this.createTask}
                                    disabled={!this.state.task || !this.state.desk}
                                    onChange={this.onChangeTaskInput}
                                    onChangeDeskInput={this.onChangeDeskInput}
                                        options={this.state.deskList}
                                        task={this.state.task}
                                        desk={this.state.desk}
                                        
                                    />
                                )}}
                        />

                    </Switch>
            </BrowserRouter>
            </div>
        );
    }
}
export default App;