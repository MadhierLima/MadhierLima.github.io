const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');
const links = document.querySelectorAll('.nav-list a');
const voltarTopo = document.querySelector('.voltar-topo');

function alterarMenu(aberto) {
  navList.classList.toggle('menu-aberto', aberto);
  menuBtn.setAttribute('aria-expanded', aberto);
}

menuBtn.addEventListener('click', () => {
  alterarMenu(!navList.classList.contains('menu-aberto'));
});

links.forEach((link) => link.addEventListener('click', () => alterarMenu(false)));

const observadorSecoes = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if(!entrada.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle('ativo', link.getAttribute('href') === `#${entrada.target.id}`);
      });
    });
  },
  { rootMargin: '-40% 0px -55% 0px'}
);

document.querySelectorAll('main section[id]').forEach((secao) => observadorSecoes.observe(secao));

window.addEventListener('scroll', () => {
  voltarTopo.classList.toggle('mostrar', window.scrollY > 400);
});

voltarTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('ano').textContent = new Date().getFullYear();