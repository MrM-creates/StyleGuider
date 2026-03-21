import './style.css';
import { STYLES } from './styles.js';

const CUSTOM_STYLES_STORAGE_KEY = 'styleguider_custom_styles_v1';

let customStyles = loadCustomStyles();
let currentStyleId = STYLES[0]?.style_family?.id || '';
let currentChannel = 'web';
let currentStep = 'style';

const STEP_HINTS = {
  style: 'Schritt 1: Wähle die passende Stilfamilie.',
  tokens: 'Schritt 2: Passe die Attribute behutsam an.',
  export: 'Schritt 3: Exportiere dein Design-System für die Umsetzung.'
};

const HANDBOOK_INFO = {
  minimal_swiss: {
    effect: 'Klar, präzise, sachlich und vertrauenswürdig. Dieser Stil vermittelt Ordnung und Professionalität.',
    suitable: ['Beratung', 'Architektur', 'B2B-Marken', 'Premium-Tech', 'Kulturinstitutionen'],
    avoid: ['Verspielte Kinder- und Familienmarken', 'Laute Event-Kommunikation', 'Stark emotionale Lifestyle-Marken'],
    dos: ['Klare Ausrichtung priorisieren', 'Farbe sparsam und bewusst einsetzen', 'Typografie diszipliniert halten'],
    donts: ['Zu viele Akzentfarben verwenden', 'Formen unnötig weich machen', 'Verspielte UI-Effekte einbauen'],
    web: 'Sehr stark für professionelle, strukturierte und barrierearme Interfaces.',
    print: 'Sehr geeignet für Broschüren, One-Pager, Geschäftsdrucksachen und Visitenkarten.',
    risk: 'Wirkt schnell zu kühl, wenn der Stil zu hart geführt wird.'
  },
  modern_editorial: {
    effect: 'Kultiviert, visuell stark und kuratiert. Der Stil lebt von Typografie, Bildgewichtung und Raum.',
    suitable: ['Fotografie', 'Fashion', 'Kunst und Kultur', 'Interior', 'Magazine'],
    avoid: ['Funktionale Dashboards', 'Aggressive Performance-Landingpages', 'Sehr technische Oberflächen'],
    dos: ['Großzügigen Raum zulassen', 'Typografie als Führungselement nutzen', 'Bilder groß und bewusst einsetzen'],
    donts: ['Zu viele CTA-Farben einsetzen', 'Alles mit UI-Elementen füllen', 'In Dashboard-Optik kippen'],
    web: 'Stark für imageorientierte Seiten, wenn Funktionalität bewusst nachgezogen wird.',
    print: 'Sehr stark für Lookbooks, Portfolios, Einladungen und Kulturkommunikation.',
    risk: 'Kann zu schön wirken, aber funktional zu schwach ausfallen.'
  },
  warm_human: {
    effect: 'Nahbar, freundlich, weich und vertrauensvoll. Der Stil wirkt menschlich und zugänglich.',
    suitable: ['Coaching', 'Gesundheit', 'Bildung', 'Familienangebote', 'Lokale Dienstleistungen'],
    avoid: ['Cybersecurity', 'High Finance', 'Harte Industriekommunikation', 'Sehr technische B2B-Marken'],
    dos: ['Warme Kontraste nutzen', 'Informationen empathisch strukturieren', 'Weiche Formen mit Lesbarkeit kombinieren'],
    donts: ['Alles gleich pastellig machen', 'Kontrast für den weichen Look opfern', 'Freundlichkeit mit Beliebigkeit verwechseln'],
    web: 'Sehr attraktiv für menschennahe Services, wenn Fokus- und Kontrastzustände sauber bleiben.',
    print: 'Gut für Flyer, Kursunterlagen, Angebotsblätter und familiennahe Kommunikation.',
    risk: 'Kann zu weich oder zu kontrastarm werden.'
  },
  bold_startup: {
    effect: 'Kraftvoll, modern, digital und aktivierend. Der Stil erzeugt Tempo und Relevanz.',
    suitable: ['SaaS', 'Apps', 'Digitale Services', 'Startups', 'Produktmarketing'],
    avoid: ['Heritage-Marken', 'Handwerkliche Luxusmarken', 'Sehr ruhige Hospitality-Kommunikation'],
    dos: ['Klare CTA-Hierarchie aufbauen', 'Starke Headlines nutzen', 'Kontrast bewusst führen'],
    donts: ['Jede Farbe zum Primärsignal machen', 'Energie mit Unruhe verwechseln', 'Zu viele laute Module nebeneinanderstellen'],
    web: 'Ideal für digitale Produkte und moderne Landingpages mit klarer Zustandslogik.',
    print: 'Für Print gut nutzbar, aber meist mit mehr Weißraum und weniger Aggressivität.',
    risk: 'Kann zu laut und hektisch wirken.'
  },
  premium_luxury: {
    effect: 'Ruhig, exklusiv, hochwertig und reduziert. Luxus wirkt hier über Präzision statt Lautstärke.',
    suitable: ['Fine Art', 'Interior', 'Beauty', 'Hospitality', 'Hochwertige Dienstleistungen'],
    avoid: ['Discount-Kommunikation', 'Kinder- und Jugendmarken', 'Hype-getriebene Startups'],
    dos: ['Reduktion zulassen', 'Materialität betonen', 'Akzente selten und bewusst einsetzen'],
    donts: ['Luxus über Klischees simulieren', 'Mit zu vielen Schriften arbeiten', 'Übermäßige Rundungen nutzen'],
    web: 'Sehr stark für hochwertige Marken, wenn funktionale Elemente diszipliniert bleiben.',
    print: 'Hervorragend für Karten, Booklets, Portfolios und hochwertige Einladungen.',
    risk: 'Kann in Klischee-Luxus kippen.'
  },
  creative_playful: {
    effect: 'Lebendig, kreativ, markant und energiegeladen. Aufmerksamkeit mit System.',
    suitable: ['Kreativstudios', 'Events', 'Lifestyle-Marken', 'Familien- und Freizeitangebote'],
    avoid: ['Formale B2B-Kommunikation', 'Regulierte Branchen', 'Sensible medizinische Kommunikation'],
    dos: ['Ausdruck kontrolliert einsetzen', 'Klaren visuellen Schwerpunkt setzen', 'Funktion und Lesbarkeit sichern'],
    donts: ['Jede Komponente zur Show machen', 'Farben ohne Hierarchie mischen', 'Unter dem Label kreativ chaotisch werden'],
    web: 'Sehr stark für markante Auftritte, braucht aber strenge Leitplanken gegen Übersteuerung.',
    print: 'Sehr gut für plakative Event- und Promotionskommunikation.',
    risk: 'Kann schnell in visuelles Chaos kippen.'
  },
  natural_organic: {
    effect: 'Erdig, ruhig, glaubwürdig und authentisch. Der Stil vermittelt Nähe zu Material und Natur.',
    suitable: ['Nachhaltigkeitsmarken', 'Food', 'Wellbeing', 'Craft', 'Outdoor- und Naturmarken'],
    avoid: ['High-Tech-SaaS', 'Trading/Finanz-Speed-Kommunikation', 'Aggressive Nightlife-Kommunikation'],
    dos: ['Materialität und Ruhe betonen', 'Natürliche Farbwelten strukturiert einsetzen', 'Vertrauen über Klarheit erzeugen'],
    donts: ['Öko-Klischees stapeln', 'Alles in Beige auflösen', 'Lesbarkeit der Atmosphäre opfern'],
    web: 'Sehr gut für vertrauensorientierte Marken mit Story, Herkunft oder Materialbezug.',
    print: 'Sehr gut für Packaging-nahe Kommunikation, Food- und Wellbeing-Flyer, Story-Booklets.',
    risk: 'Kann in Öko-Klischees abrutschen.'
  }
};

