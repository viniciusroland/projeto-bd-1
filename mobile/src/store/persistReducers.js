import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer } from 'redux-persist'
export default reducers => {
  const persistedReducer = persistReducer({
    key: 'gobarber',
    storage: AsyncStorage,
    whiteList: ['auth', 'user']

  }, reducers)
  return persistedReducer
}
