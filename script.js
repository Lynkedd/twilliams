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
    const originalButtonText = submitButton ? submitButton.textContent : 'Request My Free Estimate';

    if (formStatus) {
      formStatus.textContent = 'Sending your estimate request...';
      formStatus.classList.remove('success', 'error');
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(quoteForm.action, {
        method: quoteForm.method || 'POST',
        body: new FormData(quoteForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        let message = 'Form submission failed.';
        try {
          const data = await response.json();
          if (data.errors && data.errors.length) {
            message = data.errors.map((error) => error.message).join(' ');
          }
        } catch (_) {
          // Keep the default error message when Formspree returns no JSON.
        }
        throw new Error(message);
      }

      quoteForm.reset();
      if (formStatus) {
        formStatus.textContent = 'Thank you! Your estimate request has been sent successfully. TWilliams will contact you soon.';
        formStatus.classList.add('success');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (formStatus) {
        formStatus.textContent = 'Your request could not be sent. Please try again or call TWilliams at (606) 309-0535.';
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
const attachment = document.getElementById("attachment");
const selectedFiles = document.getElementById("selectedFiles");

if (attachment && selectedFiles) {

    attachment.addEventListener("change", () => {

        selectedFiles.innerHTML = "";

        Array.from(attachment.files).forEach(file => {

            const tag = document.createElement("div");
            tag.className = "file-tag";

            tag.innerHTML = `
                <span>${file.name}</span>
                <button type="button">✕</button>
            `;

            tag.querySelector("button").onclick = () => {
                attachment.value = "";
                selectedFiles.innerHTML = "";
            };

            selectedFiles.appendChild(tag);

        });

    });

}
