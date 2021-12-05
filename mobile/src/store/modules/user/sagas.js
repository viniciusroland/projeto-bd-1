import { Alert } from 'react-native'
import { all, takeLatest, call, put } from 'redux-saga/effects'

import { updateProfileSuccess, updateProfileFailure } from './actions'

import api from '~/services/api'

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data

    const profile = Object.assign(
      { name, email },
      rest.oldPassword ? rest : {}
    )

    const response = yield call(api.put, '/users', profile)

    //toast.success('Perfil atualizado com sucesso!')
    Alert.alert('Perfil atualizado com sucesso!')
    yield put(updateProfileSuccess(response.data))

  } catch (err) {
    //toast.error('Erro ao atualizar perfil, verifique seus dados.')
    Alert.alert('Erro na atualização!', 'Por favor, verifique seus dados.')
    yield put(updateProfileFailure())

  }

}

export default all([
  takeLatest('UPDATE_PROFILE_REQUEST', updateProfile)
])