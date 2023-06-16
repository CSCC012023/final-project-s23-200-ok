import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { linkOverwatch } from "../features/profile/profileSlice";

const OverwatchGameForm = ({ closeModal }) => {
  const [form, setForm] = useState({
    username: "",
    tagline: "",
    region: "",
    platform: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(linkOverwatch({ profileId: "648a307ad4f77bff86785f2a", overwatchData: form }))
        .then((res) => {
            if (res.type === "profile/linkOverwatch/fulfilled") {
                setMessage("Overwatch account linked successfully!");
                closeModal();
            } else {
                setMessage("Error linking Overwatch account!");
                closeModal();
            }
            }
        );

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
              <option value="us">NA</option>
              <option value="eu">EU</option>
              <option value="asia">ASIA</option>
            </select>
          </div>

          <div>
            <label htmlFor="platform">Platform</label>
            <select
              name="platform"
              id="platform"
              value={form.platform}
              onChange={handleFormChange}>
              <option value="">--Select a platform--</option>
              <option value="pc">PC</option>
              <option value="ps4">PS4</option>
              <option value="xbox">XBOX</option>
            </select>
          </div>
          <button type="submit" className="edit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OverwatchGameForm;
