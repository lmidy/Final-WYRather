import { getInitialData } from '../utils/api'
import { addUserQuestion, saveUserAnswer, receiveUsers } from '../actions/users'
import { addQuestion, receiveQuestions, saveQuestionAnswer } from '../actions/questions'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'

export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({ users, questions})=> {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions))
        })
    }
}

export function handleAddQuestion (optionOne, optionTwo){
    return (dispatch, getState) => {
        const { authedUser } = getState();
        //console.log('what is available in getstate' +authedUser)
        return _saveQuestion({
            optionOne,
            optionTwo,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            //console.log('what is the autheduser question in Handle Add WQuestion' +authedUser)
            dispatch(addUserQuestion(authedUser, question.id))
        })

    }
}

export function handleAnswer (qid, option) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      //console.log(dispatch);
      const info = {
        authedUser: authedUser,
        qid,
        answer: option
      };
      _saveQuestionAnswer (info)
          .then(() => {
              dispatch(saveQuestionAnswer (authedUser, qid, option));
              dispatch(saveUserAnswer (authedUser, qid, option))
          })
    }
}
