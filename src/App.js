import React, {Component} from 'react';
import './App.css';
import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button'



class App extends Component{
    state = {
        task: '',
        taskList: []
    };

    getTasklist = () => {
        console.log(this.state.taskList)
        return this.state.taskList.map((task,index) => (
                <li key={index}>
                    {index + 1}. {task.task}
                </li>
            )
        );
    };

    onChangeTaskInput = (event) => {
        this.setState(
            {
                task: event.target.value
            }
        );
    };

     createTask = () => {
         const index = Math.round(Math.random() * 10000)
         const taskItem = {
             id: index,
             task: this.state.task,
         };

         this.setState(
             (prevState) => {
                 return {
                     taskList: [...prevState.taskList, taskItem],
                     task: ''
                 }
             }
        )
         console.log(this.state.task);
    }

    render() {
         console.log(this.state);
        return (
            <div className="App">
                <header className="App-header">
                    <Input
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
                        <h2>My tasks</h2>
                        <ul>
                            {this.getTasklist()}
                        </ul>
                    </div>
                </section>

            </div>
        );
    }
    }


export default App;
