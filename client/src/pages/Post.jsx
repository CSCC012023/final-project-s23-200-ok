import { React, useEffect } from 'react'
import CreatePostForm from "../components/CreatePostForm/CreatePostForm"

export default function Post(){

    useEffect(()=> {
        let token = localStorage.getItem('accessToken');
        if (!token){
            console.log("not loggedin");
        }
    })

    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <CreatePostForm/>
            

        </div>
    )

}