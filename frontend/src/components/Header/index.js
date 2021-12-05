import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Notifications from '~/components/Notifications'
import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-purple.svg'

export default function Header() {
  const { profile } = useSelector(state => state.user)
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber"/>
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img src={profile.avatar.url || 'https://www.flynz.co.nz/wp-content/uploads/profile-placeholder.png'} alt="Profile"/>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
