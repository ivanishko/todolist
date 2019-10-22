import React from 'react';
import './Select.css'

const Select = props => {

    {
        return (
            <div className='Select'>
                <label>{props.label}</label>
                <select
                    onChange={props.onChange}
                >
                    {props.options.map((option, index) => {
                            return (
                                <option
                                    selected={option.key === props.value}
                                    value={option.key}
                                    key={option.key}
                                >
                                    {option.value}
                                </option>
                            )
                        }
                    )}
                </select>
            </div>

        );
    }
}


export default Select;