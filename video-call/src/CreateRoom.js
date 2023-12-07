import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { database } from './firebaseConfig';
import { ref, set } from "firebase/database";


function CreateRoom(props) {
    const { setIsCallHosted } = props;

    const [isRoomNew, setIsRoomNew] = useState(true);
    const [newRoomID, setNewRoomID] = useState();
    const [joinRoomID, setJoinRoomID] = useState();

    useEffect(() => {
        let date=new Date();
        setNewRoomID(Math.floor(date.getTime() / 1000));
      }, []);

      function onCreateClick() {
        localStorage.setItem("chat",JSON.stringify({
            roomId:newRoomID,
            status:"active",
            isHost:isRoomNew
        }))
        set(ref(database, 'chat/' + newRoomID), {
          original: "",
          transulation: "",
        }).then((value)=>{
            console.log(value);
            setIsCallHosted(newRoomID);
        });

      }

      function onJoinClick() {
        localStorage.setItem("chat",JSON.stringify({
            roomId:joinRoomID,
            status:"active",
            isHost:isRoomNew
        }));
        setIsCallHosted(joinRoomID);
      }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card style={{ width: 400, padding: 20, border: '1px solid black' }} elevation={0}>
                <h1>Create Room</h1>
                <CardContent>
                    {isRoomNew?                    <TextField
                        value={newRoomID}
                        type="number"
                        variant="outlined"
                        onChange={(event) => setNewRoomID(event.target.value)}
                        style={{ borderColor: 'black', borderRadius: 16, marginBottom: '10px', width: '100%' }}
                        label="New Room ID"
                        InputProps={{
                            readOnly: true,
                          }}
                    />:                    <TextField
                    value={joinRoomID}
                    type="number"
                    variant="outlined"
                    onChange={(event) => setJoinRoomID(event.target.value)}
                    style={{ borderColor: 'black', borderRadius: 16, marginBottom: '10px', width: '100%' }}
                    label="Join Room ID"
                    InputProps={{
                        readOnly: false,
                      }}
                />}
                </CardContent>
                <CardActions>
                <Button style={{ width: '50%' }} disableElevation variant="contained" onClick={()=>{
                    if(isRoomNew){
                        onCreateClick()
                    }else{
                        setIsRoomNew(true);
                    }
                }}>Create</Button><br/>
                <Button style={{ width: '50%' }} disableElevation variant="outlined" onClick={()=>{
                    if(!isRoomNew){
                        onJoinClick();
                    }else{
                        setIsRoomNew(false);
                    }
                }}>Join</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default CreateRoom;