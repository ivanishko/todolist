import React from 'react';
import './Button.css'

const Button = props => {
        const cls = [
            'Button',
            [props.type]
        ]

    const buttonText = 'Button'

        return (
                <button
                    onClick={props.onClick}
                    className={cls.join(' ')}
                    disabled={props.disabled}

                >
                    {props.buttonText}
                </button>
        );
    }


export default Button;