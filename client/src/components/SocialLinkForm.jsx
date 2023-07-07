import React from "react";
import { useState } from "react";


const SocialLinkForm = ({ closeSocialsModal, submittedLinks, setSubmittedLinks }) => {
    const [form, setForm] = useState({
        social: "",
        url: "",
    });

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedLinks([...submittedLinks, { social: form.social, url: form.url }]);
        closeSocialsModal();
      };    

    return (
        <form onSubmit={handleSubmit}>
            <label>Add Links</label>
            <div className="form-group">
                <select
                    name="social"
                    value={form.social}
                    onChange={handleFormChange}
                >
                    <option value="">--Select a platform--</option>
                    <option value="instagram">Instagram</option>
                    <option value="twitter">Twitter</option>
                    <option value="tiktok">Tiktok</option>
                    <option value="youtube">Youtube</option>
                    <option value="twitch">Twitch</option>
                </select>
                <label>URL </label>
                <input 
                    type='text' 
                    name="url"
                    value={form.url}
                    onChange={handleFormChange}
                />
            </div>
            <button type="submit" className="edit-button">Submit</button>
        </form>
    )
}

export default SocialLinkForm;