import React, {Component} from 'react';
import './Login.css'
import Input from '../UI/Input/Input'
import {withRouter,Link} from "react-router-dom";

class Login extends Component {
    state = {
        login: '',
        loginAuth: ''
    };

    onChangeLoginInput = (event) => {
        this.setState({
                login: event.target.value
            }
        )
    };

    loginHandler = () => {
        localStorage.setItem('loginAuth', this.state.login);

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
        console.log('componentDidUpdateLOGIN',prevProps);
        // if (this.props.title != prevProps.title && !this.props.title ) {
        //this.history.push('/');
    };


    render() {
        console.log('this state', this.state);
        return (
            <div className="Login">
                <Link to="/">Home</Link>

                <Input
                    onChange={this.onChangeLoginInput}
                    value={this.state.login}
                    onKeyUp={this.checkEnterKey}
                />

                <button onClick={this.loginHandler}>Login!</button>

            </div>
        );
    }
}


export default withRouter(Login);