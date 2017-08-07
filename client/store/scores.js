
export const GET_SCORES = 'GET_SCORES'

export const getScores = scores => ({type: GET_SCORES, scores});

export default function(state = [], action){
  switch(action.type){
    case GET_SCORES:
      return action.scores
    default:
     return state;
  }
}