function safeFontString(family) {
  if (!family) return "'Inter', sans-serif";
  if (family.includes(',')) return family;
  if (family.includes('Garamond') || family.includes('Display')) return `'${family}', serif`;
  return `'${family}', sans-serif`;
}

function stripFontFamily(cssFontValue) {
  return (cssFontValue || '').split(',')[0].replaceAll("'", '').replaceAll('"', '').trim();
}

function slugifyName(value) {
  return value
    .trim()
    .toLowerCase()
    .replaceAll('ä', 'ae')
    .replaceAll('ö', 'oe')
    .replaceAll('ü', 'ue')
    .replaceAll('ß', 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function todayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function loadCustomStyles() {
  try {
    const raw = localStorage.getItem(CUSTOM_STYLES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        item.style_family &&
        typeof item.style_family.id === 'string' &&
        item.tokens &&
        item.tokens.color_roles
    );
  } catch {
    return [];
  }
}

function persistCustomStyles() {
  localStorage.setItem(CUSTOM_STYLES_STORAGE_KEY, JSON.stringify(customStyles));
}

function getAllStyles() {
  return [...STYLES, ...customStyles];
}

function findStyleById(styleId) {
  return getAllStyles().find((s) => s.style_family.id === styleId);
}

const root = document.documentElement;
const stylePresetsSelect = document.getElementById('style-presets-select');
const channelBtns = document.querySelectorAll('#channel-presets-container .theme-btn');
const colorInputs = document.querySelectorAll('input[type="color"]');
const tokenSelectInputs = document.querySelectorAll('select[data-var]');
const radiusSlider = document.getElementById('radius-slider');
const brandTitle = document.getElementById('preview-brand-title');
const previewStyleSummary = document.getElementById('preview-style-summary');
const fontHeadingDisplay = document.getElementById('font-family-heading-display');
const fontBodyDisplay = document.getElementById('font-family-body-display');
const stepBtns = document.querySelectorAll('.step-btn');
const stepPanels = document.querySelectorAll('.step-panel');
const nextStepBtns = document.querySelectorAll('[data-go-step]');
const stepContextText = document.getElementById('step-context-text');
const styleInfoBtn = document.getElementById('style-info-btn');
const styleInfoCard = document.getElementById('style-info-card');

const infoStyleName = document.getElementById('info-style-name');
const infoStyleEffect = document.getElementById('info-style-effect');
const infoStyleSuitable = document.getElementById('info-style-suitable');
const infoStyleAvoid = document.getElementById('info-style-avoid');
const infoStyleDos = document.getElementById('info-style-dos');
const infoStyleDonts = document.getElementById('info-style-donts');
const infoStyleWeb = document.getElementById('info-style-web');
const infoStylePrint = document.getElementById('info-style-print');
const infoStyleRisk = document.getElementById('info-style-risk');

const newStyleNameInput = document.getElementById('new-style-name');
const saveStyleBtn = document.getElementById('save-style-btn');
const saveStyleFeedback = document.getElementById('save-style-feedback');
const footerYear = document.getElementById('footer-year');

const displayHex = {
  '--pv-color-1': document.getElementById('hex-1'),
  '--pv-color-2': document.getElementById('hex-2'),
  '--pv-text-dark': document.getElementById('hex-text'),
  '--pv-surface': document.getElementById('hex-surface')
};

function setFooterYear() {
  if (footerYear) {
    footerYear.innerText = String(new Date().getFullYear());
  }
}

function getVar(name) {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function formatList(items) {
  if (!items || !items.length) return 'Keine Angabe';
  return items.map((item) => item.replaceAll('_', ' ')).join(', ');
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

function handbookInfoFor(styleObj) {
  const styleId = styleObj?.style_family?.id;
  let baseInfo = HANDBOOK_INFO[styleId];

  if (!baseInfo && styleObj?.meta?.base_style_id) {
    baseInfo = HANDBOOK_INFO[styleObj.meta.base_style_id];
  }

  if (baseInfo) {
    const isCustom = styleObj?.meta?.custom === true;
    const baseStyleName = findStyleById(styleObj?.meta?.base_style_id)?.style_family?.name || styleObj?.meta?.base_style_id;
    return {
      effect: isCustom
        ? `Eigener Stil auf Basis von ${baseStyleName}. ${baseInfo.effect}`
        : baseInfo.effect,
      suitable: formatList(baseInfo.suitable),
      avoid: formatList(baseInfo.avoid),
      dos: formatList(baseInfo.dos),
      donts: formatList(baseInfo.donts),
      web: baseInfo.web,
      print: baseInfo.print,
      risk: baseInfo.risk
    };
  }

  return {
    effect: styleObj?.style_family?.summary || 'Keine Beschreibung verfügbar.',
    suitable: formatList(styleObj?.style_family?.suitable_for),
    avoid: formatList(styleObj?.style_family?.not_recommended_for),
    dos: formatList(styleObj?.dos),
    donts: formatList(styleObj?.donts),
    web: 'Keine Hinweise verfügbar.',
    print: 'Keine Hinweise verfügbar.',
    risk: 'Keine typische Gefahr dokumentiert.'
  };
}

function setStyleInfo(styleObj) {
  if (!styleObj) return;
  const info = handbookInfoFor(styleObj);

  infoStyleName.innerText = styleObj.style_family.name;
  if (previewStyleSummary) {
    previewStyleSummary.innerText = info.effect;
  }
  infoStyleEffect.innerText = info.effect;
  infoStyleSuitable.innerText = info.suitable;
  infoStyleAvoid.innerText = info.avoid;
  infoStyleDos.innerText = info.dos;
  infoStyleDonts.innerText = info.donts;
  infoStyleWeb.innerText = info.web;
  infoStylePrint.innerText = info.print;
  infoStyleRisk.innerText = info.risk;
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

function buildStyleSelect(selectedId = currentStyleId) {
  stylePresetsSelect.innerHTML = '';

  const curatedGroup = document.createElement('optgroup');
  curatedGroup.label = 'Kuratierte Stile';

  STYLES.forEach((styleObj) => {
    const opt = document.createElement('option');
    opt.value = styleObj.style_family.id;
    opt.text = styleObj.style_family.name;
    curatedGroup.appendChild(opt);
  });

  stylePresetsSelect.appendChild(curatedGroup);

  if (customStyles.length > 0) {
    const customGroup = document.createElement('optgroup');
    customGroup.label = 'Eigene Stile';

    customStyles.forEach((styleObj) => {
      const opt = document.createElement('option');
      opt.value = styleObj.style_family.id;
      opt.text = styleObj.style_family.name;
      customGroup.appendChild(opt);
    });

    stylePresetsSelect.appendChild(customGroup);
  }

  stylePresetsSelect.value = selectedId;
}

function applyTheme(themeId) {
  currentStyleId = themeId;
  const styleObj = findStyleById(themeId);
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

function setSaveStyleFeedback(message, kind = 'neutral') {
  saveStyleFeedback.innerText = message;
  saveStyleFeedback.classList.remove('success', 'error');
  if (kind === 'success') saveStyleFeedback.classList.add('success');
  if (kind === 'error') saveStyleFeedback.classList.add('error');
}

function saveAsCustomStyle() {
  const name = newStyleNameInput.value.trim();
  if (!name) {
    setSaveStyleFeedback('Bitte gib zuerst einen Namen für den neuen Stil ein.', 'error');
    return;
  }

  const newId = slugifyName(name);
  if (!newId) {
    setSaveStyleFeedback('Der Name enthält keine gültigen Zeichen für eine Stil-ID.', 'error');
    return;
  }

  const allIds = new Set(getAllStyles().map((styleObj) => styleObj.style_family.id));
  if (allIds.has(newId)) {
    setSaveStyleFeedback('Diese Stil-ID existiert bereits. Bitte wähle einen anderen Namen.', 'error');
    return;
  }

  const baseStyle = findStyleById(currentStyleId);
  if (!baseStyle) {
    setSaveStyleFeedback('Die Basis für den neuen Stil konnte nicht gefunden werden.', 'error');
    return;
  }

  const live = getLiveExportTokens();
  const customStyle = JSON.parse(JSON.stringify(baseStyle));

  customStyle.style_family.id = newId;
  customStyle.style_family.name = name;
  customStyle.style_family.status = 'custom_user';
  customStyle.style_family.summary = `Eigener Stil auf Basis von ${baseStyle.style_family.name}.`;

  customStyle.meta = {
    ...(customStyle.meta || {}),
    custom: true,
    base_style_id: baseStyle.meta?.base_style_id || baseStyle.style_family.id,
    created_at: new Date().toISOString()
  };

  customStyle.tokens.color_roles.background = live.background;
  customStyle.tokens.color_roles.surface = live.surface;
  customStyle.tokens.color_roles.text_primary = live.text_primary;
  customStyle.tokens.color_roles.text_secondary = live.text_secondary;
  customStyle.tokens.color_roles.primary = live.primary;
  customStyle.tokens.color_roles.accent = live.accent;

  customStyle.tokens.typography_roles.heading.family = stripFontFamily(live.heading_font) || customStyle.tokens.typography_roles.heading.family;
  customStyle.tokens.typography_roles.body.family = stripFontFamily(live.body_font) || customStyle.tokens.typography_roles.body.family;

  const defaultRadius = parseInt(live.radius_md, 10);
  if (!Number.isNaN(defaultRadius)) {
    customStyle.tokens.shape_scale.default_radius = defaultRadius;
  }

  if (customStyle.governance) {
    customStyle.governance.updated_at = todayISODate();
  }

  customStyles.push(customStyle);
  persistCustomStyles();
  buildStyleSelect(newId);
  applyTheme(newId);

  newStyleNameInput.value = '';
  setSaveStyleFeedback('Neuer Stil wurde gespeichert und zur Auswahl hinzugefügt.', 'success');
}

function initUI() {
  setFooterYear();
  buildStyleSelect(currentStyleId);

  stylePresetsSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
    setSaveStyleFeedback('');
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

  if (saveStyleBtn) {
    saveStyleBtn.addEventListener('click', saveAsCustomStyle);
  }

  applyTheme(currentStyleId);
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
    const currentStyleObj = findStyleById(currentStyleId);
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
        meta: currentStyleObj.meta || null,
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
