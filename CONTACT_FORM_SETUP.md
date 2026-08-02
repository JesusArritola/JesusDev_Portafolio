# Configuración del Formulario de Contacto

## Descripción General
El formulario de contacto está completamente configurado con medidas de seguridad profesionales:
- ✅ Validación de entrada en cliente y servidor
- ✅ Sanitización contra inyecciones
- ✅ Rate limiting (máximo 5 solicitudes por minuto por IP)
- ✅ Límites de caracteres
- ✅ Validación de email
- ✅ Headers de seguridad HTTP
- ✅ Manejo seguro de errores
- ✅ Logs de auditoría

## Configuración Requerida

### Paso 1: Obtener Credenciales de Gmail

**IMPORTANTE:** Debes usar una **Contraseña de Aplicación**, NO tu contraseña de Gmail normal.

1. Ve a: https://myaccount.google.com/apppasswords
2. Selecciona:
   - Dispositivo: Selecciona "Windows Computer" (o tu dispositivo)
   - Aplicación: Selecciona "Mail"
3. Google generará una contraseña de 16 caracteres
4. Copia esa contraseña

### Paso 2: Configurar Variables de Entorno

En tu proyecto Vercel (Settings → Environment Variables), añade:

```
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion_de_16_caracteres
```

Ejemplo:
```
EMAIL_USER=jesus@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

## Funcionalidades del Formulario

### Campo de Nombre
- Máximo: 100 caracteres
- Será mostrado como remitente en el email
- Validación: requerido, no puede estar vacío

### Campo de Email
- Máximo: 254 caracteres
- Es el email del contactante que enviará el mensaje
- Validación: formato válido de email
- Se usa como "Reply-To" para responder fácilmente

### Campo de Asunto
- Máximo: 200 caracteres
- Será el asunto del email que recibas
- Validación: requerido, no puede estar vacío

### Campo de Mensaje
- Máximo: 5000 caracteres
- Será el cuerpo del email
- Validación: requerido, no puede estar vacío

## Medidas de Seguridad Implementadas

### 1. Validación de Entrada
- Cliente: validación inmediata con feedback visual
- Servidor: validación redundante de seguridad
- Sanitización: eliminación de caracteres de control
- Límites: máximo de caracteres por campo

### 2. Rate Limiting
- Máximo 5 solicitudes por IP por minuto
- Previene abuso y ataques automatizados
- Errores claros si se excede el límite

### 3. Validación de Email
- Formato RFC básico validado
- Validación de dominio
- Prevención de inyección de datos

### 4. Headers de Seguridad
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### 5. Manejo de Errores
- Errores genéricos al usuario (sin exponer detalles)
- Logs internos detallados para debugging
- Sin revelar información sensible

### 6. Transporte Seguro
- TLS requerido
- Conexión segura a Gmail
- Sin exponer contraseñas en logs

## Flujo del Formulario

1. **Usuario completa el formulario**
   - Validación en tiempo real del cliente

2. **Usuario envía (click en "Enviar mensaje")**
   - Validación en cliente
   - Estado: "Enviando..."
   - Deshabilitación de botón

3. **Servidor recibe solicitud**
   - Verificación de rate limit
   - Validación redundante
   - Sanitización de datos
   - Validación de credenciales

4. **Envío de Email**
   - Conexión segura a Gmail
   - Email formateado en HTML
   - Reply-To configurado correctamente

5. **Respuesta al usuario**
   - Mensaje de éxito en verde
   - Desaparición del mensaje después de 5 segundos
   - Limpieza del formulario

## Pruebas

### Prueba Local
```bash
npm run dev
```

Luego ve a: http://localhost:3000#contact

### Prueba en Producción
Después de desplegar en Vercel:
1. Asegúrate de que EMAIL_USER y EMAIL_PASS estén configuradas
2. Accede a tu portfolio
3. Completa el formulario
4. Verifica que recibas el email en jesusarritola@gmail.com

## Troubleshooting

### No recibo emails
- ✅ Verifica que EMAIL_USER y EMAIL_PASS estén configuradas en Vercel
- ✅ Verifica que estés usando una Contraseña de Aplicación (no la contraseña normal)
- ✅ Revisa los logs de tu deployment en Vercel
- ✅ Comprueba que Gmail no haya marcado como spam

### Recibo errores de validación
- ✅ Verifica los límites de caracteres indicados arriba
- ✅ Verifica que el email tenga formato válido
- ✅ Asegúrate de que ningún campo esté vacío

### "Demasiadas solicitudes"
- ✅ Espera 1 minuto antes de intentar de nuevo
- ✅ Rate limit: 5 solicitudes por minuto por IP

## Ejemplo de Email Recibido

```
De: "Juan Pérez" <tu@gmail.com>
Para: jesusarritola@gmail.com
Asunto: Juan Pérez - Solicitud de Colaboración

Nuevo mensaje de contacto

De: Juan Pérez
Email: juan@example.com
Asunto: Solicitud de Colaboración

Mensaje:
Hola Jesus, me gustaría colaborar en un proyecto...
```

## Soporte

Si necesitas ayuda:
1. Verifica esta documentación
2. Revisa los logs en Vercel
3. Comprueba que las variables de entorno estén configuradas
