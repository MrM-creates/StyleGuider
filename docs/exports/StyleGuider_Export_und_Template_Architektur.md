> Produkt: StyleGuider | Zweck: StyleGuider - Export- und Template-Architektur | Stand: Version 1.0 - Arbeitsfassung März 2026

# StyleGuider - Export- und Template-Architektur

_Arbeitsdokument für Produkt- und Systementscheidungen_

> Leitprinzip: Ein Stil ist kein einzelnes Layout, sondern ein Regelwerk. Exporte müssen deshalb sowohl für Menschen als auch für Maschinen verständlich sein.

Ziel. Dieses Dokument definiert, welche Exporte StyleGuider bereitstellen soll, wie diese Exporte zusammenhängen und welche kanalbezogenen Vorlagen daraus abgeleitet werden. Der Fokus liegt auf konsistentem Brand Design über Website, Print und KI-gestützte Weiterverarbeitung.

## 1. Architekturprinzipien

- Ein zentrales Brand System steuert die gesamte On- und Offline-Kommunikation.

- Kanäle erhalten keine eigenen Stile, sondern kanalbezogene Ableitungen desselben Stils.

- Jeder Export muss eindeutig definieren, welche Information autoritativ ist und welche Information nur Illustration oder Guidance darstellt.

- System Exports sind die Quelle der Wahrheit; Human Exports und Channel Exports sind lesbare bzw. anwendbare Ableitungen.

- Jede Stilfamilie muss Web-, Print- und KI-Anwendungsfälle abdecken können.

## 2. Exportgruppen

| Gruppe | Export | Inhalt | Priorität |
| --- | --- | --- | --- |
| System | Design Tokens JSON | Semantische Farben, Typorollen, Spacing, Radius, Border, Shadow, Motion, States, Channel Overrides | Pflicht |
| System | Theme JSON | Direkt nutzbare Theme-Struktur für Web/App-Implementierung; Alias- und Semantic-Layer | Pflicht |
| System | CSS Variables | Web-Export für :root, State Tokens und thematische Aliase | Pflicht |
| Human | Brand Guide PDF | Markenwirkung, Regeln, Beispiele, Do/Don't, Kanalhinweise | Pflicht |
| Human | Quick Style Sheet | Kompakte 1-2 Seiten für schnelles internes Arbeiten | Sinnvoll |
| Channel | Web Template Specs | Abschnitts- und Seitenvorlagen für Website und Landingpages | Pflicht |
| Channel | Print Template Specs | Formate, Beschnitt, Raster, Weißraum, Satzspiegel, Exportregeln | Pflicht |
| Channel | Social Template Specs | Feeds, Stories, Ads, Thumbnail-Regeln, Safe Zones | Sinnvoll |
| Channel | Presentation Theme | Titel-, Inhalts- und Bildfolien; Diagramm- und Tabellenstil | Optional |
| AI | UI/Code Agent Prompt | Strikter Umsetzungs-Prompt für Coding-Agenten | Pflicht |
| AI | Brand/Copy Agent Prompt | Prompt für Text-, Positionierungs- und Copy-Aufgaben | Sinnvoll |
| AI | Image Style Pack | Farbwelt, Lichtcharakter, Materialität, Kompositionsregeln, Negativregeln | Pflicht |

## 3. Reihenfolge der Exportlogik

- 1. Stilfamilie und Brand DNA definieren.

- 2. Basistokens erzeugen und validieren.

- 3. Channel Overrides ergänzen, wo ein Medium eigene Anforderungen hat.

- 4. Daraus Human Exports und Template Specs erzeugen.

- 5. Erst zuletzt AI-Prompts und Bildstil-Pakete ableiten.

## 4. Pflichtinhalte pro Export

### 4.1 Design Tokens JSON

- Token-Layer: primitive, semantic, component und channel.

- Farbrollen: primary, secondary, accent, surface, text, border, state, focus.

- Typorollen: display, h1-h6, body, small, label, button, caption.

- Layoutrollen: spacing scale, radius scale, border widths, elevation, section gaps.

- State-System: hover, active, focus, disabled, success, warning, error, info.

- Metadaten: Stilfamilie, Version, Zielkanäle, Validierungsstatus.

### 4.2 Theme JSON / CSS Variables

- Direkte Nutzung für Web-Projekte.

- Aliase statt reiner Hex-Code-Listen.

