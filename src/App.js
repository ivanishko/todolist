/* eslint-disable */

import React, {Component} from 'react';
import './App.css';
import {BrowserRouter , Route, Switch} from 'react-router-dom';
import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button';
import Desk from './components/Desk/Desk';
import Desklist from "./components/Desklist/Desklist";
import DeskDetail from "./components/DeskDetail/DeskDetail";
import Select from "./components/UI/Select/Select";
// import NavLink from "react-router-dom/modules/NavLink";

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
        }
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
                    onChangeTaskSelectInput={this.onChangeTaskSelectInput}
                    taskMode = {desk.taskMode}
                    options={options}
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
        this.setState(
            prevState => ({
                taskList: {
                    ...prevState.taskList,
                    [deskID]:prevState.taskList[deskID] = []
                }

            }),
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
        const taskList = JSON.parse(localStorage.getItem('taskList') ) || [];
        this.setState({
            deskList,
            taskList
        })
    };

    deleteDesk = (id) => {
        this.setState(
            prevState => ({
                deskList: prevState.deskList.filter(el => el.id !== id)
            }),
            () => {
                localStorage.setItem('deskList', JSON.stringify(this.state.deskList))
            }
        )
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

    render() {
    //console.log('this.props',this.props.match.deskID);

        return (
            <div className="App">
            <BrowserRouter>
                    <Switch>

                        <Route exact path="/desk/:deskID"
                              render={() => (<DeskDetail
                                      options={options}
                                      id={this.state.deskList.id}
                                  />)} />
                        <Route exact path="/" render={() => ( <Desklist
                            deskList={this.state.deskList}
                            getAllDeskList = {this.getAllDeskList}
                            onChangeDeskInput = {this.onChangeDeskInput}
                            createDesk = {this.createDesk}
                            desk={this.state.desk}

                        />)} />

                    </Switch>
            </BrowserRouter>
            </div>
        );
    }
}
export default App;