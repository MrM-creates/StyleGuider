> Produkt: StyleGuider | Zweck: StyleGuider - Präzise Specs für die Systemarchitektur | Stand: Version 1.0 - Arbeitsfassung März 2026

# StyleGuider - Präzise Specs für die Systemarchitektur

_Arbeitsdokument für Produkt- und Systementscheidungen_

> Grundsatz: StyleGuider ist keine Farbspiel-App, sondern eine regelbasierte Brand-System-Maschine. Entscheidungen müssen nachvollziehbar, testbar und exportierbar sein.

Ziel. Dieses Dokument beschreibt die empfohlene Systemarchitektur von StyleGuider so präzise, dass daraus UI, Datenmodell, Regelengine, Exporte und spätere Implementierung direkt abgeleitet werden können.

## 1. Systemziel

- Fundierte Stilfamilien als Ausgangspunkt bereitstellen.

- Brand DNA, Zielkanal und Anwendungszweck in konkrete Systementscheidungen übersetzen.

- Guardrails für Lesbarkeit, Konsistenz und Produktionsfähigkeit bereitstellen.

- Ein einziges Style-System in mehrere Medien und KI-Workflows übersetzen.

- Human- und Machine-Exports aus derselben Quelle ableiten.

## 2. Hauptmodule

| Modul | Aufgabe | Kernoutput | MVP |
| --- | --- | --- | --- |
| Input Engine | Nutzerangaben erfassen und normalisieren | Brand DNA, Kanalpriorität, Stilpräferenz, Referenzen | Ja |
| Style Family Engine | passende Stilfamilie bestimmen | gewählte Stilfamilie mit Confidence Score | Ja |
| Rule Engine | Stilfamilie in konkrete Regeln übersetzen | Farb-, Typo-, Shape- und Layoutregeln | Ja |
| Guardrail Engine | Prüfungen und Korrekturen durchführen | WCAG-, Konsistenz- und Produktions-Checks | Ja |
| Preview Engine | visuelle Vorschau und Varianten zeigen | Preview-Karten und Kanalbeispiele | Ja |
| Template Engine | kanalbezogene Vorlagen ableiten | Web-, Print- und Social-Template Specs | Ja |
| Export Engine | strukturierte Outputs erzeugen | JSON, CSS, PDF, Prompts, Style Packs | Ja |
| Reference Analyzer | Best-Practice Uploads auswerten | extrahierte Tokens und Stilhinweise | Phase 2 |
| Versioning Layer | Varianten, Historie und Freigaben verwalten | Versionen, Diffs, Status | Phase 2 |

## 3. Kernfluss

- Nutzer wählt Stilrichtung, Markenziele, Kanäle und ggf. Referenzen.

- Input Engine normiert diese Angaben auf interne Achsen und Prioritäten.

- Style Family Engine mappt die Eingaben auf eine Stilfamilie oder auf zwei naheliegende Kandidaten.

- Rule Engine erzeugt aus der Stilfamilie ein konkretes Token- und Regelset.

- Guardrail Engine prüft Lesbarkeit, Kontrast, Rollenkonsistenz und Medien-Tauglichkeit.

- Preview Engine zeigt Vorschau auf Website, Flyer und weitere Templates.

- Export Engine erzeugt die finalen System-, Human-, Channel- und AI-Exports.

## 4. Eingabemodell

### 4.1 Pflichtinputs

- Markenwirkung: z. B. sachlich, warm, mutig, luxuriös, zugänglich.

- Hauptkanäle: Web, Print, Social, Präsentation.

- Branche oder Nutzungskontext.

- Priorität: digital-first, balanced oder print-first.

- gewünschte Stilintensität: reduziert, ausgewogen, expressiv.

### 4.2 optionale Inputs

- Referenzseiten, Screenshots oder Designbeispiele.

- bestehende Markenfarben oder Fonts.

- Ausschlussregeln: z. B. keine Serifen, keine Pastelltöne, kein Luxury-Look.

- Barrierefreiheitsniveau oder Accessibility-Fokus.

## 5. Interne Entscheidungsachsen

| Achse | Pole | Nutzen |
| --- | --- | --- |
| Sachlichkeit | sachlich - emotional | markiert Rationalität vs. Nähe |
| Intensität | reduziert - expressiv | steuert visuelle Lautstärke |
| Mut | konservativ - mutig | steuert Innovationsgrad |
| Wertigkeit | zugänglich - luxuriös | steuert Premium-Anmutung |
| Medienfokus | print-first - digital-first | steuert Kanalableitungen |
| Form | präzise - weich | steuert Shape- und UI-Anmutung |

StyleGuider sollte intern nicht primär mit Stilnamen rechnen, sondern mit Achsen. Stilfamilien sind abgeleitete Cluster, keine primitive Eingabelogik.

## 6. Stilfamilien-Engine

- Die Engine bewertet die Achsenwerte und ermittelt die geeignetste Stilfamilie.

- Ausgabe: Stilfamilie, Confidence Score, alternative Stilfamilie, Begründung.

- Beispiel: hohe Sachlichkeit, hohe Reduktion, hohe Präzision und moderate Wertigkeit führen typischerweise zu Minimal Swiss.

