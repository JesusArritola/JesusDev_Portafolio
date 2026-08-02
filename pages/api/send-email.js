import nodemailer from 'nodemailer'

// ============ FUNCIONES DE VALIDACIÓN Y SEGURIDAD ============

/**
 * Valida que un email tenga formato correcto
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return typeof email === 'string' && emailRegex.test(email) && email.length <= 254
}

/**
 * Sanitiza strings para prevenir inyecciones
 */
function sanitizeString(str, maxLength = 500) {
  if (typeof str !== 'string') return ''
  
  // Elimina caracteres de control y espacios en blanco peligrosos
  let sanitized = str.replace(/[\x00-\x1F\x7F]/g, '')
  
  // Trunca a longitud máxima
  sanitized = sanitized.substring(0, maxLength).trim()
  
  return sanitized
}

/**
 * Rate limiting simple en memoria (para producción usar Redis)
 */
const requestLog = new Map()

function isRateLimited(identifier, maxRequests = 3, windowMs = 3600000) {
  const now = Date.now()
  const key = `${identifier}:${Math.floor(now / windowMs)}`
  
  // Limpia logs antiguos
  for (const [k, timestamp] of requestLog.entries()) {
    if (now - timestamp > windowMs * 2) {
      requestLog.delete(k)
    }
  }
  
  const count = (requestLog.get(key) || 0) + 1
  
  if (count > maxRequests) {
    return true
  }
  
  requestLog.set(key, now)
  return false
}

// ============ MANEJADOR PRINCIPAL ============

export default async function handler(req, res) {
  // Validar método HTTP
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  // Agregar headers de seguridad
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')

  try {
    // Extraer y validar datos
    const { name, email, subject, message } = req.body

    // Validar presencia de campos
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos' 
      })
    }

    // Sanitizar inputs
    const sanitizedName = sanitizeString(name, 100)
    const sanitizedEmail = email.toLowerCase().trim()
    const sanitizedSubject = sanitizeString(subject, 200)
    const sanitizedMessage = sanitizeString(message, 5000)

    // Validar que los campos no estén vacíos después de sanitizar
    if (!sanitizedName || !sanitizedSubject || !sanitizedMessage) {
      return res.status(400).json({ 
        error: 'Los campos no pueden estar vacíos' 
      })
    }

    // Validar formato de email
    if (!isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ 
        error: 'El correo electrónico no es válido' 
      })
    }

    // Rate limiting por IP
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
    if (isRateLimited(clientIP, 3, 3600000)) {
      console.warn(`[RATE LIMIT] IP ${clientIP} excedió límite de solicitudes`)
      return res.status(429).json({ 
        error: 'Demasiadas solicitudes. Intenta más tarde.' 
      })
    }

    // Validar credenciales de email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('[ERROR] Variables de entorno EMAIL_USER o EMAIL_PASS no configuradas')
      return res.status(500).json({ 
        error: 'Error de configuración del servidor' 
      })
    }

    // Configurar transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Preparar opciones del email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Usar el email configurado como remitente
      replyTo: sanitizedEmail, // Responder al correo del contacto
      to: 'jesusarritola@gmail.com',
      subject: `[CONTACTO] ${sanitizedName} - ${sanitizedSubject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00f7ff;">Nuevo mensaje de contacto</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${sanitizedName}</p>
            <p><strong>Correo:</strong> <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></p>
            <p><strong>Asunto:</strong> ${sanitizedSubject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            <h3>Mensaje:</h3>
            <p style="white-space: pre-wrap; word-wrap: break-word;">${sanitizedMessage}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Responder a este mensaje: <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
          </p>
        </div>
      `,
      text: `
Nombre: ${sanitizedName}
Correo: ${sanitizedEmail}
Asunto: ${sanitizedSubject}

Mensaje:
${sanitizedMessage}

---
Responder a: ${sanitizedEmail}
      `
    }

    // Enviar email
    await transporter.sendMail(mailOptions)

    // Log seguro (sin exponer contraseñas)
    console.log('[EMAIL ENVIADO] Contacto de:', sanitizedEmail)
    console.log('[EMAIL INFO] Asunto:', sanitizedSubject)

    return res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente'
    })

  } catch (error) {
    // Log de error sin exponer detalles sensibles
    console.error('[ERROR EN SEND-EMAIL]', error.message)
    
    return res.status(500).json({ 
      error: 'Error al enviar el mensaje. Intenta más tarde.' 
    })
  }
}
