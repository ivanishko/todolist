import React from 'react';
import './Select.css'

const Select = props =>
    {
        return (
            <div className='Select'>
                <label>{props.label}</label>
                <select
                    onChange={props.onChange}
                    defaultValue={props.value}
                >
                    {props.options.map((option, index) => {
                            return (
                                <option
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
    };


export default Select;