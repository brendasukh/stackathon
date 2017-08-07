import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const SAVE_IMAGE = 'SAVE_IMAGE'

/**
 * ACTION CREATORS
 */
const saveImage = status => ({ type: SAVE_IMAGE, status })

/**
 * THUNK CREATORS
 */
/* axios post: payload should be object*/
export const saveImageContent = (imageContent) =>
    dispatch =>
        axios.post('/api/image', {image: imageContent})
        .then(res => {
            console.log("Emotion: ", res.data);
            dispatch(saveImage(res.data));
        })
        .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = 'Failure', action) {
    switch (action.type) {
        case SAVE_IMAGE:
            return action.status
        default:
            return state;
    }
}
