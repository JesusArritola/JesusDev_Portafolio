'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error
  const [formError, setFormError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Validación básica en cliente
  const validateForm = (data) => {
    const errors = {};

    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!data.email || !isValidEmail(data.email)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }

    if (!data.subject || data.subject.trim().length < 3) {
      errors.subject = 'El asunto debe tener al menos 3 caracteres';
    }

    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    return errors;
  };

  // Función para validar email
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setValidationErrors({});
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validar en cliente primero
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setFormStatus('sending');

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setFormStatus('success');
        setFormError('');
        e.target.reset();
        setValidationErrors({});
        
        // Auto-reset después de 5 segundos
        setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        setFormStatus('error');
        setFormError(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setFormStatus('error');
      setFormError('Error de conexión. Intenta de nuevo.');
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#080808] px-9 py-20 flex items-center scroll-mt-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center">Contacto</h2>
        <p className="text-xl text-[#00f7ff] mt-4 text-center font-bold">
          Comencemos a Trabajar 🚀 ¡Contáctame!
        </p>

        <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto space-y-6">
          {/* Mensaje de éxito */}
          {formStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500 rounded-xl p-4">
              <p className="text-green-400 text-center font-semibold">
                ✓ Mensaje enviado exitosamente. Recibirás una respuesta pronto.
              </p>
            </div>
          )}

          {/* Mensaje de error */}
          {formStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500 rounded-xl p-4">
              <p className="text-red-400 text-center font-semibold">
                ✗ {formError || 'Error al enviar el mensaje. Intenta de nuevo.'}
              </p>
            </div>
          )}

          {/* Campo Nombre */}
          <div>
            <label htmlFor="name" className="block text-white mb-2 font-semibold">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition ${
                validationErrors.name ? 'border-red-500 focus:border-red-500' : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.name && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          {/* Campo Correo */}
          <div>
            <label htmlFor="email" className="block text-white mb-2 font-semibold">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
              autoComplete="email"
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition ${
                validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.email && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          {/* Campo Asunto */}
          <div>
            <label htmlFor="subject" className="block text-white mb-2 font-semibold">Asunto</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Escribe el asunto"
              autoComplete="off"
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition ${
                validationErrors.subject ? 'border-red-500 focus:border-red-500' : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.subject && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.subject}</p>
            )}
          </div>

          {/* Campo Mensaje */}
          <div>
            <label htmlFor="message" className="block text-white mb-2 font-semibold">Mensaje</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe aquí tu mensaje..."
              rows={5}
              autoComplete="off"
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition resize-none ${
                validationErrors.message ? 'border-red-500 focus:border-red-500' : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.message && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.message}</p>
            )}
          </div>

          {/* Botón Enviar */}
          <button
            type="submit"
            disabled={formStatus === 'sending'}
            aria-label="Enviar mensaje"
            className="w-full px-6 py-4 bg-[#00f7ff] text-black font-semibold rounded-xl hover:scale-105 hover:bg-[#00d9dd] transition min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {formStatus === 'sending' ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Enviando...
              </span>
            ) : (
              'Enviar mensaje'
            )}
          </button>
        </form>

        {/* Enlaces de contacto adicionales */}
        <div className="mt-12 flex justify-center gap-6">
          <a
            href="https://wa.me/+5356686432"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-125 transition transform"
            aria-label="WhatsApp"
            title="Contáctame por WhatsApp"
          >
            <Image src="/whatsapp-icon.png" alt="WhatsApp" width={40} height={40} className="w-full h-full" loading="lazy" />
          </a>
          <a
            href="https://t.me/Jesusarritola"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-125 transition transform"
            aria-label="Telegram"
            title="Contáctame por Telegram"
          >
            <Image src="/telegram-icon.png" alt="Telegram" width={40} height={40} className="w-full h-full" loading="lazy" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jesusarritola@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-125 transition transform"
            aria-label="Email"
            title="Envía un correo"
          >
            <Image src="/mail-icon.png" alt="Email" width={40} height={40} className="w-full h-full" loading="lazy" />
          </a>
        </div>
      </div>
    </section>
  );
}
