//create "save" feature after create memes:
// "chỉ cần tạo link target _blank để open image as a new page. 
// url là url của image thôi"

import './Meme.css'
import React, { useState, useEffect } from 'react';

function Meme() {
    //create new state GLOBALLY
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImg: "https://i.imgflip.com/1g8my4.jpg"
    });

    //create a state to manage meme data (an array of meme objects)
    const [allMeme, setAllMeme] = useState([]);

    //call API co get meme data
    useEffect(function () {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllMeme(data.data.memes))
    }, [])

    function getMemeText(event) {
        setMeme(prevMeme => {
            return (
                {
                    ...prevMeme,
                    [event.target.name]: event.target.value
                }
            )
        })
    }

    function getMemeImg() {
        const index = Math.floor(Math.random() * allMeme.length);
        const memeUrl = allMeme[index].url;
        setMeme(prev => (
            {
                ...prev,
                topText: "",
                bottomText: "",
                randomImg: memeUrl
            }
        ));
    }

    return (
        <main>
            <div className='form-container'>
                <div className='inputs'>
                    <input
                        type="text"
                        placeholder='top text'
                        name="topText"
                        value={meme.topText}
                        onChange={getMemeText}
                    />
                    <input
                        type="text"
                        placeholder='bottom text'
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={getMemeText}
                    />
                </div>
                <button
                    className='meme-button'
                    onClick={getMemeImg}>
                    Get a new meme image
                    <img className='img-icon' src="https://icon-library.com/images/icon-img/icon-img-29.jpg" alt=""></img>
                </button>
            </div>
            <div className='meme'>
                <img className='meme-img' src={meme.randomImg} alt="" />
                <h2 className="meme-text top">{meme.topText}</h2>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme;