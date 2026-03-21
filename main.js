import './style.css';
import { STYLES } from './styles.js';

let currentStyleId = STYLES[0].style_family.id;
let currentChannel = 'web';
let currentStep = 'style';

const STEP_HINTS = {
  style: 'Schritt 1: Wähle die passende Stilfamilie.',
  tokens: 'Schritt 2: Verfeinere Farben, Typografie und Form.',
  export: 'Schritt 3: Exportiere dein Design-System für die Umsetzung.'
};

function safeFontString(family) {
  if (!family) return "'Inter', sans-serif";
  if (family.includes(',')) return family;
  if (family.includes('Garamond') || family.includes('Display')) return `'${family}', serif`;
  return `'${family}', sans-serif`;
}

const root = document.documentElement;
const stylePresetsSelect = document.getElementById('style-presets-select');
const channelBtns = document.querySelectorAll('#channel-presets-container .theme-btn');
const colorInputs = document.querySelectorAll('input[type="color"]');
const tokenSelectInputs = document.querySelectorAll('select[data-var]');
const radiusSlider = document.getElementById('radius-slider');
const brandTitle = document.getElementById('preview-brand-title');
const fontHeadingDisplay = document.getElementById('font-family-heading-display');
const fontBodyDisplay = document.getElementById('font-family-body-display');
const stepBtns = document.querySelectorAll('.step-btn');
const stepPanels = document.querySelectorAll('.step-panel');
const nextStepBtns = document.querySelectorAll('[data-go-step]');
const stepContextText = document.getElementById('step-context-text');
const styleInfoBtn = document.getElementById('style-info-btn');
const styleInfoCard = document.getElementById('style-info-card');
const infoStyleName = document.getElementById('info-style-name');
const infoStyleSummary = document.getElementById('info-style-summary');
const infoStyleSuitable = document.getElementById('info-style-suitable');
const infoStyleAvoid = document.getElementById('info-style-avoid');
const infoStyleDos = document.getElementById('info-style-dos');
const infoStyleDonts = document.getElementById('info-style-donts');

const displayHex = {
  '--pv-color-1': document.getElementById('hex-1'),
  '--pv-color-2': document.getElementById('hex-2'),
  '--pv-text-dark': document.getElementById('hex-text'),
  '--pv-surface': document.getElementById('hex-surface')
};

function getVar(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function updateShadowLabels() {
  document.getElementById('shadow-val-soft').innerText = getVar('--pv-shadow-soft') || '0 4px 20px rgba(...)';
  document.getElementById('shadow-val-card').innerText = getVar('--pv-shadow-card') || '0 10px 40px rgba(...)';
  document.getElementById('shadow-val-hover').innerText = getVar('--pv-shadow-hover') || '0 20px 40px rgba(...)';
}

function updateToken(variable, value) {
  if (!variable) return;
  root.style.setProperty(variable, value);
  if (displayHex[variable]) {
    displayHex[variable].innerText = value.toUpperCase();
  }
}

function updateRadii(baseValue) {
  const val = parseInt(baseValue, 10);
  root.style.setProperty('--pv-radius-sm', `${Math.max(0, val - 10)}px`);
  root.style.setProperty('--pv-radius-md', `${val}px`);
  root.style.setProperty('--pv-radius-lg', `${val + 10}px`);
  root.style.setProperty('--pv-radius-pill', '500px');
}

function formatList(items) {
  if (!items || !items.length) return 'Keine Angabe';
  return items.map((item) => item.replaceAll('_', ' ')).join(', ');
}

function setStyleInfo(styleObj) {
  if (!styleObj) return;
  infoStyleName.innerText = styleObj.style_family.name;
  infoStyleSummary.innerText = styleObj.style_family.summary || 'Keine Beschreibung verfügbar.';
  infoStyleSuitable.innerText = formatList(styleObj.style_family.suitable_for);
  infoStyleAvoid.innerText = formatList(styleObj.style_family.not_recommended_for);
  infoStyleDos.innerText = formatList(styleObj.dos);
  infoStyleDonts.innerText = formatList(styleObj.donts);
}

function setStep(stepId) {
  if (!STEP_HINTS[stepId]) return;
  currentStep = stepId;

  stepBtns.forEach((btn) => {
    const isActive = btn.dataset.step === stepId;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      btn.setAttribute('aria-current', 'step');
    } else {
      btn.removeAttribute('aria-current');
    }
  });

  stepPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.stepPanel === stepId);
  });

  stepContextText.innerText = STEP_HINTS[stepId];
}

