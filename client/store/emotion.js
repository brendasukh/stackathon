import axios from 'axios'
import {getScores} from './scores'
/**
 * ACTION TYPES
 */
const GET_EMOTION = 'GET_EMOTION';


/**
 * ACTION CREATORS
 */
const getEmotion = emotion => ({ type: GET_EMOTION, emotion });


/**
 * THUNK CREATORS
 */
/* axios post: payload should be object*/
export const uploadImageContent = (imageContent) =>
    dispatch => {
        axios.post('/api/image', {image: imageContent})
        .then(res => {
            console.log("Emotion: ", res.data[1]);
            dispatch(getEmotion(res.data[1]));
            dispatch(getScores(Object.entries(res.data[0])));
        })
        .catch(err => console.log(err))
    }


export const updateEmotion = (emotion, scores) => dispatch => {
    dispatch(getEmotion(emotion));
    dispatch(getScores(scores));
}
/**
 * REDUCER
 */
export default function (state = '', action) {
    switch (action.type) {
        case GET_EMOTION:
            return action.emotion
        default:
            return state;
    }
}
