import { useState, useEffect } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom";

function Verify() {
    const {id} = useParams();
    useEffect(() => {
        axios.get("/api/users/verify/" + id); 
    }, [])  
    return (<h1> Email verified </h1>)
}

export default Verify; 