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
        console.log(event.target.value)
        this.setState(
            {
                desk: event.target.value
            }
        );

    };

    createDesk = () => {
        const index = Math.round(Math.random() * 10000);
        console.log('this.state.desk', this.state.desk);
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

            }
        )
        console.log(this.state);
    }

    getAllDeskList = (deskList) => {
        console.log('deskList',deskList);
        return deskList.map((desk,index) => (

                <li key={index}>
                    <Desk
                        deleteDesk = {this.deleteDesk}
                        title={desk.desk}
                        id={desk.id}
                    />
                </li>


        ));
    };

    componentDidMount() {
        console.log('componentDidMounth')
        const deskList = JSON.parse(localStorage.getItem('deskList') ) || [];
        // const deskMode = localStorage.getItem('taskMode') || 'all';
        // console.log('taskList ', taskList)
         console.log('deskList ', deskList)
        this.setState({
            deskList
        })
     };

    deleteDesk = (id) => {
        console.log('deleteDesk');
        this.setState(
            prevState => ({
                deskList: prevState.deskList.filter(el => el.id !== id)
            }),
            () => {
                localStorage.setItem('deskList', JSON.stringify(this.state.deskList))
            }
        )
    }

    render() {
        console.log('render',this.state);
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