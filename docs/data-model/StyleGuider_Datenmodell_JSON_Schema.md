# StyleGuider – Operatives Datenmodell und JSON-Schema

_Präzise Spezifikation für Stilfamilien, Tokens, Kanalregeln, Template-Spezifikationen und Exporte_

> Ziel dieses Dokuments ist ein implementierbares Datenmodell für StyleGuider. Es beschreibt, wie ein Brand-System in strukturierte Objekte zerlegt wird, wie daraus kanalbezogene Templates entstehen und welche Exporte daraus generiert werden.

## 1. Architekturprinzip

StyleGuider arbeitet mit vier Ebenen:

- Brand System: globale Markenlogik mit Stilfamilie, Markenwirkung, Designachsen und Grundregeln.

- Design Tokens: semantische Werte für Farben, Typografie, Abstände, Formen, Zustände und Komponenten.

- Channel Rules: kanalbezogene Anpassungen für Web, Print, Social, Präsentation und KI-Outputs.

- Template Specs: konkrete Layout- und Inhaltsvorgaben für einzelne Kommunikationsmittel.

## 2. Kernobjekte des Datenmodells

| Objekt | Zweck | Pflichtfelder | Beispiel |
| --- | --- | --- | --- |
| style_family | Definiert die Stilfamilie | id, name, positioning, tone, recommended_for | minimal_swiss |
| brand_profile | Beschreibt Markenabsicht | audience, values, personality, communication_goals | vertrauenswürdig, klar |
| design_axes | Steuert stilistische Ausprägung | emotionality, boldness, luxury, precision, warmth | 0–100 Skalen |
| tokens | Systemische Gestaltungswerte | color, type, space, radius, border, shadow, motion | semantic tokens |
| channel_rules | Medienlogik pro Kanal | web, print, social, presentation, image_ai | Overlays/Overrides |
| template_specs | Konkrete Vorlagen | layout_zones, hierarchy, components, export_rules | flyer_a5, hero_page |
| export_bundle | Ausgabeobjekte | json, css, guide_pdf, prompt_pack | system export |

## 3. Struktur einer Stilfamilie

| Feld | Typ | Beschreibung |
| --- | --- | --- |
| id | string | Eindeutige maschinenlesbare Kennung, z. B. premium_luxury |
| label | string | Nutzerfreundlicher Anzeigename |
| intent | object | Markenwirkung, Tonalität, geeignete Branchen, ungeeignete Einsatzfelder |
| axes_profile | object | Sollwerte auf den Designachsen |
| visual_rules | object | Farb-, Typo-, Layout-, Bild- und Komponentenprinzipien |
| dos_donts | object | Regeln, Verbote und qualitative Guardrails |
| channel_fit | object | Eignung je Kanal inkl. Priorität oder Warnhinweis |
| default_templates | array | Empfohlene Vorlagen für Web, Print, Social, etc. |

Jede Stilfamilie wird als eigenständiges Objekt gespeichert. Das Objekt beschreibt nicht nur Farben oder Schriften, sondern die gesamte visuelle Logik.

## 4. Designachsen

| Achse | Bedeutung | Skala | Nutzen |
| --- | --- | --- | --- |
| Sachlich  <->  Emotional | Steuert Rationalität vs. Wärme | 0–100 | prägt Tonalität, Typografie und Bildwelt |
| Reduziert  <->  Expressiv | Bestimmt visuelle Zurückhaltung | 0–100 | prägt Dichte, Akzente und Komposition |
| Konservativ  <->  Mutig | Steuert Risikograd | 0–100 | wichtig für Branchen- und Zielgruppenfit |
| Präzise  <->  Weich | Steuert Kanten, Radius, Rastergefühl | 0–100 | prägt Komponenten und Layout |
| Zugänglich  <->  Luxuriös | Steuert Nähe vs. Exklusivität | 0–100 | prägt Sprache, Weißraum und Materialität |
| Print-first  <->  Digital-first | Bestimmt Kanalgewichtung | 0–100 | steuert Vorlagen- und Exportpriorität |

Die App sollte Stile nicht direkt aus Farben ableiten, sondern zuerst über normierte Achsen bestimmen. Diese Achsen bilden die Brücke zwischen Markenziel und visueller Sprache.

## 5. Token-Modell

Das Token-Modell ist der Kern des Exports. Tokens müssen semantisch benannt und kanalübergreifend verwendbar sein.

### 5.1 Color Tokens

- base: primitive Farben wie gray_900, blue_500, sand_100

- semantic: background, surface, text_primary, text_muted, accent, border, success, warning, error

- interactive: button_primary_bg, button_primary_text, input_focus_ring, link_hover

### 5.2 Typography Tokens

- font_family: display, heading, body, ui

- font_size: display_xl bis body_sm

- font_weight, line_height, letter_spacing

- role mappings: hero_title, section_title, card_title, body_text, label, caption

### 5.3 Spatial Tokens

