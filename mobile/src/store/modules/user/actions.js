export function updateProfileRequest(data) {
  return {
    type : 'UPDATE_PROFILE_REQUEST',
    payload : { data }
  }
}

export function updateProfileSuccess(profile) {
  return {
    type : 'UPDATE_PROFILE_SUCCESS',
    payload : { profile }
  }
}

export function updateProfileFailure() {
  return {
    type : 'UPDATE_PROFILE_FAILURE',
  }
}
