import './style.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
const infoStyleSuitable = document.getElementById('info-style-suitable');
const infoStyleAvoid = document.getElementById('info-style-avoid');
const infoStyleDos = document.getElementById('info-style-dos');
const infoStyleDonts = document.getElementById('info-style-donts');
const infoStyleWeb = document.getElementById('info-style-web');
const infoStylePrint = document.getElementById('info-style-print');
const infoStyleRisk = document.getElementById('info-style-risk');

const newStyleNameInput = document.getElementById('new-style-name');
const saveStyleBtn = document.getElementById('save-style-btn');
const deleteStyleBtn = document.getElementById('delete-style-btn');
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

function prettifyKey(value) {
  return String(value)
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSpecValue(value) {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([key, inner]) => `${prettifyKey(key)}: ${formatSpecValue(inner)}`)
      .join(' | ');
  }
  if (value === null || value === undefined || value === '') return 'Keine Angabe';
  return String(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function objectListHtml(obj) {
  const entries = Object.entries(obj || {});
  if (!entries.length) {
    return '<p class="pdf-empty">Keine Angaben vorhanden.</p>';
  }

  return `<ul class="pdf-list">${entries
    .map(
      ([key, value]) =>
        `<li><span>${escapeHtml(prettifyKey(key))}</span><strong>${escapeHtml(formatSpecValue(value))}</strong></li>`
    )
    .join('')}</ul>`;
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
  updateDeleteStyleButtonState();
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

function isCustomStyleId(styleId) {
  return customStyles.some((styleObj) => styleObj.style_family.id === styleId);
}

function updateDeleteStyleButtonState() {
  if (!deleteStyleBtn) return;
  const canDelete = isCustomStyleId(currentStyleId);
  deleteStyleBtn.disabled = !canDelete;
  deleteStyleBtn.title = canDelete ? 'Eigenen Stil löschen' : 'Nur eigene Stile können gelöscht werden';
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
  updateDeleteStyleButtonState();
}

function deleteCurrentCustomStyle() {
  if (!isCustomStyleId(currentStyleId)) {
    setSaveStyleFeedback('Nur selbst erstellte Stile können gelöscht werden.', 'error');
    updateDeleteStyleButtonState();
    return;
  }

  const styleToDelete = findStyleById(currentStyleId);
  const styleName = styleToDelete?.style_family?.name || currentStyleId;
  const confirmed = window.confirm(`Möchtest du den Stil "${styleName}" wirklich löschen?`);
  if (!confirmed) return;

  customStyles = customStyles.filter((styleObj) => styleObj.style_family.id !== currentStyleId);
  persistCustomStyles();

  const fallbackStyleId = STYLES[0]?.style_family?.id || '';
  buildStyleSelect(fallbackStyleId);
  applyTheme(fallbackStyleId);

  setSaveStyleFeedback(`Stil "${styleName}" wurde gelöscht.`, 'success');
  updateDeleteStyleButtonState();
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
      const stepId = btn.dataset.step;
      setStep(stepId);
      if (stepId === 'export') {
        openModal();
      }
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

  if (deleteStyleBtn) {
    deleteStyleBtn.addEventListener('click', deleteCurrentCustomStyle);
  }

  applyTheme(currentStyleId);
  applyChannel('web');
  setStep(currentStep);
  updateDeleteStyleButtonState();
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

const directExportBtn = document.getElementById('export-btn');
const pdfSaveBtn = document.getElementById('pdf-save-btn');
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

function getChannelSpecData(styleObj, targetChannel) {
  if (targetChannel === 'print') {
    return {
      label: 'Print',
      rulesTitle: 'Kanalregeln (Flyer/Print)',
      rules: styleObj.channel_rules?.flyer || {},
      templateTitle: 'Templatespezifikationen (Flyer A5)',
      template: styleObj.template_specs?.flyer_a5 || {}
    };
  }

  return {
    label: 'Web',
    rulesTitle: 'Kanalregeln (Website)',
    rules: styleObj.channel_rules?.website || {},
    templateTitle: 'Templatespezifikationen (Homepage)',
    template: styleObj.template_specs?.homepage || {}
  };
}

function buildPdfDescriptionPage(styleObj, targetChannel) {
  const info = handbookInfoFor(styleObj);
  const live = getLiveExportTokens();
  const channelData = getChannelSpecData(styleObj, targetChannel);
  const exportDate = new Intl.DateTimeFormat('de-CH', { dateStyle: 'long' }).format(new Date());

  const liveTokenMap = {
    Hintergrund: live.background,
    Fläche: live.surface,
    'Text primär': live.text_primary,
    'Text sekundär': live.text_secondary,
    Primärfarbe: live.primary,
    Akzentfarbe: live.accent,
    'Schrift Überschrift': live.heading_font,
    'Schrift Fließtext': live.body_font,
    Radius: `${live.radius_sm} / ${live.radius_md} / ${live.radius_lg} / ${live.radius_pill}`
  };

  const governanceMap = {
    'Review erforderlich': styleObj.governance?.review_required,
    'Accessibility Ziel': styleObj.governance?.accessibility_target,
    'Print-Hinweis': styleObj.governance?.print_guidance,
    'Letzte Aktualisierung': styleObj.governance?.updated_at || 'Keine Angabe'
  };

  const enabledBundleItems = Object.entries(styleObj.export_bundle || {})
    .filter(([, enabled]) => Boolean(enabled))
    .map(([key]) => prettifyKey(key))
    .join(', ');

  const colorSwatches = [
    ['Hintergrund', live.background],
    ['Fläche', live.surface],
    ['Text primär', live.text_primary],
    ['Text sekundär', live.text_secondary],
    ['Primär', live.primary],
    ['Akzent', live.accent]
  ]
    .map(
      ([label, value]) =>
        `<div class="swatch-item"><div class="swatch-dot" style="background:${escapeHtml(value)};"></div><div><span>${escapeHtml(
          label
        )}</span><strong>${escapeHtml(value)}</strong></div></div>`
    )
    .join('');

  const page = document.createElement('section');
  page.style.cssText = 'width: 1200px; padding: 24px; background: #ffffff;';
  page.innerHTML = `
    <style>
      .pdf-sheet {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 18px;
        padding: 24px;
        background: ${live.background};
        color: ${live.text_secondary};
        font-family: ${live.body_font};
      }
      .pdf-headline {
        margin: 0;
        font-size: 38px;
        line-height: 1.1;
        color: ${live.text_primary};
        font-family: ${live.heading_font};
      }
      .pdf-meta {
        margin: 10px 0 0;
        font-size: 15px;
        color: ${live.text_secondary};
      }
      .pdf-grid {
        margin-top: 16px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      .pdf-card {
        border: 1px solid rgba(0, 0, 0, 0.14);
        border-radius: 12px;
        background: ${live.surface};
        padding: 12px;
      }
      .pdf-card.full {
        grid-column: 1 / -1;
      }
      .pdf-card h3 {
        margin: 0 0 6px;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: ${live.text_primary};
      }
      .pdf-card p {
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
      }
      .pdf-list {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 6px;
      }
      .pdf-list li {
        display: grid;
        gap: 2px;
      }
      .pdf-list span {
        font-size: 12px;
        color: ${live.text_secondary};
      }
      .pdf-list strong {
        font-size: 14px;
        color: ${live.text_primary};
      }
      .swatch-grid {
        margin-top: 8px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      .swatch-item {
        display: grid;
        grid-template-columns: 22px 1fr;
        gap: 8px;
        align-items: center;
      }
      .swatch-dot {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.24);
      }
      .swatch-item span,
      .swatch-item strong {
        display: block;
        line-height: 1.2;
      }
      .swatch-item span {
        font-size: 11px;
      }
      .swatch-item strong {
        font-size: 12px;
      }
    </style>
    <div class="pdf-sheet">
      <h1 class="pdf-headline">${escapeHtml(styleObj.style_family.name)}</h1>
      <p class="pdf-meta">Seite 1 von 2 · Stilbeschreibung und Spezifikationen · ${escapeHtml(channelData.label)} · ${escapeHtml(exportDate)}</p>
      <div class="pdf-grid">
        <article class="pdf-card full">
          <h3>Kurzbeschreibung</h3>
          <p>${escapeHtml(styleObj.style_family.summary || info.effect)}</p>
        </article>
        <article class="pdf-card full">
          <h3>Wirkung</h3>
          <p>${escapeHtml(info.effect)}</p>
        </article>
        <article class="pdf-card">
          <h3>Geeignet für</h3>
          <p>${escapeHtml(info.suitable)}</p>
        </article>
        <article class="pdf-card">
          <h3>Weniger geeignet für</h3>
          <p>${escapeHtml(info.avoid)}</p>
        </article>
        <article class="pdf-card">
          <h3>Empfohlen</h3>
          <p>${escapeHtml(info.dos)}</p>
        </article>
        <article class="pdf-card">
          <h3>Vermeiden</h3>
          <p>${escapeHtml(info.donts)}</p>
        </article>
        <article class="pdf-card">
          <h3>Hinweise Web</h3>
          <p>${escapeHtml(info.web)}</p>
        </article>
        <article class="pdf-card">
          <h3>Hinweise Print</h3>
          <p>${escapeHtml(info.print)}</p>
        </article>
        <article class="pdf-card full">
          <h3>Typische Gefahr</h3>
          <p>${escapeHtml(info.risk)}</p>
        </article>
        <article class="pdf-card">
          <h3>${escapeHtml(channelData.rulesTitle)}</h3>
          ${objectListHtml(channelData.rules)}
        </article>
        <article class="pdf-card">
          <h3>${escapeHtml(channelData.templateTitle)}</h3>
          ${objectListHtml(channelData.template)}
        </article>
        <article class="pdf-card full">
          <h3>Aktive Exporte im Bundle</h3>
          <p>${escapeHtml(enabledBundleItems || 'Keine Angabe')}</p>
        </article>
        <article class="pdf-card full">
          <h3>Farben im aktuellen Attribut-Stand</h3>
          <div class="swatch-grid">${colorSwatches}</div>
        </article>
        <article class="pdf-card full">
          <h3>Governance</h3>
          ${objectListHtml(governanceMap)}
        </article>
        <article class="pdf-card full">
          <h3>Aktuelle Attribute</h3>
          ${objectListHtml(liveTokenMap)}
        </article>
      </div>
    </div>
  `;

  return page;
}

function buildPdfPreviewPage(targetChannel) {
  const sourcePreview = document.getElementById('preview-canvas');
  if (!sourcePreview) return null;

  const page = document.createElement('section');
  page.style.cssText = 'width: 1200px; padding: 24px; background: #ffffff;';
  page.innerHTML = `
    <style>
      .pdf-preview-wrap {
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: 18px;
        overflow: hidden;
      }
      .pdf-preview-head {
        padding: 12px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 14px;
        background: #f6f8fb;
        color: #1f2e3b;
      }
      .pdf-preview-slot .preview-canvas {
        min-height: auto;
        height: auto;
        max-height: none;
        overflow: visible;
        border: 0;
        border-radius: 0;
      }
      .pdf-preview-slot .preview-canvas.channel-print .sg-container {
        transform: none;
      }
    </style>
    <div class="pdf-preview-wrap">
      <div class="pdf-preview-head">Seite 2 von 2 · Live-Vorschau im App-Look (${escapeHtml(
        targetChannel === 'print' ? 'Print' : 'Web'
      )})</div>
      <div class="pdf-preview-slot"></div>
    </div>
  `;

  const previewClone = sourcePreview.cloneNode(true);
  previewClone.id = 'pdf-preview-clone';
  previewClone.classList.toggle('channel-web', targetChannel === 'web');
  previewClone.classList.toggle('channel-print', targetChannel === 'print');
  previewClone.style.minHeight = 'auto';
  previewClone.style.maxHeight = 'none';
  previewClone.style.overflow = 'visible';

  const clonedContainer = previewClone.querySelector('.sg-container');
  if (clonedContainer && targetChannel === 'print') {
    clonedContainer.style.transform = 'none';
    clonedContainer.style.margin = '0 auto';
  }

  const slot = page.querySelector('.pdf-preview-slot');
  if (slot) slot.appendChild(previewClone);
  return page;
}

function createPdfRenderHost() {
  const host = document.createElement('div');
  host.style.position = 'absolute';
  host.style.left = '-9999px';
  host.style.top = '0';
  host.style.width = '1200px';
  host.style.zIndex = '-1000';
  // Removed maxHeight and overflow: hidden so html2canvas doesn't clip the render!
  // Removed opacity: 0.01 which can cause the output to be semi-transparent on some browsers.
  document.body.appendChild(host);
  return host;
}

function buildPdfPreviewClone(targetChannel) {
  const sourcePreview = document.getElementById('preview-canvas');
  if (!sourcePreview) return null;

  const previewClone = sourcePreview.cloneNode(true);
  previewClone.id = 'pdf-preview-capture';
  previewClone.classList.toggle('channel-web', targetChannel === 'web');
  previewClone.classList.toggle('channel-print', targetChannel === 'print');
  previewClone.style.minHeight = 'auto';
  previewClone.style.maxHeight = 'none';
  previewClone.style.height = 'auto';
  previewClone.style.overflow = 'visible';

  const clonedContainer = previewClone.querySelector('.sg-container');
  if (clonedContainer && targetChannel === 'print') {
    clonedContainer.style.transform = 'none';
    clonedContainer.style.margin = '0 auto';
  }

  return previewClone;
}

function ensurePdfInfoPanelVisible(previewClone) {
  const infoCard = previewClone?.querySelector('#style-info-card');
  if (!infoCard) return;
  infoCard.classList.remove('hidden');
}

function wrapPreviewCloneForCapture(previewClone) {
  const wrapper = document.createElement('section');
  wrapper.style.cssText = 'width: 1200px; padding: 24px; background: #ffffff;';
  wrapper.appendChild(previewClone);
  return wrapper;
}

function buildPdfCaptureSectionNodes(targetChannel) {
  const pageOneClone = buildPdfPreviewClone(targetChannel);
  const pageTwoClone = buildPdfPreviewClone(targetChannel);
  if (!pageOneClone || !pageTwoClone) return [];

  ensurePdfInfoPanelVisible(pageOneClone);
  ensurePdfInfoPanelVisible(pageTwoClone);

  const pageOneGrid = pageOneClone.querySelector('.sg-grid');
  if (pageOneGrid) pageOneGrid.remove();

  const pageTwoHeader = pageTwoClone.querySelector('.sg-header');
  if (pageTwoHeader) pageTwoHeader.remove();

  return [wrapPreviewCloneForCapture(pageOneClone), wrapPreviewCloneForCapture(pageTwoClone)];
}

function pdfScaleCandidatesFor(element) {
  const width = Math.max(1, Math.ceil(element.scrollWidth || element.clientWidth || 1200));
  const height = Math.max(1, Math.ceil(element.scrollHeight || element.clientHeight || 1600));
  const area = width * height;

  if (area > 3_800_000) return [1.15, 1, 0.9];
  if (area > 2_400_000) return [1.35, 1.15, 1];
  return [1.6, 1.35, 1.15, 1];
}

async function captureElementCanvas(element, scaleCandidates = [1.5, 1]) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  let lastError = null;
  for (const scale of scaleCandidates) {
    try {
      return await html2canvas(element, {
        scale,
        useCORS: true,
        allowTaint: false, // WICHTIG: Tainted canvases werfen einen Error bei toDataURL()!
        logging: false,
        backgroundColor: '#ffffff',
        removeContainer: true
      });
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Canvas Rendering fehlgeschlagen');
}

function addCanvasPageToPdf(pdf, canvas, addNewPage = false) {
  if (addNewPage) pdf.addPage();

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 8;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;
  const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
  const renderWidth = canvas.width * ratio;
  const renderHeight = canvas.height * ratio;
  const x = (pageWidth - renderWidth) / 2;
  const y = (pageHeight - renderHeight) / 2;

  pdf.addImage(canvas, 'PNG', x, y, renderWidth, renderHeight, undefined, 'FAST');
}

function hexToRgb(hexColor, fallback = [255, 255, 255]) {
  const value = (hexColor || '').replace('#', '').trim();
  if (![3, 6].includes(value.length)) return fallback;
  const normalized = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
  const intVal = Number.parseInt(normalized, 16);
  if (Number.isNaN(intVal)) return fallback;
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

function addSimplePdfFallback(pdf, styleObj, targetChannel) {
  const info = handbookInfoFor(styleObj);
  const channelData = getChannelSpecData(styleObj, targetChannel);
  const live = getLiveExportTokens();
  const [bgR, bgG, bgB] = hexToRgb(live.background, [249, 250, 252]);
  const [surfaceR, surfaceG, surfaceB] = hexToRgb(live.surface, [255, 255, 255]);
  const [textR, textG, textB] = hexToRgb(live.text_primary, [24, 39, 58]);
  const [mutedR, mutedG, mutedB] = hexToRgb(live.text_secondary, [78, 92, 110]);
  const [primaryR, primaryG, primaryB] = hexToRgb(live.primary, [15, 118, 110]);
  const [accentR, accentG, accentB] = hexToRgb(live.accent, [232, 146, 43]);

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const gap = 4;
  const cardWidth = (pageWidth - margin * 2 - gap) / 2;

  const drawHeader = (title, subtitle) => {
    pdf.setFillColor(bgR, bgG, bgB);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    pdf.setTextColor(textR, textG, textB);
    pdf.text(title, margin, 18);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(mutedR, mutedG, mutedB);
    pdf.text(subtitle, margin, 24);
  };

  const drawCard = (x, y, width, title, body, minHeight = 26) => {
    const maxTextWidth = width - 6;
    const bodyLines = pdf.splitTextToSize(body || 'Keine Angabe', maxTextWidth);
    const cardHeight = Math.max(minHeight, 10 + bodyLines.length * 3.8 + 7);

    pdf.setDrawColor(207, 216, 227);
    pdf.setFillColor(surfaceR, surfaceG, surfaceB);
    pdf.roundedRect(x, y, width, cardHeight, 2.4, 2.4, 'FD');

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(textR, textG, textB);
    pdf.text(title, x + 3, y + 6);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(mutedR, mutedG, mutedB);
    pdf.text(bodyLines, x + 3, y + 10);

    return cardHeight;
  };

  drawHeader(styleObj.style_family.name, `Seite 1 von 2 · Stilbeschreibung · ${channelData.label}`);
  let y = 30;

  y += drawCard(margin, y, pageWidth - margin * 2, 'Kurzbeschreibung', styleObj.style_family.summary || info.effect, 24) + gap;
  y += drawCard(margin, y, pageWidth - margin * 2, 'Wirkung', info.effect, 24) + gap;

  const leftStart = y;
  const left1 = drawCard(margin, leftStart, cardWidth, 'Geeignet für', info.suitable, 30);
  const right1 = drawCard(margin + cardWidth + gap, leftStart, cardWidth, 'Weniger geeignet für', info.avoid, 30);
  y = leftStart + Math.max(left1, right1) + gap;

  const left2 = drawCard(margin, y, cardWidth, 'Empfohlen', info.dos, 30);
  const right2 = drawCard(margin + cardWidth + gap, y, cardWidth, 'Vermeiden', info.donts, 30);
  y += Math.max(left2, right2) + gap;

  const left3 = drawCard(margin, y, cardWidth, 'Hinweise Web', info.web, 26);
  const right3 = drawCard(margin + cardWidth + gap, y, cardWidth, 'Hinweise Print', info.print, 26);
  y += Math.max(left3, right3) + gap;

  drawCard(margin, y, pageWidth - margin * 2, 'Typische Gefahr', info.risk, 24);

  pdf.addPage();
  drawHeader(`${styleObj.style_family.name} · Live-Attribute`, 'Seite 2 von 2 · Stabilmodus');
  y = 30;

  y += drawCard(margin, y, pageWidth - margin * 2, channelData.rulesTitle, formatSpecValue(channelData.rules), 30) + gap;
  y += drawCard(margin, y, pageWidth - margin * 2, channelData.templateTitle, formatSpecValue(channelData.template), 26) + gap;

  const swatchY = y;
  const swatchCardHeight = 36;
  pdf.setDrawColor(207, 216, 227);
  pdf.setFillColor(surfaceR, surfaceG, surfaceB);
  pdf.roundedRect(margin, swatchY, pageWidth - margin * 2, swatchCardHeight, 2.4, 2.4, 'FD');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(textR, textG, textB);
  pdf.text('Farben', margin + 3, swatchY + 6);

  const swatches = [
    ['BG', live.background, bgR, bgG, bgB],
    ['Fläche', live.surface, surfaceR, surfaceG, surfaceB],
    ['Primär', live.primary, primaryR, primaryG, primaryB],
    ['Akzent', live.accent, accentR, accentG, accentB]
  ];

  let swX = margin + 3;
  swatches.forEach(([label, value, r, g, b]) => {
    pdf.setFillColor(r, g, b);
    pdf.roundedRect(swX, swatchY + 10, 10, 10, 1.4, 1.4, 'F');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8.5);
    pdf.setTextColor(textR, textG, textB);
    pdf.text(String(label), swX + 12, swatchY + 14);
    pdf.setTextColor(mutedR, mutedG, mutedB);
    pdf.text(String(value), swX + 12, swatchY + 18);
    swX += 45;
  });

  y += swatchCardHeight + gap;
  y += drawCard(margin, y, pageWidth - margin * 2, 'Typografie', `Überschrift: ${live.heading_font}\nFließtext: ${live.body_font}`, 24) + gap;
  drawCard(
    margin,
    y,
    pageWidth - margin * 2,
    'Formen',
    `Radius sm: ${live.radius_sm}, md: ${live.radius_md}, lg: ${live.radius_lg}, pill: ${live.radius_pill}`,
    24
  );
}

function escapeHtmlAttribute(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function collectPrintCssVariableMap() {
  const variableNames = [
    '--ui-bg',
    '--ui-surface',
    '--ui-surface-muted',
    '--ui-border',
    '--ui-text',
    '--ui-text-muted',
    '--ui-accent',
    '--ui-accent-hover',
    '--ui-accent-soft',
    '--ui-success',
    '--ui-radius-sm',
    '--ui-radius-md',
    '--ui-radius-lg',
    '--ui-shadow',
    '--pv-bg-main',
    '--pv-surface',
    '--pv-text-dark',
    '--pv-text-main',
    '--pv-text-light',
    '--pv-color-1',
    '--pv-color-2',
    '--pv-color-1-soft',
    '--pv-font-heading',
    '--pv-font-body',
    '--pv-radius-sm',
    '--pv-radius-md',
    '--pv-radius-lg',
    '--pv-radius-pill',
    '--pv-shadow-soft',
    '--pv-shadow-card',
    '--pv-shadow-hover'
  ];

  const computed = getComputedStyle(document.documentElement);
  return variableNames
    .map((name) => [name, computed.getPropertyValue(name).trim()])
    .filter(([, value]) => Boolean(value));
}

function sanitizePreviewCloneForPrint(previewClone, { showInfoCard = false } = {}) {
  if (!previewClone) return;
  previewClone.querySelectorAll('.sg-header .info-btn').forEach((btn) => btn.remove());
  const infoCard = previewClone.querySelector('#style-info-card');
  if (!infoCard) return;
  if (showInfoCard) {
    infoCard.classList.remove('hidden');
  } else {
    infoCard.remove();
  }
}

function buildPrintSheetMarkup(targetChannel) {
  const pageOneClone = buildPdfPreviewClone(targetChannel);
  const pageTwoClone = buildPdfPreviewClone(targetChannel);
  if (!pageOneClone || !pageTwoClone) return null;

  sanitizePreviewCloneForPrint(pageOneClone, { showInfoCard: true });
  sanitizePreviewCloneForPrint(pageTwoClone, { showInfoCard: false });

  const pageOneGrid = pageOneClone.querySelector('.sg-grid');
  if (pageOneGrid) pageOneGrid.remove();

  const pageTwoHeader = pageTwoClone.querySelector('.sg-header');
  if (pageTwoHeader) pageTwoHeader.remove();

  return `
    <section class="print-sheet">
      ${pageOneClone.outerHTML}
    </section>
    <section class="print-sheet">
      ${pageTwoClone.outerHTML}
    </section>
  `;
}

function openBrowserPrintExport(targetChannel, currentStyleObj) {
  const sheetMarkup = buildPrintSheetMarkup(targetChannel);
  if (!sheetMarkup) {
    throw new Error('Druck-Markup für den PDF-Export konnte nicht erstellt werden.');
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Bitte Popups erlauben, damit der PDF-Export gestartet werden kann.');
    return false;
  }

  const fileNameBase = `StyleGuider_${slugifyName(currentStyleObj.style_family.name) || 'stil'}_${targetChannel}_${todayISODate()}`;
  const safeTitle = escapeHtmlAttribute(fileNameBase);
  const styleHref = escapeHtmlAttribute(new URL('style.css', window.location.href).href);
  const cssVariableRules = collectPrintCssVariableMap()
    .map(([name, value]) => `${name}: ${value};`)
    .join('\n');

  printWindow.document.open();
  printWindow.document.write(`
    <!doctype html>
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${safeTitle}</title>
        <link rel="stylesheet" href="${styleHref}" />
        <style>
          :root {
            ${cssVariableRules}
          }
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          body {
            margin: 0;
            background: #ffffff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-sheet {
            break-after: page;
            page-break-after: always;
          }
          .print-sheet:last-child {
            break-after: auto;
            page-break-after: auto;
          }
          .print-sheet .preview-canvas {
            min-height: auto;
            margin: 0;
            border: 0;
            border-radius: 0;
            box-shadow: none;
          }
          .print-sheet .sg-container {
            width: 100%;
            max-width: none;
            margin: 0;
            padding: 24px;
            transform: none !important;
          }
          @media screen {
            body {
              background: #eef2f7;
              padding: 14px;
            }
            .print-sheet {
              max-width: 1120px;
              margin: 0 auto 14px;
              border: 1px solid #d8dee5;
              border-radius: 12px;
              overflow: hidden;
              background: #ffffff;
            }
          }
          @media print {
            .print-sheet {
              border: 0;
              border-radius: 0;
            }
          }
        </style>
      </head>
      <body>
        ${sheetMarkup}
        <script>
          window.addEventListener('load', () => {
            setTimeout(() => {
              window.focus();
              window.print();
            }, 350);
          });
          window.addEventListener('afterprint', () => {
            setTimeout(() => window.close(), 200);
          });
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
  return true;
}

async function savePdfBlob(blob, fileName) {
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        startIn: 'downloads',
        types: [{ description: 'PDF', accept: { 'application/pdf': ['.pdf'] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      if (err?.name === 'AbortError') return;
      console.warn('showSaveFilePicker fehlgeschlagen, fallback auf Download.', err);
    }
  }

  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
}

async function exportStylePdf(targetChannel) {
  try {
    const currentStyleObj = findStyleById(currentStyleId);
    if (!currentStyleObj) return;

    closeModal();
    const opened = openBrowserPrintExport(targetChannel, currentStyleObj);
    if (opened) {
      setSaveStyleFeedback('Druckdialog geöffnet. Wähle "Als PDF sichern".', 'success');
    }
  } catch (err) {
    console.error('PDF Export fehlgeschlagen:', err);
    alert('PDF Export fehlgeschlagen. Bitte versuche es erneut.');
  }
}

function openModal() {
  generateExports();
  exportModal.classList.remove('hidden');
}

function closeModal() {
  exportModal.classList.add('hidden');
}

if (directExportBtn) {
  directExportBtn.addEventListener('click', openModal);
}

if (pdfSaveBtn) {
  pdfSaveBtn.addEventListener('click', () => {
    exportStylePdf(currentChannel);
  });
}

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
