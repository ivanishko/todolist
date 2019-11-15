import React from 'react'
import './Input.css'


const Input = props => {
    const cls = [
        'Input'
    ];

    return (
        <div className={cls.join(' ')}>
            <b><label htmlFor={props.label}>{props.label}</label></b>
            <br/>
            <input
                id={props.label}
                type={props.type}
                value={props.value  !== ' ' ? props.value : ''}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
            />
        </div>
    )
};


export default Input;