function applyTheme(themeId) {
  currentStyleId = themeId;
  const styleObj = STYLES.find((s) => s.style_family.id === themeId);
  if (!styleObj) return;

  brandTitle.innerText = styleObj.style_family.name;

  const tokens = styleObj.tokens;
  const mappedTokens = {
    '--pv-bg-main': tokens.color_roles.background,
    '--pv-surface': tokens.color_roles.surface,
    '--pv-text-dark': tokens.color_roles.text_primary,
    '--pv-text-main': tokens.color_roles.text_secondary,
    '--pv-color-1': tokens.color_roles.primary,
    '--pv-color-2': tokens.color_roles.accent || tokens.color_roles.secondary || tokens.color_roles.focus,
    '--pv-font-heading': safeFontString(tokens.typography_roles.heading.family),
    '--pv-font-body': safeFontString(tokens.typography_roles.body.family),
    '--pv-base-radius': tokens.shape_scale.default_radius
  };

  for (const [variable, value] of Object.entries(mappedTokens)) {
    if (variable === '--pv-base-radius') {
      radiusSlider.value = value;
      updateRadii(value);
      continue;
    }

    updateToken(variable, value);

    const colorInput = document.querySelector(`input[data-var="${variable}"]`);
    if (colorInput) colorInput.value = value;

    const selectInput = document.querySelector(`select[data-var="${variable}"]`);
    if (selectInput) {
      const hasValue = Array.from(selectInput.options).some((opt) => opt.value === value);
      if (!hasValue) {
        const newOpt = document.createElement('option');
        newOpt.value = value;
        newOpt.text = tokens.typography_roles[variable === '--pv-font-heading' ? 'heading' : 'body'].family;
        selectInput.add(newOpt);
      }
      selectInput.value = value;
    }
  }

  if (fontHeadingDisplay) fontHeadingDisplay.innerText = tokens.typography_roles.heading.family;
  if (fontBodyDisplay) fontBodyDisplay.innerText = tokens.typography_roles.body.family;

  setStyleInfo(styleObj);
  updateShadowLabels();
}

function applyChannel(channelId) {
  currentChannel = channelId;
  const wrapper = document.getElementById('preview-canvas');

  if (channelId === 'print') {
    wrapper.classList.add('channel-print');
    wrapper.classList.remove('channel-web');
  } else {
    wrapper.classList.add('channel-web');
    wrapper.classList.remove('channel-print');
  }
}

function getLiveExportTokens() {
  return {
    background: getVar('--pv-bg-main'),
    surface: getVar('--pv-surface'),
    text_primary: getVar('--pv-text-dark'),
    text_secondary: getVar('--pv-text-main'),
    primary: getVar('--pv-color-1'),
    accent: getVar('--pv-color-2'),
    heading_font: getVar('--pv-font-heading'),
    body_font: getVar('--pv-font-body'),
    radius_sm: getVar('--pv-radius-sm'),
    radius_md: getVar('--pv-radius-md'),
    radius_lg: getVar('--pv-radius-lg'),
    radius_pill: getVar('--pv-radius-pill')
  };
}

function initUI() {
  stylePresetsSelect.innerHTML = '';

  STYLES.forEach((styleObj) => {
    const opt = document.createElement('option');
    opt.value = styleObj.style_family.id;
    opt.text = styleObj.style_family.name;
    stylePresetsSelect.appendChild(opt);
  });

  stylePresetsSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
  });

  channelBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      channelBtns.forEach((b) => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      applyChannel(e.currentTarget.dataset.channel);
    });
  });

  colorInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      updateToken(e.target.dataset.var, e.target.value);
    });
  });

  tokenSelectInputs.forEach((select) => {
    select.addEventListener('change', (e) => {
      updateToken(e.target.dataset.var, e.target.value);
      if (e.target.id === 'font-heading' && fontHeadingDisplay) {
        fontHeadingDisplay.innerText = e.target.selectedOptions[0].text;
      }
      if (e.target.id === 'font-body' && fontBodyDisplay) {
        fontBodyDisplay.innerText = e.target.selectedOptions[0].text;
      }
    });
  });

  radiusSlider.addEventListener('input', (e) => {
    updateRadii(e.target.value);
  });

  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setStep(btn.dataset.step);
    });
  });

  nextStepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.goStep;
      if (target) setStep(target);
    });
  });

  applyTheme(STYLES[0].style_family.id);
  applyChannel('web');
  setStep(currentStep);
}

initUI();

