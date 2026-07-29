import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const mailOptions = {
    from: `"${name}" <${email}>`,
    replyTo: email,
    to: 'jesusarritola@gmail.com',
    subject: `${name} - ${subject}`,
    text: message
  }

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })
      await transporter.sendMail(mailOptions)
    }
    
    console.log('=== EMAIL (DESARROLLO) ===')
    console.log('De:', email)
    console.log('Asunto:', `${name} - ${subject}`)
    console.log('Mensaje:', message)
    console.log('============================')
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email logged to console',
      devData: { name, email, subject, message }
    })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}