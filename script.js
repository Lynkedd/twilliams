const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('navLinks');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

if (quoteForm) {
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = quoteForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton
      ? submitButton.textContent
      : 'Request My Free Estimate';

    if (formStatus) {
      formStatus.textContent = 'Sending your estimate request...';
      formStatus.classList.remove('success', 'error');
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const formData = new FormData(quoteForm);

      const response = await fetch(quoteForm.action, {
        method: quoteForm.method || 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Form submission failed.');
      }

      quoteForm.reset();

      if (formStatus) {
        formStatus.textContent =
          'Thank you! Your estimate request has been sent successfully. TWilliams will contact you soon.';
        formStatus.classList.add('success');
      }
    } catch (error) {
      console.error('Form submission error:', error);

      if (formStatus) {
        formStatus.textContent =
          'Your request could not be sent. Please try again or call TWilliams at (606) 309-0535.';
        formStatus.classList.add('error');
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}
