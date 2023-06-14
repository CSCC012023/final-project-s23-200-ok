import React from 'react';
import { useState } from 'react';


export default function Post() {

    const [text, setText] = useState();

    const inputText = function(e){
        setText(e.target.value);


        // console.log(text);
    }

    const submit = async function (e){
        e.preventDefault();

        // issue with db, delete item from post with same user id before testing
        // currently use hardcode user_id, until authentication is completed
        const req = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user:"6482281f56285aa735a6e157",
                text: text
            })
        };

        try {
            const res = await fetch("http://localhost:5001/api/posts/", req);
            console.log(res);
        }
        catch (err){
            console.log("L");
            console.log(err);
        }
        // console.log("submit success, text:");
        // console.log(text);
    }

    return (
        <form onSubmit={submit}>
            <textarea placeholder='say something' onChange={(e) => {inputText(e)}}></textarea>
            <input className="submit" type="submit" value="Submit" />
        </form>
    )

}