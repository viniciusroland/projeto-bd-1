import produce from 'immer'

const INITIAL_STATE = {
  profile: null
}

export default function user(state = INITIAL_STATE, action) {
  // action.type => the name of the action
  // action.payload => all the data
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.profile = action.payload.user
      })

    case 'UPDATE_PROFILE_SUCCESS':
      return produce(state, draft => {
        draft.profile = action.payload.profile
      })

    case 'SIGN_OUT':
      return produce(state, draft => {
        draft.profile = null
      })

    default:
      return state
  }
}