import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'react-native';

import logo from '~/assets/logo.png'

import Background from '~/components/Background'
import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles'

import { signInRequest } from '~/store/modules/auth/actions'

import api from '~/services/api'

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordRef = useRef()
  
  //async function testApi() {
  //  try {
  //    const response = await api.post('/sessions', { email, password })
  //    console.log(response.data)
  //  } catch (err) {
  //    console.log(err)
  //  }
  //}

  const loading = useSelector(state => state.auth.loading)

  const dispatch = useDispatch()
  function handleSubmit() {
    console.log(email, password)
    dispatch(signInRequest(email, password))
  }

  return (
    <Background>
      <Container>

        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu melhor email"
            returnKeyType="next"
            onSubmitEditing={() => {passwordRef.current.focus()}}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setPassword}
          />

          <SubmitButton onPress={handleSubmit} loading={loading}>
            Acessar
          </SubmitButton>
        </Form>
        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
