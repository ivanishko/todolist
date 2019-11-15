import React, {Component} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import withAuth from "../../hoc/WithAuth/WithAuth";
import {withRouter} from "react-router";

class Desklist extends Component {

    state = {
        login: localStorage.getItem('login') || ''
    };

     logoutHandler = () => {

         this.setState(
             prevState => ({
                 login: '',
                 password: ''
             }),
             () => {
                 localStorage.setItem('login', '');
             }
         );

    };


     componentDidUpdate(prevProps, prevState) {
         if (this.state.login  !== prevState.login && !this.state.login ) {
             this.props.history.push('/');
         }
     }

    render()
    {
        return (
            <div>
                <div>
                    Hello, {this.state.login ? this.state.login : 'noname'}
                    <button onClick={this.logoutHandler}>Log out</button>
                </div>
                <header className="App-header">
                    <h1>Home Page</h1>

                        <br/>
                        <Input
                            type="text"
                            onChange={this.props.onChangeDeskInput}
                            value={this.props.desk}
                            onKeyUp={this.props.onKeyUp}
                        />
                        <Button
                            onClick={this.props.createDesk}
                            buttonText='Add Desk'
                            disabled={!this.props.desk}
                        />
                    </header>

                <section className="Desk">
                    <ul>
                        {this.props.getAllDeskList(this.props.deskList)}
                    </ul>
                </section>
            </div>
        );
    }
}

export default withRouter(withAuth(Desklist));