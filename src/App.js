import React, {Component} from 'react';
import './App.css';
import Input from './components/UI/Input/Input';
import Button from './components/UI/Button/Button'

function addTask() {

}

class App extends Component{
    render(){
        return (
            <div className="App">
                <header className="App-header">
                    <Input />
                    <hr/>
                    <Button  onClick={this.addTask}/>

                </header>


            </div>
        );
    }
    }


export default App;
