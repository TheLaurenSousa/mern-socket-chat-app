import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../App.css';

const Chat = (props) => {
    const name = props.name;
    const [socket] = useState(() => io(':8000'))
    const [message, setMessage] = useState('');

    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        socket.on("send_message", data => {
            setMessages(prevMessages => {
                return [data, ...prevMessages];
            })
        });
    }, []);

    const onSubmitHandler = (formData) => {
        const data = {
            msg: formData.msg,
            name: formData.name
        };
        socket.emit("new_message", data);
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
                <input type="hidden" value={name}/>
                <input type="textarea" name="msg" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default Chat;