import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SCORES = 'GET_SCORES'

/**
 * INITIAL STATE
 */
const defaultScores = []

/**
 * ACTION CREATORS
 */
const getScores = scores => ({ type: GET_SCORES, scores })

/**
 * THUNK CREATORS
 */

// export const getScoresThunk = () =>
//     dispatch =>
//         axios({
//             method: 'post',
//             url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
//             data: {
//              "url": "http://clipart-library.com/images/dc9rGngoi.jpg"
//             },
//             headers: {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': 'key will go here' }
//         })
//             .then(res => {
//                 console.log(res.data)
//             })
//             .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultScores, action) {
    switch (action.type) {
        case GET_SCORES:
            return action.scores
        default:
            return state
    }
}
