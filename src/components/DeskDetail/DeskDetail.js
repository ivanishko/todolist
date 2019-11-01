import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Router,Link,withRouter} from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";




class DeskDetail extends Component {

    createTask = (deskID) => () => {
        const index = Math.round(Math.random() * 10000)
        const taskItem = {
            id: index,
            task: this.state.task,
            done:false,
            deskID
        };

        this.props.createTask(deskID,taskItem);
        this.setState( {
                task:''
            }
        )
    };


    render() {
        console.log('this.props',this.props)
        return (
            <div>
                <h1>Desk , (ID:{this.props.match.params.deskID}</h1>
                {/*<div className="deskItem">*/}
                {/*    <button className="btn delete delete-desk" onClick={this.props.deleteDesk}><FontAwesomeIcon icon={faTimes}   /></button>*/}
                {/*    <Link to={`/desk/${this.props.id}`}><h3>Desk {this.props.title} (ID: {this.props.id})</h3></Link>*/}
                {/*    <Input*/}
                {/*        onChange={this.props.onChangeTaskInput}*/}
                {/*        value={this.props.task}*/}
                {/*    />*/}
                {/*    <hr/>*/}
                {/*    <Button*/}
                {/*        onClick={this.createTask(this.props.id)}*/}
                {/*        disabled={!this.props.task}*/}
                {/*        buttonText='Add task'*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        onClick={this.props.deleteAllTask}*/}
                {/*        buttonText='Delete All'*/}
                {/*        disabled={!this.props.taskList || !this.props.taskList.length}*/}
                {/*    />*/}
                {/*    <div className="Desk-status">*/}
                {/*        <Select*/}
                {/*            options={this.props.options}*/}
                {/*            label="Sort by"*/}
                {/*            value={this.props.taskMode}*/}
                {/*            onChange={this.onChangeTaskSelect}*/}
                {/*        />*/}
                {/*        <ul>*/}
                {/*            <li>Всего: {this.props.taskList ? this.props.taskList.length : '0'}</li>*/}
                {/*            <li>Активных:{this.props.getTaskListLength(false)}</li>*/}
                {/*            <li>Выполненных:{this.props.getTaskListLength(true)}</li>*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*    <div className="Desk-taskList">*/}

                {/*        <h2>My tasks</h2>*/}
                {/*        <ul>*/}
                {/*            {this.props.taskMode === 'all'  && this.props.getAllTaskList(this.props.taskList)}*/}
                {/*            {this.props.taskMode === 'newTask'  && this.props.getNewTaskList()}*/}
                {/*            {this.props.taskMode === 'done' && this.props.getDoneTaskList()}*/}
                {/*        </ul>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default withRouter(DeskDetail);