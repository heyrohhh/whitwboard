const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
    res.send("Server is running");
});

const rooms = {}; // Track users in rooms

io.on("connection", (socket) => {
    console.log("A user connected");

    // When a user joins a room
    socket.on("userJoined", (data) => {
        const { roomId } = data;
        socket.join(roomId);
        
        // Track room participants
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push(socket.id);

        // Emit number of connected users in the room
        io.to(roomId).emit("updateUserCount", rooms[roomId].length);

        socket.on("canvasUpdate", (canvasData) => {
            const { roomId, elements } = canvasData;
            socket.to(roomId).emit("receiveCanvasUpdate", { elements });
        });

        // Handle disconnects
        socket.on("disconnect", () => {
            console.log("User disconnected");
            if (rooms[roomId]) {
                rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
                if (rooms[roomId].length === 0) {
                    delete rooms[roomId];
                } else {
                    io.to(roomId).emit("updateUserCount", rooms[roomId].length);
                }
            }
        });
    });
});

const port = 2003;
server.listen(port, () => console.log(`Server is running at port: http://localhost:${port}`));
