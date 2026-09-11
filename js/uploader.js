/**
 * GRUPO EMAX - ASESORÍA ENERGÉTICA
 * Drag & Drop Invoice Uploader (No Alerts - Accessible Inline Feedback)
 */

document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('invoiceDropzone');
  const fileInput = document.getElementById('invoiceFileInput');
  const fileFeedback = document.getElementById('fileFeedback');
  const fileNameDisplay = document.getElementById('fileNameDisplay');
  const removeFileBtn = document.getElementById('removeFileBtn');
  const dropzoneError = document.getElementById('dropzoneError');

  if (!dropzone || !fileInput) return;

  const maxSizeMB = 15;

  function showDropzoneError(msg) {
    if (dropzoneError) {
      dropzoneError.textContent = msg;
      dropzoneError.classList.add('show');
    }
  }

  function clearDropzoneError() {
    if (dropzoneError) {
      dropzoneError.textContent = '';
      dropzoneError.classList.remove('show');
    }
  }

  function handleFiles(files) {
    clearDropzoneError();
    if (!files || files.length === 0) return;
    const file = files[0];

    // Check size
    if (file.size > maxSizeMB * 1024 * 1024) {
      showDropzoneError(`El archivo seleccionado excede el tamaño máximo permitido de ${maxSizeMB}MB.`);
      fileInput.value = '';
      return;
    }

    // Check type or extension
    const isPDF = file.name.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|webp)$/i.test(file.name);

    if (!isPDF && !isImage) {
      showDropzoneError('Por favor sube un archivo en formato PDF o imagen (JPG, PNG, WebP).');
      fileInput.value = '';
      return;
    }

    // Render feedback
    if (fileNameDisplay) {
      const sizeKB = Math.round(file.size / 1024);
      const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
      fileNameDisplay.textContent = `${file.name} (${sizeStr})`;
    }

    if (fileFeedback) {
      fileFeedback.classList.add('show');
    }
  }

  // File input change
  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });

  // Drag events
  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      fileInput.files = files;
      handleFiles(files);
    }
  });

  // Remove file
  if (removeFileBtn) {
    removeFileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileInput.value = '';
      clearDropzoneError();
      if (fileFeedback) {
        fileFeedback.classList.remove('show');
      }
    });
  }
});
