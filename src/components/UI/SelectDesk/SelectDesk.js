import React, {Component} from 'react';


class SelectDesk extends Component { 
    render() {
        return (
            <div>
                <select 
                    onChange={this.props.onChange}
                >
                <option
                        disabled
                        selected = {!this.props.value}
                    >Choose DESK...</option>
                     {this.props.options.map((option) => (
                        <option
                            key={option.id}
                            value={option.id}
                            selected={option.selected}
                        >
                            {option.desk}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}


export default SelectDesk;