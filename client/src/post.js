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