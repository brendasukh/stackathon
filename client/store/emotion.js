import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_EMOTION = 'GET_EMOTION';
// const UPDATE = 'UPDATE';

/**
 * ACTION CREATORS
 */
const getEmotion = emotion => ({ type: GET_EMOTION, emotion });
// const update = (emotion) => ({type: UPDATE}, emotion);

/**
 * THUNK CREATORS
 */
/* axios post: payload should be object*/
export const uploadImageContent = (imageContent) =>
    dispatch => {
        axios.post('/api/image', {image: imageContent})
        .then(res => {
            console.log("Emotion: ", res.data);
            dispatch(getEmotion(res.data));
        })
        .catch(err => console.log(err))
    }


export const updateEmotion = (emotion) => dispatch => dispatch(getEmotion(emotion));
/**
 * REDUCER
 */
export default function (state = '', action) {
    switch (action.type) {
        case GET_EMOTION:
            return action.emotion
        // case UPDATE:
        //     return action.emotion;
        default:
            return state;
    }
}
