import React from "react";
import { useState } from "react";
import InstagramIcon from '../assets/InstagramIcon.png'
import TwitterIcon from '../assets/TwitterIcon.png'
import TikTokIcon from '../assets/TikTokIcon.png'
import YoutubeIcon from '../assets/YoutubeIcon.png'
import TwitchIcon from '../assets/TwitchIcon.png'

const SocialLinkForm = ({ closeSocialsModal, submittedLinks, setSubmittedLinks, socials }) => {
    const [form, setForm] = useState({
        socials: "",
        url: "",
    });

    

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedLinks([...submittedLinks, { socials: form.socials, url: form.url }]);
        closeSocialsModal();
      };    

    return (
        <form onSubmit={handleSubmit}>
            <label>Add Links</label>
            <div className="form-group">
                <select
                    name="socials"
                    value={form.socials}
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
            {/*{socials && socials.map((link, index) => (
                
                <a href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                    
                    {link.socials === "instagram" && <InstagramIcon />}
                    {link.socials === "twitter" && <TwitterIcon />}
                    {link.socials === "tiktok" && <TikTokIcon />}
                    {link.socials === "youtube" && <YoutubeIcon />}
                    {link.socials === "twich" && <TwitchIcon />}
                    
                </a>
            ))}
            */}
        </form>
    )
}

export default SocialLinkForm;