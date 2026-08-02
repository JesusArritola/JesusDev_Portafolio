import nodemailer from 'nodemailer'

// Configuración de seguridad
const RECIPIENT_EMAIL = 'jesusarritola@gmail.com'
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_SUBJECT_LENGTH = 200
const MAX_MESSAGE_LENGTH = 5000
const RATE_LIMIT_WINDOW = 60000 // 1 minuto en milisegundos
const RATE_LIMIT_MAX_REQUESTS = 5

// In-memory rate limiting (en producción usar Redis)
const requestCache = new Map()

// Función para validar email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= MAX_EMAIL_LENGTH
}

// Función para sanitizar strings
function sanitizeString(str, maxLength) {
  if (typeof str !== 'string') return ''
  
  // Remover caracteres de control y espacios en blanco excesivos
  let sanitized = str
    .replace(/[\x00-\x1F\x7F]/g, '') // Remover caracteres de control
    .trim()
  
  // Limitar longitud
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }
  
  return sanitized
}

// Función para rate limiting
function checkRateLimit(ip) {
  const now = Date.now()
  const userRequests = requestCache.get(ip) || []
  
  // Limpiar requests antiguos
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW)
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  recentRequests.push(now)
  requestCache.set(ip, recentRequests)
  return true
}

export default async function handler(req, res) {
  // Agregar headers de seguridad
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')

  // Validar método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  // Rate limiting por IP
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ 
      error: 'Demasiadas solicitudes. Intenta de nuevo en un momento.' 
    })
  }

  const { name, email, subject, message } = req.body

  // Validación: campos requeridos
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' })
  }

  // Sanitización de datos
  const sanitizedName = sanitizeString(name, MAX_NAME_LENGTH)
  const sanitizedEmail = sanitizeString(email, MAX_EMAIL_LENGTH).toLowerCase()
  const sanitizedSubject = sanitizeString(subject, MAX_SUBJECT_LENGTH)
  const sanitizedMessage = sanitizeString(message, MAX_MESSAGE_LENGTH)

  // Validación: campos no vacíos después de sanitizar
  if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
    return res.status(400).json({ error: 'Los campos no pueden estar vacíos' })
  }

  // Validación: formato de email
  if (!isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ error: 'Email inválido' })
  }

  // Validación: no permitir enviar emails a direcciones de gmail del enviante
  if (sanitizedEmail === RECIPIENT_EMAIL) {
    return res.status(400).json({ error: 'No puedes usar la dirección del destinatario' })
  }

  const mailOptions = {
    from: `"${sanitizedName}" <${process.env.EMAIL_USER}>`,
    replyTo: sanitizedEmail,
    to: RECIPIENT_EMAIL,
    subject: `${sanitizedName} - ${sanitizedSubject}`,
    text: sanitizedMessage,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>De:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Asunto:</strong> ${sanitizedSubject}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      </div>
    `
  }

  try {
    // Validar credenciales
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[SECURITY] Credenciales de email no configuradas')
      return res.status(500).json({ 
        error: 'El servidor no está configurado correctamente' 
      })
    }

    // Crear transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      secure: true,
      requireTLS: true
    })

    // Enviar email
    const info = await transporter.sendMail(mailOptions)

    // Log de seguridad (sin exponer información sensible)
    console.log('[SECURITY] Email enviado exitosamente')
    console.log(`[CONTACT] Nombre: ${sanitizedName} | Email: ${sanitizedEmail}`)

    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado correctamente'
    })
  } catch (error) {
    console.error('[ERROR] Fallo al enviar email:', error.message)
    
    // No revelar detalles del error al cliente
    return res.status(500).json({ 
      error: 'Hubo un error al enviar el email. Por favor intenta de nuevo.' 
    })
  }
}
