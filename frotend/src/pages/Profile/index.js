import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from '@rocketseat/unform'

import { Container } from './styles';
import AvatarInput from './AvatarInput'

import { updateProfileRequest } from '~/store/modules/user/actions'
import { signOut } from '~/store/modules/auth/actions'

export default function Profile() {
  const { profile } = useSelector(state => state.user)

  const dispatch = useDispatch()
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data))
  }

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo"/>
        <Input name="email" type="email" placeholder="Seu email"/>

        <hr />
        <Input name="oldPassword" type="password" placeholder="Sua senha atual"/>

        <Input name="password" type="password" placeholder="Nova senha"/>
        <Input name="confirmPassword" type="password" placeholder="Confirmação da nova senha"/>

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>Sair do GoBarber</button>
    </Container>
  );
}
