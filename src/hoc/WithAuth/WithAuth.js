import React, {Component} from 'react';

export default (Component) => {
    class Auth extends Component {
        render() {
            const login = JSON.parse(localStorage.getItem('login'));

            if (login) {
                return <Component {...this.props} />
            }
            return (
                <div>
                    not auth
                </div>
            )
        }
    }
    return Auth;
}