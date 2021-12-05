import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Image } from 'react-native';

import logo from '~/assets/logo.png'

import Background from '~/components/Background'
import { Container, Form, FormInput, SubmitButton, SignLink, SignLinkText } from './styles'

import { signUpRequest } from '~/store/modules/auth/actions'

export default function SignUp({ navigation }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()

  const dispatch = useDispatch()
  function handleSubmit() {
    dispatch(signUpRequest(name, email, password))
  }
  return (
    <Background>
      <Container>

        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => {emailRef.current.focus()}}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu melhor email"
            ref={emailRef}
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

          <SubmitButton onPress={handleSubmit}>
            Acessar
          </SubmitButton>
        </Form>
        <SignLink onPress={() => {navigation.navigate('SignIn')}}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

