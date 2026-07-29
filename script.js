const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
});

const typed = new Typed('.multiple-text', {
    strings: ['Automatización con IA', 'Desarrollo de Agentes', 'Creación de Sistemas', 'Lead Generation'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.navbar a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.navbar a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});