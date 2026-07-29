'use client';

import { useTypingAnimation } from '@/hooks/usePortfolio';
import Image from 'next/image';

const phrases = [
  'Automatización de procesos = Crecimiento escalable',
  'Python + Lógica = Soluciones Robustas',
  'Webs modernas = Clientes que vuelven',
];

export default function Hero() {
  const text = useTypingAnimation(phrases);

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-40 px-4 md:px-9 pt-24 md:pt-20 scroll-mt-20">
      <div className="max-w-[500px] text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-bold">¡Hola!, soy</h3>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
          Jesús Miguel{' '}
          <span className="text-[#00f7ff] animate-pulse drop-shadow-[0_0_10px_#00f7ff]">
            Arritola
          </span>
        </h1>
        <h2 className="text-lg md:text-2xl mt-4 min-h-[36px] text-[#00f7ff]">
          {text}
          <span className="text-white animate-pulse font-bold text-xl md:text-2xl">|</span>
        </h2>
        <p className="mt-4 md:mt-6 leading-relaxed text-white/70 text-sm md:text-base">
          Apasionado por la automatización, inteligencia artificial, creación de
          soluciones digitales y el desarrollo de software
          <br />
          <span className="text-[#00f7ff]">
            Estrategia con Inteligencia - Resultados con Precisión.
          </span>
        </p>
        <div className="flex justify-center md:justify-start gap-4 mt-6">
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
        <a
          href="#contact"
          className="inline-block mt-6 md:mt-8 px-6 py-3 bg-[#00f7ff] text-black font-semibold rounded-full shadow-[0_0_10px_#00f7ff] hover:shadow-none hover:scale-105 transition"
        >
          Contáctame
        </a>
      </div>
      <div className="relative">
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden border-2 border-[#00f7ff] animate-prominent-pulse">
          <Image
            src="/Landing_image.png"
            alt="Jesús Arritola"
            width={400}
            height={400}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}