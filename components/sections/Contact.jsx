'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error
  const [validationErrors, setValidationErrors] = useState({});
  const formRef = useRef(null);
  const successTimeoutRef = useRef(null);

  // Validación en el cliente
  function validateForm(data) {
    const errors = {};
    
    // Validar nombre
    if (!data.name || data.name.trim().length === 0) {
      errors.name = 'El nombre es requerido';
    } else if (data.name.length > 100) {
      errors.name = 'El nombre no puede exceder 100 caracteres';
    }

    // Validar email
    if (!data.email || data.email.trim().length === 0) {
      errors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'El email no es válido';
    } else if (data.email === 'jesusarritola@gmail.com') {
      errors.email = 'No puedes usar la dirección del destinatario';
    }

    // Validar asunto
    if (!data.subject || data.subject.trim().length === 0) {
      errors.subject = 'El asunto es requerido';
    } else if (data.subject.length > 200) {
      errors.subject = 'El asunto no puede exceder 200 caracteres';
    }

    // Validar mensaje
    if (!data.message || data.message.trim().length === 0) {
      errors.message = 'El mensaje es requerido';
    } else if (data.message.length > 5000) {
      errors.message = 'El mensaje no puede exceder 5000 caracteres';
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setFormStatus('sending');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Validar en el cliente
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setFormStatus('idle');
      return;
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setFormStatus('success');
        setValidationErrors({});
        e.target.reset();
        
        // Cambiar estado después de 5 segundos
        if (successTimeoutRef.current) {
          clearTimeout(successTimeoutRef.current);
        }
        successTimeoutRef.current = setTimeout(() => {
          setFormStatus('idle');
        }, 5000);
      } else {
        setFormStatus('error');
        setValidationErrors({ submit: result.error || 'Error al enviar' });
      }
    } catch (error) {
      setFormStatus('error');
      setValidationErrors({ submit: 'Error de conexión. Intenta de nuevo.' });
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#080808] px-9 py-20 flex items-center scroll-mt-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center">Contacto</h2>
        <p className="text-xl text-[#00f7ff] mt-4 text-center font-bold">
          Comencemos a Trabajar 🚀! Contáctame !
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto space-y-6">
          {formStatus === 'success' && (
            <div className="p-4 bg-green-900/20 border border-green-500 rounded-xl">
              <p className="text-green-400 text-center text-lg font-semibold">
                ✓ Gracias por contactarme, recibirá una respuesta lo antes posible.
              </p>
            </div>
          )}
          {formStatus === 'error' && validationErrors.submit && (
            <div className="p-4 bg-red-900/20 border border-red-500 rounded-xl">
              <p className="text-red-400 text-center">{validationErrors.submit}</p>
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="name" className="block text-white">Nombre</label>
              <span className="text-white/50 text-xs">máx 100 caracteres</span>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              maxLength="100"
              required
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition ${
                validationErrors.name
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.name && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="email" className="block text-white">Correo</label>
              <span className="text-white/50 text-xs">máx 254 caracteres</span>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
              autoComplete="email"
              maxLength="254"
              required
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition ${
                validationErrors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.email && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="subject" className="block text-white">Asunto</label>
              <span className="text-white/50 text-xs">máx 200 caracteres</span>
            </div>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Escribe el asunto"
              autoComplete="off"
              maxLength="200"
              required
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition ${
                validationErrors.subject
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.subject && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.subject}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="message" className="block text-white">Cuerpo</label>
              <span className="text-white/50 text-xs">máx 5000 caracteres</span>
            </div>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe aquí el cuerpo ..."
              rows={5}
              autoComplete="off"
              maxLength="5000"
              required
              className={`w-full px-4 py-3 bg-[#101010] border rounded-xl text-white placeholder-white/50 focus:outline-none transition resize-none ${
                validationErrors.message
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#00f7ff]/20 focus:border-[#00f7ff]'
              }`}
            />
            {validationErrors.message && (
              <p className="text-red-400 text-sm mt-1">{validationErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formStatus === 'sending'}
            aria-label="Enviar mensaje"
            className="w-full px-6 py-4 bg-[#00f7ff] text-black font-semibold rounded-xl hover:scale-105 transition min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formStatus === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>

        <div className="mt-12 flex justify-center gap-6">
          <a
            href="https://wa.me/+5356686432"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-125 transition transform"
            aria-label="WhatsApp"
          >
            <Image src="/whatsapp-icon.png" alt="WhatsApp" width={40} height={40} className="w-full h-full" loading="lazy" />
          </a>
          <a
            href="https://t.me/Jesusarritola"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-125 transition transform"
            aria-label="Telegram"
          >
            <Image src="/telegram-icon.png" alt="Telegram" width={40} height={40} className="w-full h-full" loading="lazy" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jesusarritola@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 hover:scale-125 transition transform"
            aria-label="Email"
          >
            <Image src="/mail-icon.png" alt="Email" width={40} height={40} className="w-full h-full" loading="lazy" />
          </a>
        </div>
      </div>
    </section>
  );
}
