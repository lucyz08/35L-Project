import "./home.css"

//stuff to get songs and prompts, not too sure what is necessary 
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getSongs} from '../actions/songFetching';
import {getPrompts} from '../actions/promptFetching';
import Songs from '../components/Songs/printSongs';
import Prompts from '../components/Prompts/printPrompts';
import SongForm from '../components/Forms/songForm.js';

const Home = () => {

    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getPrompts());
  }, [dispatch]);


    return (
    <>
    <div className="outside">
    <h1 className="homeTitle" style={{backgroundImage: `url("../images/musicHall.jpg")`}}>
        <h1 className="homeHeader">Arpeggio</h1>
        <h3 className="subtitle">a new way to share music</h3>
    </h1>
    <div className="promptHead">
        <h1 className="declareP">
            Daily Prompt: 
        </h1>
        <h1 className="prompt">
            <Prompts/>
        </h1>
    </div>
    <div className="formAnswers">
        <div className="form">
            <SongForm/> 
        </div>
        <div className="responses">
            <div className="friendResponses">
                Friend Responses
            </div>
            <Songs/>
            <Songs/>
            <Songs/>
            <Songs/>
            <Songs/>
            <Songs/>
            <Songs/>
        </div>
    </div>
    </div>
    </>
    )
}

export default Home
