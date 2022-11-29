import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../App.css';

const Chat = () => {

    const [socket] = useState(() => io(':8000'));

    useEffect(() => {
        console.log("Is this running?");
        socket.on("Welcome", (data) => console.log(data));
        return () => socket.disconnect(true);
    }, []);

    return (
        <h1>Socket Test</h1>
    );
}

export default Chat;