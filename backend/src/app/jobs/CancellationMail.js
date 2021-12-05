const Mail = require('../../lib/Mail')
const { format, parseISO } = require('date-fns')
const pt = require('date-fns/locale/pt')

class CancellationMail {
  get key() {
    return 'CancellationMail'
  }

  async handle({ data }) {
    const { appointment }  = data

    console.log('A fila executou')

    await Mail.sendMail({
      to : `${appointment.provider.name} <${appointment.provider.email}>`,
      subject : 'Serviço cancelado',
      template : 'cancellation',
      context : {
        provider : appointment.provider.name,
        user : appointment.user.name,
        date : format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale : pt }
        )
      }
    })
    console.log('Email enviado')

  }
}


module.exports = new CancellationMail()