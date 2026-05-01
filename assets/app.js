/* ── Nav scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('transparent');
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.add('transparent');
  }
});

/* ── Modal ── */
function openModal(e) {
  if (e) e.preventDefault();
  document.getElementById('citaModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('citaModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('citaModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Redirige al WhatsApp al enviar ── */
function submitForm() {
  const nombre = document.querySelector('.modal-box input[type="text"]').value.trim();
  const tel    = document.querySelector('.modal-box input[type="tel"]').value.trim();
  const svc    = document.querySelector('.modal-box select').value;
  const msg    = document.querySelector('.modal-box textarea').value.trim();

  if (!nombre || !tel) { alert('Por favor completa nombre y teléfono.'); return; }

  const texto = encodeURIComponent(
    `Hola, me llamo *${nombre}* y quiero agendar una cita en Vitalis Pie.\n` +
    `📞 Teléfono: ${tel}\n` +
    `🦶 Servicio: ${svc || 'Sin especificar'}\n` +
    (msg ? `💬 Mensaje: ${msg}` : '')
  );
  window.open(`https://wa.me/593987149618?text=${texto}`, '_blank');
  closeModal();
}

/* ── Animate on scroll ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.svc-card, .nosotros-card, .espec-mini-card, .contacto-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
