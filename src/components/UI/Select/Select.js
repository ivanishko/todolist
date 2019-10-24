import React from 'react';
import './Select.css'

const Select = props =>
    {
        //console.log(props.value)
        return (
            <div className='Select'>
                <label>{props.label}</label>
                <select
                    onChange={props.onChange}
                    value={props.value}
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