import React, { useEffect, useState, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md'
import { parseISO, formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt';

import { Container, Badge, Notification, NotificationList, Scroll } from './styles';

import api from '~/services/api'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [visible, setVisible] = useState(false)

  const hasUnread = useMemo(() => 
    !!notifications.find(notification => notification.read === false),
    [notifications]
  )

  useEffect(() => {
    async function getNotifications() {
      const response = await api.get('/notifications')
      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          {
            addSuffix : true, locale: pt
          }
        )
      }))
      setNotifications(data)
    }
    getNotifications()
  }, [])

  function handleToggleNotification() {
    setVisible(!visible)
  }

  async function handleMarkAsRead(id) {
    await api.put(`/notifications/${id}`)

    setNotifications(
      notifications.map(notification => 
        notification._id === id ? { ...notification, read: true } : notification
      )
    )
  }

  return (
    <Container>
      <Badge hasUnread={hasUnread} onClick={handleToggleNotification}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>

              {/* formatDistance put 'aproximadamente' but 'aprox' is better */}
              <time>{notification.timeDistance.replace('aproximadamente', 'aprox.')}</time>

              {!notification.read && (
                <button
                  type="button"
                  onClick={() => {handleMarkAsRead(notification._id)}}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
