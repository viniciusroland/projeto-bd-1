import produce from 'immer'

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false
}

export default function auth(state = INITIAL_STATE, action) {
  // action.type => the name of the action
  // action.payload => all the data

  switch (action.type) {
    case 'SIGN_IN_REQUEST':
      return produce(state, draft => {
        draft.loading = true
      })

    case 'SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token
        draft.signed = true
        draft.loading = false
      })

    case 'SIGN_FAILURE':
      return produce(state, draft => {
        draft.loading = false
      })

    case 'SIGN_OUT':
      return produce(state, draft => {
        draft.token = null
        draft.signed = false
      })

    default:
      return state
  }
}