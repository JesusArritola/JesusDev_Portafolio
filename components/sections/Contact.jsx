import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-[#080808] px-9 py-20 flex items-center scroll-mt-20">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-4xl font-bold">Contacto</h2>
        <p className="text-xl text-[#00f7ff] mt-4 font-bold">
          Comencemos a Trabajar 🚀! Contáctame !
        </p>

        <div className="mt-12 flex justify-center gap-8">
          <a
            href="https://wa.me/+5356686432"
            target="_blank"
            rel="noopener noreferrer"
            className="size-14 hover:scale-125 transition-transform"
            aria-label="WhatsApp"
          >
            <Image src="/whatsapp-icon.png" alt="WhatsApp" width={56} height={56} className="size-full" />
          </a>
          <a
            href="https://t.me/Jesusarritola"
            target="_blank"
            rel="noopener noreferrer"
            className="size-14 hover:scale-125 transition-transform"
            aria-label="Telegram"
          >
            <Image src="/telegram-icon.png" alt="Telegram" width={56} height={56} className="size-full" />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=jesusarritola@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="size-14 hover:scale-125 transition-transform"
            aria-label="Email"
          >
            <Image src="/mail-icon.png" alt="Email" width={56} height={56} className="size-full" />
          </a>
        </div>
      </div>
    </section>
  );
}
