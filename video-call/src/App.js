import React, { useEffect, useState } from 'react';
import CallView from './CallView';
import CreateRoom from './CreateRoom';


function App() {
  const [isCallHosted, setIsCallHosted] = useState(false);
  const [hostRoomId, setHostRoomId] = useState();

  useEffect(() => {
    const savedData = localStorage.getItem('chat');
    if (savedData) {
      const { roomId, status } = JSON.parse(savedData);
      if (status === 'active') {
        setHostRoomId(roomId);
        setIsCallHosted(true);
      }
    }
  }, []);

  const onCallHost=(event)=>{
    setHostRoomId(event)
    setIsCallHosted(true);
  }
  return (
    <div className="App">
      {
        isCallHosted ? <CallView hostRoomId={hostRoomId} setIsCallHosted={setIsCallHosted} /> : <CreateRoom setIsCallHosted={onCallHost} />
      }
    </div>
  );
}


export default App;
