import { FormControl, Input, FormHelperText, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function CreateRoom({ uuid, socket, setUser }) {
    const [roomId, setRoomId] = useState(uuid());
    const [name, setName] = useState("");

    const navigate = useNavigate();
    function handleCreateRoom(e) {
        e.preventDefault();

        const roomData = {
            name,
            roomId,
            userId: uuid(),
            host: true,
            presenter: true,
        };
        setUser(roomData);
        navigate("/:roomId")
        console.log(roomData)
        socket.emit("userJoined", roomData); // Emit event on socket
    } 

    return (
        <div style={{ border: "1.6px solid black", borderRadius: "8px", padding: "2rem" }}>
            <h2>Create Room</h2>
            <form onSubmit={handleCreateRoom}>
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
                        placeholder='Room ID'
                        value={roomId}
                        readOnly
                    />
                    <Button
                        variant='contained'
                        onClick={() => setRoomId(uuid())}
                    >
                        Generate
                    </Button>
                    <Button variant='outlined' sx={{ ml: ".5rem" }}>
                        Copy
                    </Button>
                    <FormHelperText>Please click on Generate to create a room ID.</FormHelperText>
                </FormControl>
                <Button variant='contained' type='submit'>Create Room</Button>
            </form>
        </div>
    );
}
