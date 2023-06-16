import React from 'react'
import IGIcon from '../assets/InstagramIcon.png'
import TwitterIcon from '../assets/TwitterIcon.png'
import TikTokIcon from '../assets/TikTokIcon.png'
import YoutubeIcon from '../assets/YoutubeIcon.png'
import TwitchIcon from '../assets/TwitchIcon.png'

const Socials = () =>  {
    return (
        <div>
            <a
                className="IG-link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={IGIcon} alt="IG-icon" />
            </a>
            <a
                className="Twitter-link"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={TwitterIcon} alt="Twitter-icon" />
            </a>
            <a
                className="TikTok-link"
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={TikTokIcon} alt="TikTok-icon" />
            </a>
            <a
                className="Youtube-link"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={YoutubeIcon} alt="Youtube-icon" />
            </a>
            <a
                className="Twitch-link"
                href="https://twitch.tv"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={TwitchIcon} alt="Twitch-icon" />
            </a>
        </div>
    )
} 

export default Socials