import React, {Component} from 'react';
import './Login.css'
import Input from '../UI/Input/Input'
import {withRouter,Link} from "react-router-dom";



const users = [
    {
        login: 'qwe',
        password: '123'
    },
    {
        login: 'asd',
        password: '123'
    },
    {
        login: 'zxc',
        password: '123'
    },
];



class Login extends Component {
    state = {
        login: '',
        password: ''
    };



    onChangeLoginInput = (event) => {
        this.setState({
                login: event.target.value
            }
        )
    };

    onChangePassInput = (event) => {
        this.setState({
                password: event.target.value
            }
        )
    };


    loginHandler = () => {
       const userAuth = users.find(user => user.login === this.state.login);

       if  (userAuth && (userAuth.password === this.state.password)) {
            localStorage.setItem('login', this.state.login);
        }

        this.setState(
            {
                    login: ''
                }
            );
        this.props.history.push('/');
    };

    checkEnterKey = (event) => {
        if (event.keyCode === 13) {
            this.onChangeLoginInput(event)
        }

    };

    componentDidUpdate(prevProps) {
       // console.log('componentDidUpdateLOGIN',prevProps);
        // if (this.props.title != prevProps.title && !this.props.title ) {
        //this.history.push('/');
    };


    render() {
        console.log('this state', this.state);
        return (
            <div className="Login">
                <Link to="/">Home</Link>
                <h3>Please, sign in</h3>
                <Input
                    label="Login"
                    type="text"
                    onChange={this.onChangeLoginInput}
                    value={this.state.login}
                    onKeyUp={this.checkEnterKey}
                />
                <Input
                    label="Password"
                    type="password"
                    onChange={this.onChangePassInput}
                    value={this.state.password}

                />


                <button onClick={this.loginHandler}>Login!</button>

            </div>
        );
    }
}


export default withRouter(Login);