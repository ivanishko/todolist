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
            desk: this.state.desk
        }

        this.setState(
            (prevState) => {
                return {
                    deskList: [...prevState.deskList, deskItem],
                    desk: ''
                }
            },
            () => {
                localStorage.setItem('deskList', JSON.stringify(this.state.deskList))
                console.log(this.state)
            }
        )
        console.log(this.state);
    }

    getAllDeskList = (deskList) => {
        console.log('deskList',deskList);
        return deskList.map((desk,index) => (
            <li key={index}>
                <Desk title={JSON.parse(deskList.id)} />
            </li>
        ));
    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <Input>
                        onChange={this.onChangeDeskInput}
                        value={this.state.desk}
                    </Input>
                    <Button
                        onClick={this.createDesk}
                        buttonText='Add Desk'
                    />
                </header>
                <section className="Desk">
                    {this.getAllDeskList(this.state.deskList)}
                </section>

            </div>
        );


    }
}
export default App;