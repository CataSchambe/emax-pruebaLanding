/**
 * GRUPO EMAX - ASESORÍA ENERGÉTICA
 * Lead Form Handler, Inline Validation & Accessible Client Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('energyAuditForm');
  const clientTypeRadios = document.querySelectorAll('input[name="client_type"]');
  const successAlert = document.getElementById('formSuccessAlert');
  const submitBtn = document.getElementById('submitAuditBtn');
  const phoneInput = document.getElementById('userPhone');

  // 1. Client Type Switcher (Hogar / Empresa)
  function setClientType(type) {
    const radio = document.querySelector(`input[name="client_type"][value="${type}"]`);
    if (radio) {
      radio.checked = true;
    }

    const nameLabel = document.querySelector('label[for="userName"]');
    const nameInput = document.getElementById('userName');
    
    if (type === 'empresa') {
      if (nameLabel) nameLabel.innerHTML = 'Nombre de la empresa o contacto <span class="required">*</span>';
      if (nameInput) nameInput.placeholder = 'Ej. Panadería San José S.L. / Juan Pérez';
    } else {
      if (nameLabel) nameLabel.innerHTML = 'Nombre y apellidos <span class="required">*</span>';
      if (nameInput) nameInput.placeholder = 'Ej. Lucía Domínguez';
    }
  }

  // Listen to radio changes
  clientTypeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      setClientType(e.target.value);
    });
  });

  // 2. Phone Input Format Helper (Spain numbers)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^\d\s+]/g, '');
    });
  }

  // 3. Inline Validation Helpers (No native alerts - WCAG AA compliant)
  function setFieldError(fieldId, errorMsg) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(`${fieldId}-error`);
    
    if (input) {
      input.classList.add('form-control--error');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', `${fieldId}-error`);
    }
    if (errorSpan) {
      errorSpan.textContent = errorMsg;
      errorSpan.classList.add('show');
    }
  }

  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorSpan = document.getElementById(`${fieldId}-error`);
    
    if (input) {
      input.classList.remove('form-control--error');
      input.removeAttribute('aria-invalid');
    }
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.classList.remove('show');
    }
  }

  // Clear errors on blur / input
  ['userName', 'userPhone', 'userEmail', 'rgpdConsent'].forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if (el) {
      el.addEventListener('input', () => clearFieldError(fieldId));
      el.addEventListener('change', () => clearFieldError(fieldId));
      el.addEventListener('blur', () => validateField(fieldId));
    }
  });

  function validateField(fieldId) {
    if (fieldId === 'userName') {
      const val = document.getElementById('userName')?.value.trim();
      if (!val || val.length < 2) {
        setFieldError('userName', 'Por favor, indica tu nombre o el de tu empresa (mínimo 2 caracteres).');
        return false;
      }
    } else if (fieldId === 'userPhone') {
      const phoneDigits = document.getElementById('userPhone')?.value.replace(/\D/g, '') || '';
      if (phoneDigits.length < 9) {
        setFieldError('userPhone', 'Introduce un teléfono de contacto válido en España (mínimo 9 dígitos).');
        return false;
      }
    } else if (fieldId === 'userEmail') {
      const email = document.getElementById('userEmail')?.value.trim() || '';
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        setFieldError('userEmail', 'Introduce una dirección de correo electrónico válida.');
        return false;
      }
    } else if (fieldId === 'rgpdConsent') {
      const rgpd = document.getElementById('rgpdConsent')?.checked;
      if (!rgpd) {
        setFieldError('rgpdConsent', 'Debes aceptar la política de privacidad para procesar el estudio gratuito.');
        return false;
      }
    }
    clearFieldError(fieldId);
    return true;
  }

  // 4. Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let firstInvalid = null;
      const fields = ['userName', 'userPhone', 'userEmail', 'rgpdConsent'];

      fields.forEach(fieldId => {
        const isValid = validateField(fieldId);
        if (!isValid && !firstInvalid) {
          firstInvalid = document.getElementById(fieldId);
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      // UI Loading state
      const originalBtnHtml = submitBtn.innerHTML;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"/>
          </svg>
          <span>Auditando solicitud...</span>
        `;
      }

      /**
       * BACKEND INTEGRATION NOTE:
       * En producción estática con Netlify / Vercel o backend corporativo:
       * fetch('/api/audit-request', {
       *   method: 'POST',
       *   body: new FormData(form)
       * }).then(res => res.json())...
       *
       * Para fines demostrativos en esta prueba técnica, simulamos el procesamiento
       * asíncrono con respuesta satisfactoria tras 1.2s.
       */
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = `
            <span>Solicitud Recibida con Éxito</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          `;
          submitBtn.classList.remove('btn-primary');
          submitBtn.classList.add('btn-whatsapp');
        }

        if (successAlert) {
          successAlert.classList.add('show');
          successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form and resynchronize client type and file dropzone
        form.reset();
        setClientType('particular');

        const fileFeedback = document.getElementById('fileFeedback');
        if (fileFeedback) {
          fileFeedback.classList.remove('show');
        }

        // Restore submit button state after 4 seconds to avoid terminal confusion
        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.classList.remove('btn-whatsapp');
            submitBtn.classList.add('btn-primary');
          }
        }, 4000);

      }, 1200);
    });
  }
});
