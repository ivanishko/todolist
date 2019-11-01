import React, {Component} from 'react';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Desk from "../Desk/Desk";

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

export default Desklist;