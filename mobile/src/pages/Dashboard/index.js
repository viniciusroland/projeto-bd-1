import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '~/services/api'

import Background from '~/components/Background'
import Appointment from '~/components/Appointment'

import { Container, Title, List } from './styles'

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([])

  async function getAppointments() {
    const response = await api.get('/appointments')
    setAppointments(response.data)
  }

  useEffect(() => {
    if (isFocused) {
      getAppointments()
    }
  }, [isFocused])

  async function handleCancel(id) {
    const response = await api.delete(`/appointments/${id}`)

    const updatedAppointmets = appointments.map(apt => 
      apt.id === id ? {
        ...apt,
        canceled_at : response.data.canceled_at
      } : apt
    )
    setAppointments(updatedAppointmets)
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={ ({ item }) => (
            <Appointment data={item} onCancel={() => {handleCancel(item.id)}} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => <Icon name="event" size={20} color={tintColor} />
}

export default withNavigationFocus(Dashboard)