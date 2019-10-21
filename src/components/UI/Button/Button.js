import React from 'react';
import './Button.css'

const Button = props => {
        const cls = [
            'Button',
            [props.type]
        ]

        return (
                <button
                    onClick={props.onClick}
                    className={cls.join(' ')}
                    disabled={props.disabled}
                >
                    Add task to list
                </button>
        );
    }


export default Button;