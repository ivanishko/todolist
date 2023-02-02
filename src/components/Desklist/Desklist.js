import React, {Component} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {Link}  from "react-router-dom";

class Desklist extends Component {

    render() {
        return (
            <div>
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
                        <br/>
                        {
                           this.props.deskList.length   > 0 && <Link to="/addtask">Add Task</Link>
                        }
                    </header>
                <section className="Desk">
                    <ul>
                        {this.props.getAllDeskList(this.props.deskList)}
                    </ul>
                    <br/>
                </section>
            </div>
        );
    }
}

export default Desklist;