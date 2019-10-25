/* eslint-disable */
import React, {Component} from 'react';
import './App.css';
import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button';
import Desk from './components/Desk/Desk';

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
        //console.log('this.state.desk', this.state.desk);
        const deskItem = {
            id: index,
            desk: this.state.desk
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
       // console.log(this.state);
    };
    createTask = (deskID,taskItem) => {

        this.setState(
            (prevState) => {
                //console.log('prevState.taskList', prevState.taskList);
                const taskList = prevState.taskList[deskID] ? [...prevState.taskList[deskID], taskItem] : [taskItem];
                const taskListObject = {};
                taskListObject[deskID] = taskList;
                //console.log('taskList',taskList);
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

    getAllDeskList = (deskList) => {
        //console.log('deskList',deskList);
        return deskList.map((desk,index) => (

                <li key={index}>
                    <Desk
                        checkTask = {this.checkTask}
                        taskList = {this.state.taskList[desk.id]}
                        deleteDesk = {this.deleteDesk}
                        createTask = {this.createTask}
                        title={desk.desk}
                        id={desk.id}
                    />
                </li>


        ));
    };
// TODO  разобраться с чеканьем задач!
    checkTask = (deskID,taskItem) => {
        this.setState(
            prevState => ({
                taskList: prevState.taskList[deskID].map(el => {
                        if (el.deskID === deskID) {
                            el.done = !el.done
                        }
                        return el
                    }
                )
            }),
            () => {
                localStorage.setItem('taskItem', JSON.stringify(this.state.taskItem))
            }
        )
    };


    componentDidMount() {
        // console.log('componentDidMounth')
        const deskList = JSON.parse(localStorage.getItem('deskList') ) || [];
        // const deskMode = localStorage.getItem('taskMode') || 'all';
        // console.log('taskList ', taskList)
        // console.log('deskList ', deskList)
        this.setState({
            deskList
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

    render() {
       //console.log('render!!!!!!!!!!',this.state);
        return (
            <div className="App">
                <header className="App-header">
                    <Input
                        onChange={this.onChangeDeskInput}
                        value={this.state.desk}
                    />

                    <Button
                        onClick={this.createDesk}
                        buttonText='Add Desk'
                        disabled={!this.state.desk}
                    />
                </header>
                <section className="Desk">
                    <ul>
                        {this.getAllDeskList(this.state.deskList)}
                    </ul>

                </section>

            </div>
        );
    }
}
export default App;