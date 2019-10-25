import React from 'react'
import './Input.css'

const Input = props => {

    const cls = [
        'Input'
    ];

    return (
        <div className={cls.join(' ')}>
            <input
                type="text"
                value={props.value}
                onChange={props.onChange}

            />
        </div>

    )
}


export default Input;