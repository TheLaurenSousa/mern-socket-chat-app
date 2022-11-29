import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../App.css';

const Chat = (props) => {
    const name = props.name;
    const [socket] = useState(() => io(':8000'))

    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        socket.on("new_message", msg =>
            setMessages(prevMessages => {
                return [msg, ...prevMessages];
            })
        );
    }, []);

    return (
        <div>
            <h2>Time to Chat</h2>
            {messages.map((msg, i) => {
                return (
                    <p key={i}>{msg}</p>
                )
            })}
        </div>
    );
}

export default Chat;