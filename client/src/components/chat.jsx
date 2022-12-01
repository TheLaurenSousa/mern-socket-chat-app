import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../App.css';

const Chat = (props) => {
    const name = props.name;
    const [ socket ] = useState(() => io(':8000'))
    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        socket.on("new_message", data => {
            setMessages(prevMessages => {
                return [...prevMessages, data];
            })
        });
    }, []);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (message && name) {
            socket.emit("new_message", {msg: message, name: name});
        }
    };

    return (
        <div>
            <h2>Time to Chat</h2>
            {messages.map((msg, i) => {
                return (
                    <div key={i} className="message">
                        <p>{msg.name} said</p>
                        <p>{msg.msg}</p>
                    </div>
                )
            })}
            <form onSubmit={onSubmitHandler}>
                {/* <input type="hidden" name = "name" value={name}/> */}
                <input id="msg" autoComplete="off" type="textarea" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button>Send</button>
            </form>
        </div>
    );
}

export default Chat;