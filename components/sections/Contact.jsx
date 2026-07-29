'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setFormStatus('success');
        if (result.devData) {
          console.log('=== EMAIL ENVIADO ===');
          console.log('De:', result.devData.email);
          console.log('Nombre:', result.devData.name);
          console.log('Asunto:', `${result.devData.name} - ${result.devData.subject}`);
          console.log('Mensaje:', result.devData.message);
        }
        e.target.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-[#080808] px-9 py-20 flex items-center scroll-mt-20">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center">Contacto</h2>
        <p className="text-xl text-[#00f7ff] mt-4 text-center font-bold">
          Comencemos a Trabajar 🚀! Contáctame !
        </p>

        <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto space-y-6">
          {formStatus === 'success' && (
            <p className="text-green-400 text-center text-lg font-semibold">
              Gracias por contactarme, recibirá una respuesta lo antes posible.
            </p>
          )}
          {formStatus === 'error' && (
            <p className="text-red-400 text-center">Error al enviar. Intenta de nuevo.</p>
          )}

          <div>
            <label htmlFor="name" className="block text-white mb-2">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              required
              className="w-full px-4 py-3 bg-[#101010] border border-[#00f7ff]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#00f7ff]"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white mb-2">Correo</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@gmail.com"
              autoComplete="email"
              required
              className="w-full px-4 py-3 bg-[#101010] border border-[#00f7ff]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#00f7ff]"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-white mb-2">Asunto</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Escribe el asunto"
              autoComplete="off"
              required
              className="w-full px-4 py-3 bg-[#101010] border border-[#00f7ff]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#00f7ff]"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white mb-2">Cuerpo</label>
            <textarea
              id="message"
              name="message"
              placeholder="Escribe aquí el cuerpo ..."
              rows={5}
              autoComplete="off"
              required
              className="w-full px-4 py-3 bg-[#101010] border border-[#00f7ff]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#00f7ff]"
            />
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