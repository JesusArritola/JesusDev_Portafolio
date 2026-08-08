'use client';

import Image from 'next/image';

const contactLinks = [
  {
    href: 'https://wa.me/+5356686432',
    label: 'WhatsApp',
    src: '/whatsapp-icon.png',
  },
  {
    href: 'https://t.me/Jesusarritola',
    label: 'Telegram',
    src: '/telegram-icon.png',
  },
  {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jesusarritola@gmail.com',
    label: 'Correo electrónico',
    src: '/mail-icon.png',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="flex min-h-screen items-center scroll-mt-20 bg-[#080808] px-9 py-20">
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="text-center text-4xl font-bold">Contacto</h2>
        <p className="mt-4 text-center text-xl font-bold text-[#00f7ff]">
          Comencemos a Trabajar. ¡Contáctame!
        </p>

        <div className="mt-14 flex justify-center gap-10" aria-label="Canales de contacto">
          {contactLinks.map(({ href, label, src }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="size-20 transform transition hover:scale-125"
              aria-label={label}
            >
              <Image
                src={src}
                alt={label}
                width={80}
                height={80}
                className="size-full"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
