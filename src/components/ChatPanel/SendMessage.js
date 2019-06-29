import React from "react";

const SendMessage = ({messagesRefFirebase}) => {
    return (
        <div style={{ display: "flex" }}>
            <input style={{ flexGrow: 1 }} placeholder="insert message ..." />
            <button
                onClick={() =>
                    messagesRefFirebase
                        .child("id2")
                        .set({ text: "some text 2" })
                        .then(msg => console.log(`set success : ${msg}`))
                        .catch(err => console.log(`set error : ${err}`))
                }
            >
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;