- Wenn zwei Familien nahe beieinander liegen, darf die UI bewusst eine Wahl anbieten statt künstliche Sicherheit vorzutäuschen.

## 7. Regelengine

### 7.1 Verantwortungsbereich

- Leitet aus der Stilfamilie konkrete Tokens und Regeln ab.

- Unterscheidet primitive Tokens, semantische Tokens, Komponentenregeln und Kanal-Overrides.

- Hält die semantische Logik stabil, auch wenn Farben oder Fonts später ersetzt werden.

### 7.2 Ergebnisstruktur

- Color Roles: primary, secondary, accent, neutral, surface, text, border, state, focus.

- Type Roles: display, heading 1-6, body, small, caption, label, button.

- Layout Roles: spacing scale, section spacing, max content width, grid hints.

- Shape Roles: radius scale, border weights, line character.

- Elevation Roles: none, subtle, moderate, strong.

- Component Rules: button hierarchy, card logic, input logic, navigation logic.

## 8. Guardrail-Engine

Guardrails sind kein nachträglicher Alarm, sondern Teil des Systems. Die App soll schlechte Kombinationen verhindern, bevor sie exportiert werden.

- Kontrast-Checks für Text, UI-Komponenten und Fokuszustände.

- Prüfung von Rollenkonsistenz: nicht drei Primärfarben mit gleicher Wichtigkeit.

- Prüfung von Typohierarchie: ausreichende Differenz zwischen Display, Heading und Body.

- Prüfung auf Medienkollisionen: z. B. webtauglich, aber für Print zu kontrastarm oder zu dünn.

- Auto-Korrektur oder klare Empfehlung, wenn Regeln verletzt sind.

## 9. Vorschau-Engine

- Zeigt das System immer in mehreren Kontexten: Website, Flyer, Visitenkarte.

- Vorschau muss Stil, Hierarchie und Kanalverhalten sichtbar machen, nicht nur eine Farbkarte.

- Sinnvoll sind Vergleichsansichten: neutraler Basismodus vs. angewandte Stilfamilie.

- Vorschau-Komponenten sollen echte Zustände zeigen: normal, hover, focus, disabled.

## 10. Template-Engine

- Erzeugt kanalgebundene Vorlagen aus einem gemeinsamen Regelwerk.

- Web Templates: Homepage, Landingpage, About/Service, Kontakt.

- Print Templates: Flyer, Visitenkarte, One-Pager PDF.

- Social und Präsentation können nach dem MVP ergänzt werden.

- Templates enthalten nicht nur Layoutblöcke, sondern auch Inhaltszonen, Prioritäten und Safe Areas.

## 11. Datenmodell - empfohlene Kernobjekte

## 12. API- und Service-Denke

- Die Rule Engine und Guardrail Engine sollten logisch getrennt bleiben.

- Exporte sollten deterministisch aus einem versionierten TokenSet erzeugt werden.

- Preview-Daten dürfen nie manuell von Exportdaten abweichen.

- Reference Analyzer sollte nur Vorschläge liefern, nicht direkt Systemregeln überschreiben.

## 13. MVP-Scope

- Pflicht: Input Engine, Style Family Engine, Rule Engine, Guardrail Engine, Preview Engine, Template Engine, Export Engine.

- Pflichtstilfamilien im MVP: Minimal Swiss, Modern Editorial, Warm Human, Bold Startup, Premium Luxury, Creative Playful, Natural Organic.

- Pflichtkanäle im MVP: Website, Flyer, Visitenkarte, One-Pager PDF.

- Pflichtexporte im MVP: Design Tokens JSON, Theme JSON, CSS Variables, Brand Guide PDF, Web- und Print-Template Specs, UI/Code Prompt, Image Style Pack.

## 14. Nicht-Ziele im MVP

- Kein vollautomatischer Figma-Ersatz.

- Keine freie Gestaltung ohne Guardrails.

- Keine 25 Stilmodi mit kosmetischen Unterschieden.

- Kein unkontrolliertes Mischen mehrerer Stilfamilien in einem Bundle.

## 15. Entscheidende Produktregel

> Produktnutzen: Gerade hier entsteht der echte Mehrwert. Ohne Guardrails wäre StyleGuider nur ein höflicher Komplize für geschmackvolle Fehlentscheidungen.

| Objekt | Zweck | Schlüsselattribute |
| --- | --- | --- |
| Project | Arbeitskontext | name, owner, channels, status |
| BrandProfile | Markenabsicht | industry, values, audience, positioning |
| StyleDecision | Ergebnis der Family Engine | family, confidence, alternatives, rationale |
| TokenSet | Master-Daten | primitives, semantics, components, channels |
| GuardrailReport | Prüfresultat | checks, warnings, fixes, score |
| TemplateSpec | kanalbezogene Vorlage | channel, layout blocks, rules, export hints |
| ExportBundle | fertige Ausgabe | files, metadata, version, checksum |

> Die Quelle der Wahrheit ist immer das validierte Token- und Regelset. Alles andere - Vorschau, PDF, CSS, Prompts, Bildstil-Pack - wird daraus abgeleitet. Sobald diese Regel verletzt wird, zerfällt die App in hübsche Screenshots mit schlechter Governance.