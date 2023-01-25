import React from "react";
import '../ChatFooter/chatFooter.scss';

interface chatFooterProps {
    socketFn: (msg: string) => void
}

export function ChatFooter({socketFn}: chatFooterProps) {

    const [inputValue, setInputValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent) => {
        socketFn(inputValue);
        setInputValue('');
        event.preventDefault();
    }
 
    return      <form onSubmit={handleSubmit} className="formMessage" action="#" method="POST">
                    <div className="flex-container">
                        <input onChange={handleChange} value={inputValue} className="formMessage__type-input" type="text" placeholder="Введите ваше сообщение"/>
                        <button className="formMessage__submit-button" type="submit"></button>
                    </div>
                </form>
}
