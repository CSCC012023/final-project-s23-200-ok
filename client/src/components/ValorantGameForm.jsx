import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { linkValorant  } from "../features/profile/profileSlice";


const ValorantGameForm = ({closeModal}) => {
  const [form, setForm] = useState({
    username: "",
    tagline: "",
    region: "",
  });
  const [message, setMessage] = useState("");

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(linkValorant({ profileId : "648a307ad4f77bff86785f2a", valorantData: form }))
    .then((res) => {
        if (res.type === "profile/linkValorant/fulfilled") {
          setMessage("Valorant account linked successfully!");
            closeModal();
        } else {
            setMessage("Error linking Valorant account!");
            closeModal();
        }
        });
    };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="game-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleFormChange}
            required
          />
          <label htmlFor="tagline">Tagline</label>
          <input
            type="text"
            name="tagline"
            id="tagline"
            value={form.tagline}
            onChange={handleFormChange}
            required
          />
          <div>
            <label htmlFor="region">Region</label>
            <select
              name="region"
              id="region"
              value={form.region}
              onChange={handleFormChange}>
              <option value="">--Select a region--</option>
              <option value="na">NA</option>
              <option value="eu">EU</option>
              <option value="latam">LATAM</option>
              <option value="kr">KR</option>
              <option value="ap">AP</option>
            </select>
          </div>
          <button type="submit" className="edit-button">
            Submit
          </button>
          {message && <p>{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default ValorantGameForm;
