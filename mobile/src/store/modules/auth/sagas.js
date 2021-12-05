import { Alert } from 'react-native'
import { all, takeLatest, call, put } from 'redux-saga/effects'

import api from '~/services/api'

import { signInSuccess, signFailure } from './actions'

export function* signIn({ payload }) {
  try {
    const { email, password } = payload
    const response = yield call(api.post, '/sessions', { email, password })
    console.log('response', response)

    const { token, user } = response.data

    if (user.provider) {
      Alert.alert('Erro no login!', 'Usuário não pode ser prestador de serviço.')
      return
    }

    // setting the token in the header
    api.defaults.headers.Authorization = `Bearer ${token}`
    yield put(signInSuccess(token, user))

    //history.push('/dashboard')

  } catch (err) {
    //toast.error('Falha na autenticação, verifique seus dados.')
    console.log(err)
    Alert.alert('Falha na autenticação!', 'Por favor, verifique seus dados.')
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload
    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: false
    })
    //history.push('/')
  } catch (err) {
    //toast.error('Falha no cadastro, verifique seus dados.')
    Alert.alert('Falha no cadastro!', 'Por favor, verifique seus dados.')
    yield put(signFailure())
  }
}

export function setToken({ payload }) {
  if (payload) {
    const { token } = payload.auth
    if (token) {
      // setting the token in the header when page is refreshed
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
  }
}

export function signOut() {
  //history.push('/')
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('SIGN_IN_REQUEST', signIn),
  takeLatest('SIGN_UP_REQUEST', signUp),
  takeLatest('SIGN_OUT', signOut),
])