import React, { useState } from "react";
import { Modal, Header, Form, Button, Icon } from "semantic-ui-react";
import "./AddRoomModal.css";

const AddRoomModal = ({ roomsRefFirebase }) => {
    const [roomName, setRoomName] = useState("");
    const [roomDescription, setroomDescription] = useState("");
    const [modalOpen, setmodalOpen] = useState(false);

    const handleOpen = () => setmodalOpen(true);
    const handleClose = () => setmodalOpen(false);

    const addRoom = () => {
        console.log("addRoom");
        const roomId = roomsRefFirebase.push().key;

        const newRoom = {
            id: roomId,
            name: roomName,
            description: roomDescription
        };

        roomsRefFirebase
            .child(roomId)
            .set(newRoom)
            .then(room => console.log(`success : ${room}`))
            .catch(err => console.log(`error : ${err}`));
    };

    return (
        <div>
            <Modal
                trigger={<span onClick={handleOpen}>+</span>}
                open={modalOpen}
                onClose={handleClose}
                basic
                size="small"
            >
                <Header content="Add a chat room" />
                <Modal.Content>
                    <Form onSubmit={addRoom}>
                        <Form.Field>
                            <input placeholder="Insert name" onChange={event => setRoomName(event.target.value)} />
                        </Form.Field>
                        <Form.Field>
                            <input placeholder="Description" onChange={event => setroomDescription(event.target.value)} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color="red" inverted onClick={handleClose}>
                        <Icon name="remove" />Cancel
                    </Button>
                    <Button color="green" inverted onClick={() => {
                        addRoom();
                        handleClose()
                    }}>
                        <Icon name="checkmark" />Add
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default AddRoomModal;