if (styleInfoBtn && styleInfoCard) {
  styleInfoBtn.addEventListener('click', () => {
    const isOpen = !styleInfoCard.classList.contains('hidden');
    styleInfoCard.classList.toggle('hidden', isOpen);
    styleInfoBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (
      !styleInfoCard.classList.contains('hidden') &&
      target instanceof Node &&
      !styleInfoCard.contains(target) &&
      !styleInfoBtn.contains(target)
    ) {
      styleInfoCard.classList.add('hidden');
      styleInfoBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

const exportBtns = [document.getElementById('export-btn')].filter(Boolean);

const exportModal = document.getElementById('export-modal');
const closeModalBtn = document.getElementById('close-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const copyBtns = document.querySelectorAll('.copy-btn');

function generateExports() {
  try {
    const currentStyleObj = STYLES.find((s) => s.style_family.id === currentStyleId);
    if (!currentStyleObj) return;

    const live = getLiveExportTokens();

    const cssString = `:root {
  /* Brand DNA: ${currentStyleObj.style_family.name}
     Target Channel Focus: ${currentChannel.toUpperCase()} */

  /* Colors */
  --bg-main: ${live.background};
  --surface: ${live.surface};
  --text-dark: ${live.text_primary};
  --text-main: ${live.text_secondary};
  --primary: ${live.primary};
  --accent: ${live.accent};

  /* Typography */
  --font-heading: ${live.heading_font};
  --font-body: ${live.body_font};

  /* Shape Defaults */
  --radius-sm: ${live.radius_sm};
  --radius-md: ${live.radius_md};
  --radius-lg: ${live.radius_lg};
  --radius-pill: ${live.radius_pill};
}`;

    document.getElementById('export-css-code').innerText = cssString;

    const jsonString = JSON.stringify(
      {
        style_family: currentStyleObj.style_family,
        channel: currentChannel,
        live_tokens: live,
        dos: currentStyleObj.dos,
        donts: currentStyleObj.donts,
        exported_at: new Date().toISOString()
      },
      null,
      2
    );
    document.getElementById('export-json-code').innerText = jsonString;

    const aiPrompt = `ROLE:
You are an Expert UI/UX Frontend Engineer and Print Designer. Build the requested layout strictly using the following Design System parameters. Do not hallucinate colors or fonts.

SYSTEM CONTEXT:
Style Family: ${currentStyleObj.style_family?.name || ''}
Keywords: ${(currentStyleObj.style_family?.brand_keywords || []).join(', ')}
Target Channel Rule: ${
      currentChannel === 'web'
        ? JSON.stringify(currentStyleObj.channel_rules?.website || {})
        : JSON.stringify(currentStyleObj.channel_rules?.flyer || {})
    }

DESIGN TOKENS:
- Background: ${live.background}
- Cards/Surfaces: ${live.surface}
- Headings Color: ${live.text_primary}
- Body Text Color: ${live.text_secondary}
- Primary Accent: ${live.primary} (Use for main CTAs)
- Secondary Accent: ${live.accent}

TYPOGRAPHY:
- Headlines: ${live.heading_font}
- Body Text: ${live.body_font}

RULES:
- ${(currentStyleObj.dos || []).join('\n- ')}

AVOID:
- ${(currentStyleObj.donts || []).join('\n- ')}`;

    document.getElementById('export-ai-code').innerText = aiPrompt;

    const mood = (currentStyleObj.style_family?.brand_keywords || []).join(', ');
    const imagePrompt = `/imagine prompt: High-end layout design element, website photography or print flyer photography depending on context, vector illustration style.
Mood: ${mood}.
Color Palette: ${live.background}, ${live.primary}, ${live.surface}.
Aesthetic: clean lines, modern web design, highly detailed, 8k resolution, dribbble style --ar ${
      currentChannel === 'web' ? '16:9' : '3:4'
    } --v 6.0`;

    document.getElementById('export-image-code').innerText = imagePrompt;
  } catch (err) {
    console.error('Export Generator failed:', err);
    alert('Export fehlgeschlagen. Bitte Eingaben prüfen und erneut versuchen.');
  }
}

function openModal() {
  generateExports();
  exportModal.classList.remove('hidden');
}

function closeModal() {
  exportModal.classList.add('hidden');
}

exportBtns.forEach((btn) => {
  btn.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal);

exportModal.addEventListener('click', (e) => {
  if (e.target === exportModal) {
    closeModal();
  }
});

tabBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    tabBtns.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));

    e.currentTarget.classList.add('active');
    document.getElementById(`tab-${e.currentTarget.dataset.tab}`).classList.add('active');
  });
});

copyBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const targetId = e.currentTarget.dataset.target;
    const text = document.getElementById(targetId).innerText;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = e.currentTarget.innerText;
      e.currentTarget.innerText = 'Kopiert';
      setTimeout(() => {
        e.currentTarget.innerText = originalText;
      }, 1500);
    });
  });
});
