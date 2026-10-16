/* Configurações mantidas do componente original. */
const config = {
  whatsapp: '', // SUBSTITUIR ESTA INFORMAÇÃO: [WHATSAPP OFICIAL]
  instagram: '', // SUBSTITUIR ESTA INFORMAÇÃO: [INSTAGRAM OFICIAL]
  address: '[ENDEREÇO COMPLETO]',
  maps: '', // SUBSTITUIR ESTA INFORMAÇÃO: [LINK GOOGLE MAPS]
};

const getFocusable = (container) =>
  container.querySelector('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');

document.addEventListener('DOMContentLoaded', () => {
  window.lucide?.createIcons();

  const header = document.querySelector('#site-header');
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 30);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const menuToggle = document.querySelector('#menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  const closeMenu = () => {
    navigation?.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = navigation?.classList.toggle('nav-open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('[data-close-menu]').forEach((link) => link.addEventListener('click', closeMenu));

  const lightbox = document.querySelector('#lightbox');
  const lightboxImage = document.querySelector('#lightbox-image');
  const galleryItems = [...document.querySelectorAll('[data-lightbox-src]')];
  let galleryIndex = 0;
  let lastTrigger = null;

  const syncScrollLock = () => {
    const aModalIsOpen = !lightbox?.hidden || !notice?.hidden;
    document.body.style.overflow = aModalIsOpen ? 'hidden' : '';
  };
  const showGalleryImage = (nextIndex) => {
    galleryIndex = (nextIndex + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    lightboxImage.src = item.dataset.lightboxSrc;
    lightboxImage.alt = item.dataset.lightboxAlt;
  };
  const openLightbox = (index, trigger) => {
    lastTrigger = trigger;
    showGalleryImage(index);
    lightbox.hidden = false;
    syncScrollLock();
    getFocusable(lightbox)?.focus();
  };
  const closeLightbox = () => {
    lightbox.hidden = true;
    syncScrollLock();
    lastTrigger?.focus();
  };

  galleryItems.forEach((item, index) => item.addEventListener('click', () => openLightbox(index, item)));
  document.querySelector('[data-close-lightbox]')?.addEventListener('click', closeLightbox);
  document.querySelector('[data-lightbox-previous]')?.addEventListener('click', () => showGalleryImage(galleryIndex - 1));
  document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => showGalleryImage(galleryIndex + 1));
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  const notice = document.querySelector('#notice');
  const openNotice = (trigger) => {
    lastTrigger = trigger;
    notice.hidden = false;
    syncScrollLock();
    getFocusable(notice)?.focus();
  };
  const closeNotice = () => {
    notice.hidden = true;
    syncScrollLock();
    lastTrigger?.focus();
  };

  document.querySelectorAll('[data-open-notice]').forEach((button) => {
    button.addEventListener('click', () => openNotice(button));
  });
  document.querySelectorAll('[data-close-notice]').forEach((button) => {
    button.addEventListener('click', closeNotice);
  });
  notice?.addEventListener('click', (event) => {
    if (event.target === notice) closeNotice();
  });

  document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    openNotice(event.currentTarget);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (!lightbox.hidden) closeLightbox();
      else if (!notice.hidden) closeNotice();
    }
    if (!lightbox.hidden && event.key === 'ArrowLeft') showGalleryImage(galleryIndex - 1);
    if (!lightbox.hidden && event.key === 'ArrowRight') showGalleryImage(galleryIndex + 1);
  });
});
