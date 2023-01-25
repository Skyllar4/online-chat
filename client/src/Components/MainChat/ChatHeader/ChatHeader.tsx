import React from "react";
import '../ChatHeader/chatHeader.scss';
import { useCookies } from 'react-cookie';

export function ChatHeader() {

    const getUserToken = useCookies()[0].loginToken;
    const [userName, setUserName] = React.useState('');

    React.useEffect(() => {
        fetch('/profile', {
            headers: { "Content-Type": "application/json", "authorization" : `${getUserToken}`},
            method: "GET"
        })
        .then(res => res.json())
        .then(res => setUserName(res.userName))
    }); // получение никнейма залогиненого пользователя и вставка его в хэдер

    return <header className="chatHeader">
            <div>
                <input className="chatHeader__searchChats-input" type="text" name="search"  placeholder="Поиск"/>
            </div>
            <div>
                <p className="chatHeader__userName-text">{userName}</p>
            </div>
        </header>

}
