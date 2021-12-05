import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native'
import Background from '~/components/Background'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

import api from '~/services/api'

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([])

  useEffect(() => {
    async function getProviders() {
      const response = await api.get('/providers')
      console.log(response.data)
      setProviders(response.data)
    }
    getProviders()
  }, [])

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item }) => (
            <Provider onPress={() => {navigation.navigate('SelectDate', { provider : item })}}>
              <Avatar source={{ uri : item.avatar ? item.avatar.url.replace('localhost', '192.168.0.12') : `https://api.adorable.io/50/${item.name}.png` }} />
              <Name>{item.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title : 'Selecione o prestador',
  headerLeft: () => (
    <TouchableOpacity onPress={() => {navigation.navigate('Dashboard')}}>
      <Icon name="chevron-left" size={30} color="#fff" />
    </TouchableOpacity>
  )
})
