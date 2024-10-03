// JoinRoom.jsx
import { FormControl, Input, FormHelperText, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom({ socket, setUser, uuid }) {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");

    const navigate =useNavigate();

    const handleJoinRoom = (e) => {
        e.preventDefault();
        const userData = {
            name,
            roomId,
            userId: uuid(),
            host: false,
            presenter: false, // You may need to pass uuid function to this component
        };
        setUser(userData);
        navigate(`/${roomId}`)
        socket.emit("userJoined", userData);
    };
   

    return (
        <div style={{ border: "1.6px solid black", borderRadius: "8px", padding: "2rem" }}>
            <h2>Join Room</h2>
            <form onSubmit={handleJoinRoom}>
                <FormControl style={{ display: "flex", marginBottom: "1rem" }}>
                    <Input
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormHelperText>Please write your name.</FormHelperText>
                </FormControl>
                <FormControl style={{ display: "flex", marginBottom: "1rem" }}>
                    <Input
                        placeholder='Enter Room ID'
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    <FormHelperText>Please fill in the room ID.</FormHelperText>
                </FormControl>
                <Button variant='contained' onClick={handleJoinRoom}  type='submit'>Join Room</Button>
            </form>
        </div>
    );
}
