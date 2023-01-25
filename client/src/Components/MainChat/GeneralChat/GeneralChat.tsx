import React from "react";
import '../GeneralChat/generalChat.scss';

interface dataItem {
    _id: string,
    chatList: string
}

export function GeneralChat() {

    const [chatList, setChatList] = React.useState(Array<dataItem>);

    const fetchChatList = async () => {
        await fetch("/chat")
        .then(res => res.json())
        .then(res => setChatList(res));
    }
    
    React.useEffect(() => {
        fetchChatList();
    }, []);

     const listItems = chatList.map((item) => <li className="chat-list-items" key={item._id}>{item.chatList}</li>); // проблема с key

    // !!!!!!!!!!!!!!! Проблема с компонентом, компонент отрисовывается 3 раза, пока временно вписал chatList в 20 строчку, это вызвает бесконенчое срабатывание useEffect, но в только в таком случае функционал рабоатает
    // Хотя я не уверен, если вжарить console.log() то он будет выводится постоянно, хотя сам компонент вроде как не перерисовывается
    // upd Все таки он отправляет бесконечное колво реквестов, что не есть хорошо, в очереди на фикс
    return <ul className="chat-list">
              {listItems}
           </ul>

}
