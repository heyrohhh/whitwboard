import JoinRoom from "./joinRoomForms/joinRoom"
import CreateRoom from "./createRoomForms/createroom"

export default function Form({uuid,socket,setUser}){


    return(

        <>
                   <div style={{display:"grid", gridTemplateColumns:"repeat(2,2fr)", gap:"2rem"}}>
                         <div>
                            <CreateRoom uuid={uuid} socket={socket} setUser={setUser}/>
                        </div>  

                        <div>
                            <JoinRoom uuid={uuid} socket={socket} setUser={setUser}/>
                        </div>
                   </div>
        </>
    )
}