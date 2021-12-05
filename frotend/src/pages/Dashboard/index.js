import React, { useEffect, useMemo, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

import { format, addDays, subDays, isBefore, setHours, setMinutes, setSeconds, parseISO, isSameHour } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import pt from 'date-fns/locale/pt'

import { Container, ScheduleList, ScheduleItem } from './styles'

import api from '~/services/api'

const range = [
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
]

export default function Dashboard() {
  const [date, setDate] = useState(new Date())
  const [scheduleList, setScheduleList] = useState([])

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale : pt }),
    [date]
  )

  useEffect(() => {
    async function getAppointments() {
      const response = await api.get('/schedule', {
        params : { date }
      })
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const data = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0)
        const compareDate = utcToZonedTime(checkDate, timezone)

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a => 
            isSameHour(parseISO(a.date), compareDate)
          )
        }
      })
      setScheduleList(data)
    }
    getAppointments()
  }, [date])

  function handlePrevDay() {
    setDate(subDays(date, 1))
  }
  function handleNextDay() {
    setDate(addDays(date, 1))
  }
  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={40} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay} >
          <MdChevronRight size={40} color="#fff" />
        </button>
      </header>

      <ScheduleList>
        {scheduleList.map(item => (
          <ScheduleItem
            key={item.time}
            available={!item.appointment}
            past={item.past}
          >
            <strong>{item.time}</strong>
            <span>{item.appointment ? item.appointment.user.name : 'Em aberto'}</span>
          </ScheduleItem>
        ))}
      </ScheduleList>
    </Container>
  );
}
