import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Form from "./components/forms";

const server = "http://localhost:2003/";
const connectionOptions = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
};

const socket = io(server, connectionOptions);

function App() {
    const [user, setUser] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate
   console.log(user);
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to socket server");
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });

        // Listen for an event that indicates a user joined
        socket.on("userJoined", (userData) => {
            setUser(userData); // Set the user data
            // Navigate to the Roompage after setting the user
            navigate("/:roomId");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("userJoined"); // Clean up the listener
        };
    }, [navigate]);

    const uuid = () => {
        const S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };

    return (

     
  <div style={{ marginLeft: "10%", width: "80vw" }}>
            <Form uuid={uuid} socket={socket} user={user} setUser={setUser} />
        </div>
     
      
    );
}

export default App;
