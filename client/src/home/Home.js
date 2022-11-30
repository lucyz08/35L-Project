import "./home.css"

//stuff to get songs and prompts, not too sure what is necessary 
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import { getPlaylists } from "../actions/userFetching";
import { compileResponses } from "../actions/userFetching";
import { setUserData } from "../actions/userFetching";
import { addResponse } from "../actions/searchFetching";

import { newPlaylist } from "../actions/userFetching";

import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';
import Users from '../components/Users/printUsers'
import SongForm from '../components/Forms/songForm.js';
import PromptForm from "../components/Forms/promptForm";
import FriendForm from "../components/Forms/friendForm.js";
import Friends from "../friends/Friends";
import '../components/Forms/form.css'

const Home = () => {

    function arrayToString(array){
        var artistString = array.join(', ');
        return artistString
    }

    const dispatch = useDispatch();

    var songVar = localStorage.getItem('songSubmitted');
    // var cP = localStorage.setItem('CP');
    console.log(songVar);

    console.log(songVar);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
  }, [dispatch]);
useEffect(() => {
    dispatch(getPlaylists());
}, [dispatch]);
useEffect(() => {
    dispatch(newPlaylist());
}, [dispatch]);
useEffect(() => {
    dispatch(compileResponses());
}, [dispatch]);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    useEffect(() => {
        const token = user?.token

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [])

    const [data, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        const token = user?.token

        setUserData(JSON.parse(localStorage.getItem('userdata')))
    }, [])

    const [prompt, setPrompt] = useState(JSON.parse(localStorage.getItem('currentPrompt')))
    useEffect(() => {
        setPrompt(JSON.parse(localStorage.getItem('currentPrompt')))
    }, [])
    console.log(prompt)

    const [friendResponses, setFriendResponses] = useState(JSON.parse(localStorage.getItem('userdata')))
    useEffect(() => {
        setFriendResponses(JSON.parse(localStorage.getItem('userdata')))
    }, [])
    console.log(friendResponses)
    const results = [];
    if (data)
    {
        if (friendResponses.playlist1.length > 0)
        {
            for (const iter of friendResponses.playlist1) {
                results.push(
                <div className="individualSong">
                    <div>
                        <img className="songImg" src = {iter.song.albumCoverURL} width={70} height={70} alt="Image cannot be displayed"/>
                    </div>
                    <div className="songartist">
                        <h3 className="songName">Song: {iter.song.name} </h3>
                        <h3 className="artistName">Album: {iter.song.album} </h3>
                    </div>
                    <div className="album">
                        <h3 className="albumName">Artist: {arrayToString(iter.song.artists)} </h3>
                    </div>
                </div>,
                );
            }
        }
    }

    return (
    <>
    <div className="outside">
    <h1 className="homeTitle">
        <h1 className="homeHeader">Arpeggio</h1>
        <h3 className="subtitle">a new way to share music</h3>
    </h1>
    {songVar ? (
        <h1> </h1>

    ) : (
        <div className="promptHead">
            <h1 className="declareP">
                Current Prompt:
            </h1>
            <h1 className="prompt">
            {prompt.prompt}
        </h1>
        </div>
        
    )}

     {user ? (
        <div className="formAnswers">
            <div className="form">
                {songVar ? (
                    <h1 className="thankYou">Thank you for submitting!</h1>       
                ) : (
                    <SongForm />
                )
                }
                
            </div>
            <div className="responses">
        </div>
        </div>
    ) : (
        <div>
            <h1 className="loggedOutWarn"><a className="homeLink" href="http://localhost:3000/signin">Log In</a> or <a className="homeLink" href="http://localhost:3000/signup">Sign Up</a> for Access</h1>
        </div>
    )}
    </div>
    </>
    )
}

export default Home