- Light Theme als Minimum; Dark Theme optional.

- Klare Hook-Namen für Komponenten wie Button, Input, Card, Section und Nav.

### 4.3 Brand Guide PDF

- Kurzbeschreibung der Stilfamilie und Markenwirkung.

- Farb- und Typografieübersicht.

- Regeln für Komponenten, Bildsprache und Tonalität.

- Do/Don't Beispiele.

- Channel-Hinweise für Web, Print, Social und Präsentationen.

### 4.4 Print Rules / Press Spec

- Dokumentgrößen, Beschnitt, Sicherheitsabstände, Raster.

- Satzspiegel und Weißraum-Disziplin.

- Empfehlung für PDF/X-4 und saubere Ausgabe aus dem Quelltool.

- Hinweise zur Bild-/Text-Gewichtung und zur Lesbarkeit auf Distanz.

### 4.5 AI Exports

- Getrennte Prompts für Code/UI, Brand/Copy und Bildgenerierung.

- Stets mit klarer Liste an Muss-Regeln, Kann-Regeln und Verbotsregeln.

- Immer Bezug auf Stilfamilie, Zielkanal und gewünschte Ergebnisform.

## 5. Template-Matrix pro Kanal

> Wichtig: AI Prompts dürfen nie die Quelle der Wahrheit sein. Sie sind immer abgeleitet. Sonst wird aus Systemarchitektur sehr schnell höflich formuliertes Rätselraten.

| Kanal | Vorlagentyp | Mindestinhalt | Besonderheit | Phase |
| --- | --- | --- | --- | --- |
| Web | Startseite | Hero, Intro, CTA, Karten, Footer | starke Navigations- und Fokuslogik | MVP |
| Web | Landingpage | Hero, Benefits, Social Proof, CTA | conversion-fokussiert | MVP |
| Web | About / Service | Text-Bild-Rhythmus, Listen, Kontaktblock | editorial oder utilitär je nach Stil | MVP |
| Print | Flyer A5 / A4 | Titelzone, Kernaussage, Kontakt, Bildfläche | Beschnitt und Lesedistanz wichtig | MVP |
| Print | Visitenkarte | Logo-/Name-Zone, Kontakt, Rückseite optional | extreme Reduktion nötig | MVP |
| Print | One-Pager PDF | Headline, Nutzen, Leistungen, CTA | druck- und mailtauglich | MVP |
| Social | Post 1:1 / 4:5 | Headline, Bildzone, Brand Marker | Safe Areas, mobile Lesbarkeit | Phase 2 |
| Social | Story 9:16 | Headline, CTA, oberer/unterer Sicherheitsbereich | plattformtypische Überlagerungen | Phase 2 |
| Presentation | Titel- und Inhaltsfolie | Titel, Subtitle, Bild oder Grafik | Tabellen- und Chartstil nötig | Phase 3 |

## 6. Kanalregeln statt Kanalbrüche

Website, Flyer und Visitenkarte dürfen sich in Rhythmus, Dichte und Flächennutzung unterscheiden, müssen aber dieselbe Stilidentität tragen. StyleGuider erzeugt daher keine isolierten Medien-Templates, sondern kanalgebundene Ableitungen eines gemeinsamen Systems.

- Web priorisiert Interaktion, Kontrast, Fokus, Target Size und responsives Verhalten.

- Print priorisiert Satzspiegel, Drucktauglichkeit, Distanzlesbarkeit und Produktionssicherheit.

- Social priorisiert Aufmerksamkeit, Wiedererkennbarkeit und mobile Lesbarkeit.

- Präsentationen priorisieren Übersicht, Folienrhythmus und Diagramm-Kompatibilität.

## 7. MVP-Empfehlung

- Pflicht ab Tag 1: Design Tokens JSON, Theme JSON, CSS Variables, Brand Guide PDF, Web Template Specs, Print Template Specs, UI/Code Agent Prompt, Image Style Pack.

- Früh nachziehen: Quick Style Sheet, Brand/Copy Agent Prompt, Social Template Specs.

- Später: Presentation Theme, Tool-spezifische Exporte für Figma oder Frameworks.

> Produktentscheidung: Der größte Nutzen entsteht nicht durch möglichst viele Exporte, sondern durch ein sauberes Gefälle von Master-Daten zu anwendungsnahen Ableitungen.