- spacing scale, z. B. 4, 8, 12, 16, 24, 32, 48, 64

- container widths, max text widths, section paddings

- gaps für grids und components

### 5.4 Shape & Surface Tokens

- radius: sm, md, lg, xl

- border width und border style

- shadow/elevation für cards, menus, modals

- surface tiers für layers

### 5.5 Motion & State Tokens

- transition duration und easing

- state colors und emphasis

- focus ring definition

- disabled, hover, active, success, error

## 6. Kanalregeln

| Kanal | Ziel | Pflichtregeln | Typische Overrides | Outputs |
| --- | --- | --- | --- | --- |
| Web | Interaktion und Lesbarkeit | WCAG, Fokus, States, responsive rules | spacing, typography scale, component states | CSS, theme JSON, UI prompt |
| Print | Drucksicherheit und Hierarchie | Beschnitt, Weißraum, PDF/X-4 Guidance | font sizing, margins, image/text ratio | print spec, template spec |
| Social | Wiedererkennbarkeit in kleinen Flächen | safe areas, hierarchy in thumbnails | contrast, headline brevity, framing | asset spec, image prompt |
| Präsentation | Schnelle Erfassbarkeit | große Titel, hohe Lesedistanz | type scale, page density | slide spec |
| Image AI | Stimmige Bildwelt | mood, palette, materiality, light logic | camera/render tendencies | prompt pack, style JSON |

Channel Rules überschreiben das Brand System nicht, sondern passen es für den jeweiligen Einsatz an.

## 7. Template-Spezifikation

| Feld | Typ | Beschreibung |
| --- | --- | --- |
| template_id | string | z. B. flyer_a5_portrait oder web_homepage_hero |
| channel | enum | web, print, social, presentation, image_ai |
| goal | string | z. B. Awareness, Info, Conversion, Trust |
| layout_zones | array | Header, Hero, Proof, CTA, Footer etc. |
| content_slots | array | Pflicht- und optionale Inhaltselemente |
| component_rules | object | zugelassene Komponenten und Varianten |
| hierarchy_rules | object | Titelgewichtung, Bild/Text-Balance, CTA-Priorität |
| export_rules | object | Format, Ratio, safe area, bleed, resolution, file types |

Templates sind eigenständige Objekte. Sie erben Tokens und Channel Rules, definieren aber zusätzlich Zonen, Hierarchien und Inhaltslogik.

## 8. Export-Bundle-Modell

Jeder App-Lauf sollte ein konsistentes Export-Bundle erzeugen. Die Exporte gehören logisch zusammen und teilen dieselbe Version.

- system_export: Tokens JSON, Theme JSON, CSS Variables

- human_export: Brand Guide PDF, Quick Rules, Do/Don't Sheet

- channel_export: Web-, Print-, Social- oder Präsentations-Specs

- ai_export: UI/Code Prompt, Brand/Copy Prompt, Image Style Pack

- manifest: Metadaten mit Stil-ID, Versionsnummer, Zeitstempel, Kanalpaketen

## 9. Versionierung und Governance

- Jede Stilfamilie, jedes Token-Set und jedes Template erhält eine eigene Version. Änderungen an Farbrollen oder Typorollen sind breaking changes.

- Exports müssen eine gemeinsame release_id enthalten, damit CSS, JSON, PDFs und Prompts auf demselben Systemstand basieren.

- Validation Rules prüfen Vollständigkeit, Kontraste, Pflicht-States, fehlende Kanalregeln und unzulässige Token-Kombinationen.

## 10. Minimales JSON-Schema (vereinfachtes Beispiel)

```json
{
  "style_family": {
    "id": "warm_human",
    "label": "Warm Human",
    "axes_profile": {
      "emotionality": 78,
      "expressiveness": 42,
      "boldness": 35,
      "precision": 38,
      "luxury": 24,
      "digital_first": 46
    }
  },
  "tokens": {
    "color": { "...": "..." },
    "type": { "...": "..." },
    "space": { "...": "..." },
    "radius": { "...": "..." }
  },
  "channel_rules": {
    "web": { "...": "..." },
    "print": { "...": "..." }
  },
  "template_specs": [
    { "template_id": "flyer_a5_portrait", "channel": "print" },
    { "template_id": "web_homepage_hero", "channel": "web" }
  ]
}
```

## 11. Implementierungsreihenfolge

1. Stilfamilien als strukturierte Objekte definieren.

2. Designachsen und Scoring-Modell festlegen.

3. Token-Schema finalisieren.

4. Channel Rules und Template Specs ergänzen.

5. Export-Bundle und Manifest standardisieren.

6. Validatoren und Guardrails implementieren.

## 12. Ergebnis für StyleGuider

Mit diesem Datenmodell wird StyleGuider von einer Stil-Ideensammlung zu einem reproduzierbaren Brand-System. Die App kann Stile nicht nur benennen, sondern in maschinenlesbare Regeln, kanalbezogene Vorlagen und konkrete Exporte überführen.