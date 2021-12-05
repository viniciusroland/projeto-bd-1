import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { Container, Title, Form, FormInput, SubmitButton, Separator, LogoutButton } from './styles';
import Background from '~/components/Background'

import { updateProfileRequest } from '~/store/modules/user/actions'
import { signOut } from '~/store/modules/auth/actions'

export default function Profile() {
  const { profile } = useSelector(state => state.user)

  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()
  const oldPasswordRef = useRef()
  const confirmPasswordRef = useRef()

  const dispatch = useDispatch()
  function handleSubmit() {
    dispatch(updateProfileRequest({
      name,
      email,
      oldPassword,
      password,
      confirmPassword
    }))
  }

  function handleLogout() {
    dispatch(signOut())
  }

  useEffect(() => {
    setPassword('')
    setOldPassword('')
    setConfirmPassword('')
  }, [profile])

  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>

        <Form>
          <FormInput
            icon="person-outline"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu nome"
            returnKeyType="next"
            onSubmitEditing={() => {emailRef.current.focus()}}
            onChangeText={setName}
            value={name}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu melhor email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => {oldPasswordRef.current.focus()}}
            onChangeText={setEmail}
            value={email}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="send"
            onSubmitEditing={() => {passwordRef.current.focus()}}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua nova senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={() => {confirmPasswordRef.current.focus()}}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação da nova senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>
            Atualizar
          </SubmitButton>
          <LogoutButton onPress={handleLogout}>
            Sair
          </LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel : 'Perfil',
  tabBarIcon : ({ tintColor }) => <Icon name="person" size={20} color={tintColor} />
}
