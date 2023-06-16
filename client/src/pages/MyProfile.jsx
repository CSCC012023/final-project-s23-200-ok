import { toast } from 'react-toastify';
import React from 'react';
import {useState } from 'react';
import avatar from "./profile.jpeg"
import axios from 'axios'; 

const url = "http://localhost:3000/:id"

function MyProfile() {

  const [putPic, putProfilePic] = useState( { myFile : ""})

  const createPic = async (newImage) => {
    try {
      await axios.post(url, newImage)
    } catch(error) {
      console.log(error)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    createPic(putPic)
    console.log("Uploaded")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    putProfilePic({ ... putPic, profilePic: base64 })
  }

  return(
    <>
    <section className="heading">
      <h1>Profile</h1>
    <p> 
      Upload Profile Picture
      </p>
    <form 
    id="profileform" 
    onSubmit={handleSubmit}>
      <label
      htmlFor='file-upload'
      className='custom-file-upload'>
        <div className="pfp-container">       
        <img
        src={putPic.profilePic || avatar}
        className="profilepic"
        alt="profilepic" />
        </div>  
      </label>
      <input 
      type="file" 
      label="Image"
      name="myFile"
      className="form-control"
      id='file-upload'
      accept='*/image'
      onChange={(e) => handleFileUpload(e)}
      />
      <button type='submit'> 
        Submit
      </button>

    </form>
    </section>
    </>
  )


}

export default MyProfile;

// convert image into base 64 format 
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
          resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
          reject(error)
      }
  })
}