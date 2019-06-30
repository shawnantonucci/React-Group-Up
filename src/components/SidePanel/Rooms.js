import React, { useContext, useState, useEffect, useRef } from "react";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import firebase from "../../logic/firebase";

const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([]);
  const roomsRefFirebase = firebase.database().ref("rooms");

  const refTo_roomsVariable = useRef();

  refTo_roomsVariable.current = rooms;

  const addRoom = () => {
    console.log("addRoom");
    const roomId = roomsRefFirebase.push().key;

    const newRoom = {
      id: roomId,
      name: "room2", //todo replace with data from modal
      description: "desc2" //todo replace with data from modal
    };

    roomsRefFirebase
      .child(roomId)
      .set(newRoom)
      .then(room => console.log(`success : ${room}`))
      .catch(err => console.log(`error : ${err}`));
  };

  const addRoomsListener = () => {
    console.log("rooms listener is added");
    roomsRefFirebase.on("child_added", snap => {
      console.log(snap.val());
      let newRooms = [...refTo_roomsVariable.current, snap.val()];
      console.log(refTo_roomsVariable.current);
      setRooms(newRooms);
    });
  };

  const removeRoomsListener = () => {
    console.log("rooms listener is removed");
    roomsRefFirebase.off();
  };

  useEffect(() => {
    addRoomsListener();

    return () => removeRoomsListener();
  }, []); // --- mount \ unmount

  const roomsElements = (
    <ul>
      {rooms.map((it, index) => (
        <li onClick={() => setCurrentRoom(rooms[index])} key={index}>
          {it.name}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <button onClick={addRoom}>Add Room</button>
      <h4>rooms ({rooms.length})</h4>
      {roomsElements}
    </div>
  );
};

export default Rooms;
