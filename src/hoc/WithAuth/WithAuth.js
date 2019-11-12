import React, {Component} from 'react';
import {Redirect} from "react-router";

export default (Component) => {
    class Auth extends Component {
        render() {
            const login = localStorage.getItem('loginAuth') || '';

            if (login) {
                return <Component {...this.props} />
            }
            return (
                <Redirect to="/login" />
            )
        }
    }
    return Auth;
}