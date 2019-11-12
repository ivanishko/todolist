import React, {Component} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import withAuth from "../../hoc/WithAuth/WithAuth";
import {withRouter} from "react-router";

class Desklist extends Component {

    state = {
        login: localStorage.getItem('loginAuth') || ''
    };

    render()

    {console.log('this.props.', this.props);
        return (
            <div>
                <div>Hello, {this.state.login ? this.state.login : 'noname'}</div>
                <header className="App-header">
                    <h1>Home Page</h1>

                        <br/>
                        <Input
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