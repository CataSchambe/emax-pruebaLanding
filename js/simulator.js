/**
 * GRUPO EMAX - ASESORÍA ENERGÉTICA
 * Interactive Savings Simulator (Dynamically Proportional & Accessible)
 */

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('spendSlider');
  const spendDisplay = document.getElementById('spendDisplay');
  const annualSavingsVal = document.getElementById('annualSavingsVal');
  const fixedSave = document.getElementById('fixedSave');
  const variableSave = document.getElementById('variableSave');
  const extrasSave = document.getElementById('extrasSave');
  const ctaBtn = document.getElementById('simulatorCtaBtn');

  if (!slider) return;

  function calculateSavings() {
    const monthlySpend = parseFloat(slider.value);
    
    // Update live spend badge
    if (spendDisplay) {
      spendDisplay.textContent = `${Math.round(monthlySpend)} € / mes`;
    }

    // Benchmark based on Spanish CNMC/IDAE data for household and SME optimization
    // Average estimated savings potential is approximately 32%
    const annualSpend = monthlySpend * 12;
    const savingsRatio = 0.32;
    const totalSavings = Math.round(annualSpend * savingsRatio);

    // Dynamic, proportional breakdown:
    // 1. Extras/seguros: scales between 30 € (at 40 €/mo) and 90 € (at 320 €/mo)
    const minExtras = 30;
    const maxExtras = 90;
    const minSpend = 40;
    const maxSpend = 320;
    const spendFraction = Math.min(Math.max((monthlySpend - minSpend) / (maxSpend - minSpend), 0), 1);
    const extrasPortion = Math.round(minExtras + spendFraction * (maxExtras - minExtras));

    // 2. Fixed term power optimization: ~25% of total savings
    const fixedPortion = Math.round(totalSavings * 0.25);

    // 3. Variable kWh consumption: exact remainder so tiles always sum precisely to total
    const variablePortion = totalSavings - fixedPortion - extrasPortion;

    // Update DOM with accessible aria-live
    if (annualSavingsVal) {
      annualSavingsVal.innerHTML = `${totalSavings} € <span>/ año</span>`;
      annualSavingsVal.setAttribute('aria-live', 'polite');
    }
    if (fixedSave) {
      fixedSave.textContent = `~${fixedPortion} € / año`;
    }
    if (variableSave) {
      variableSave.textContent = `~${variablePortion} € / año`;
    }
    if (extrasSave) {
      extrasSave.textContent = `~${extrasPortion} € / año`;
    }
  }

  slider.addEventListener('input', calculateSavings);
  // Initial run
  calculateSavings();

  // Connect CTA button to form
  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const formSection = document.getElementById('diagnostico-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
        const messageInput = document.getElementById('userNotes');
        if (messageInput && !messageInput.value) {
          messageInput.value = `Gasto mensual orientativo calculado en simulador: ${slider.value} €/mes.`;
        }
      }
    });
  }
});
