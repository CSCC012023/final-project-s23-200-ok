import { React, useEffect, useState } from "react";
import './styles.css';

export default function CreatePostForm() {

    const [content, setContent] = useState("");
    const [file, setFile] = useState();
    const [token, setToken] = useState();

    function textHandler(e){
        setContent(e.target.value);
    }

    function fileHandler(e){
        setFile(e.target.files[0]);
    }



    async function submitHandler(e){
        e.preventDefault();
        
        const formData = new FormData();
        if (file){
            formData.append('postFile', file);
        }
        formData.append('content', content);

        const allowedImgTypes = ["image/jpeg", "image/png", "image/gif"];
        const allowedVdoTypes = ["video/mp4"];
        var type = "text";
    
        console.log(file?.type)

        if (allowedImgTypes.includes(file?.type)){
            type="image"
        }
        if (allowedVdoTypes.includes(file?.type)){
            type="video"
        }

        formData.append('type', type);

        const token = localStorage.getItem('accessToken');
        if (!token){
            console.log("no accessToken");
            return;
        }
        
        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]); 
          }


        const req = {
            method: "POST",
            headers: {  
                // 'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer '+token 
                    },
            body: formData,
        };

        console.log(content);
        console.log(type);
        console.log(file);



        try {
            const res = await fetch("http://localhost:5000/api/posts/", req);
            console.log(res);
        }
        catch (err){
            console.log("L");
            console.log(err);
        }

    }

    return (
        <form id="post-creation-form" onSubmit={submitHandler}>

            <div className="post-text-container">
            <label for="text-id" >Create your post here</label>

                <textarea id="text-id" name="content"
                    onChange={textHandler}/>
            </div>
            <div className="post-opt-container">
                <input type="file" onChange={fileHandler}></input>
                <input type="submit"/>
            </div>
        
        </form>
    )

}