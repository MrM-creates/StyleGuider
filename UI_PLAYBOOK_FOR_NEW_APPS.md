# UI Playbook for New Apps (Flider Style)

Stand: 2026-03-21

## Zweck

Dieses Playbook ist die wiederverwendbare Vorlage fuer neue Apps mit der gleichen UX-Logik wie PhotoPay/Flider:

- klare Fuehrung statt Ueberladung
- ein naechster sinnvoller Schritt
- konsistente Navigation
- tokenbasiertes Styling statt Einzelloesungen

## Source of Truth im Workspace

- `design-system/design-tokens.json`
- `design-system/base-components.css`
- `design-system/theme.js`
- `design-system/navigation-principles.md`
- `design-system/PhotoPay_UI_UX_Blueprint.md`

## 1) Informationsarchitektur (immer zuerst)

1. Definiere den Hauptflow als Sequenz.
2. Begrenze sichtbare Hauptschritte auf maximal 5.
3. Pro Screen nur eine primaere Entscheidung.
4. Markiere optionalen Kram klar als optional.

Template:

`Start -> Setup -> Inhalt -> Freigabe -> Uebersicht`

## 2) Startseite-Blueprint (reusable)

Pflichtbausteine:

1. Eyebrow (Kontext)
- Beispiel: `Produktname fuer [Zielgruppe]`

2. Headline (Outcome)
- Beispiel: `Erledige [Job-to-be-done] in [X] klaren Schritten`

3. Kurztext (3-Teile-Flow)
- Beispiel: `Du erstellst A, konfigurierst B und veroeffentlichst C.`

4. CTA-Block
- Primaer: `Jetzt starten`
- Sekundaer: `Bestehendes Projekt oeffnen`

5. Sofortiger Vertrauensanker
- Beispiel: `Kein Datenverlust bei Reload`, `Schweizer Zahlung`, `Export als PDF`

Regeln:

- Keine gleich starken 3+ CTAs nebeneinander.
- Kein Tech-Sprech auf der Startseite.
- Startseite muss in 5 Sekunden verstaendlich sein.

## 3) Menuefuehrung und Navigation

## Top-Level

- Maximal 5 Top-Level Eintraege.
- Aktiven Bereich immer sichtbar markieren.
- Projekt- oder Objektkontext im Header zeigen.

## Aktionsebenen

- Eine primaere Aktion sichtbar.
- Sekundaere Aktionen in `Mehr`/Overflow.
- Kritische Aktion (z. B. `Live schalten`) visuell getrennt.

## Schrittstatus

Verwende nur:

- `offen`
- `aktiv`
- `erledigt`

Keine internen Begriffe im UI.

## Rueckwege

- Jeder Deep-Screen braucht klaren Rueckweg (`Zur Uebersicht`).
- Keine Sackgassen ohne Exit.

## 3.1 Globales App-Layout-Schema

Nutze fuer neue Apps standardmaessig dieses Seitenraster:

1. Global Header
- Linke Zone: Logo + App-Titel
- Mittlere Zone: optionaler Kontext (Projektname, Bereich)
- Rechte Zone: Primaeraktion oder Overflow (`Mehr`)

2. Optionaler Sub-Header
- Step-Navigation oder Breadcrumb
- Statuschips (`offen`, `aktiv`, `erledigt`)

3. Main Content
- Eine klare Hauptaufgabe pro Screen
- Primaere Aktion im sichtbaren Bereich ohne Scroll-Zwang

4. Context Panel (optional)
- Hinweise, Hilfetexte, sekundare Einstellungen
- Auf Mobile als einklappbarer Block

5. Global Footer
- Rechtlich/Support/Systemstatus
- Keine primaeren Aktionen im Footer

Layout-Regeln:

- Header bleibt stabil; Positionen von Kernaktionen springen nicht.
- Maximal 3 Ebenen sichtbar: Header, Main, Footer.
- Jede Seite hat eine klare H1 und genau eine primaere CTA.

## 3.2 Footer-Blueprint (reusable)

Ziel:
- Vertrauen, Orientierung, rechtliche Klarheit
- ohne den Hauptflow zu stoeren

Empfohlene Footer-Struktur:

1. Linke Spalte
- Produktname + kurzer Satz (z. B. `Einfaches Verkaufen fuer Fotografen.`)

2. Mittlere Spalte (Links)
- `Hilfe`
- `Kontakt`
- `Status`

3. Rechte Spalte (Rechtliches)
- `Impressum`
- `Datenschutz`
- `AGB` (falls noetig)

4. Unterzeile
- `(c) [Jahr] [Marke]`
- optional Build-/Versionsinfo fuer interne Apps

Footer-Regeln:

- Keine Marketing-Ueberladung.
- Keine kritischen Primaeraktionen im Footer.
- Rechtslinks muessen von jeder Seite erreichbar sein.
- Auf Mobile: Links in 1 Spalte, gleiche Reihenfolge beibehalten.

## 4) Copy- und Sprachregeln

1. Kurz und konkret schreiben.
2. Verben statt Substantive priorisieren: `Starten`, `Speichern`, `Freigeben`, `Ansehen`.
3. Fehlermeldungen menschlich und loesungsorientiert.
4. Terminologie nicht wechseln (`Uebersicht` bleibt `Uebersicht`).

Fehlerformat:

1. Was ist passiert?
2. Was macht die App jetzt?
3. Was kann der User tun?

Beispiel:

`Ich konnte den Server gerade nicht erreichen. Bitte versuche es in ein paar Sekunden erneut.`

## 5) Style-System Regeln

## 5.1 Design Tokens

Nutze ausschliesslich Token/CSS-Variablen fuer Farben, Typo, Motion, Radius:

- Farben: `--fs-bg-color`, `--fs-surface-color`, `--fs-text-primary`, `--fs-accent-color`
- Typo: `--fs-font-sans`, `--fs-font-serif`, `--fs-font-mono`
- Motion: `--fs-transition-fast`, `--fs-transition-smooth`
- Radius: aus Tokenwerten (`sm`, `md`, `lg`, `pill`)

Keine harten Hex-Werte in Komponenten, wenn Token verfuegbar sind.

## 5.2 Basis-Komponenten

Nutze diese Klassen als Standard:

- App-Shell: `fs-app`
- Panel: `fs-glass-panel`
- Buttons: `fs-btn fs-btn-primary` / `fs-btn fs-btn-outline`
- Inputs: `fs-input`
- Cards: `fs-card`
- Intro-Motion: `fs-fade-in`

## 5.3 Vibe-System (4x4)

Styles:

- `brachial`
- `minimalist`
- `modern`
- `classic`

Jeder Style hat 4 Vibes in `design-tokens.json`.

Empfehlung fuer neue Apps:

- B2B/Serioes: `modern` oder `minimalist`
- Editorial/Story: `classic`
- Mutiger Brand-Auftritt: `brachial`

## 6) Component-Verhalten

Buttons:

- Primaer eindeutig dominant.
- Disabled klar sichtbar, keine irrefuehrenden Hover-Effekte.

Inputs:

- Labels immer sichtbar.
- Fokuszustand deutlich und konsistent.

Notices:

- Pro Schritt eine Hauptmeldung.
- Erfolg/Hinweis/Fehler klar unterscheidbar.

## 7) Responsive und kleine Fenster

1. Prioritaet bleibt gleich, nur Darstellung aendert sich.
2. Primaeraktion bleibt immer direkt erreichbar.
3. Sekundaeraktionen wandern in Overflow.
4. Keine Sidebar-Ueberladung auf kleiner Breite.

## 8) Accessibility Mindeststandard

1. Kontrast fuer Text und Controls pruefen.
2. Tastaturbedienung fuer primaere Flows sicherstellen.
3. Fokus sichtbar halten.
4. Fehlertexte nicht nur farblich codieren.

## 9) Implementation Quick Start

1. `base-components.css` einbinden.
2. Core Tokens anwenden (`applyCoreTokens` oder manuell als CSS vars).
3. Default-Vibe setzen (`applyTheme(tokens, { styleKey, vibeId })`).
4. Startseite nach Blueprint aufsetzen.
5. Step-Navigation mit `offen/aktiv/erledigt` aufbauen.
6. Review-Checklist laufen lassen.

Minimalbeispiel:

```js
import tokens from "./design-tokens.json";
import { applyTheme } from "./theme.js";

applyTheme(tokens, { styleKey: "minimalist", vibeId: "M-01" });
```

## 10) Release-Checklist (copy-paste)

1. Ist in 5 Sekunden klar, wo man startet?
2. Gibt es pro Screen genau eine Hauptaktion?
3. Sind Begriffe konsistent?
4. Gibt es auf jedem Screen einen klaren Rueckweg?
5. Sind Fehlermeldungen nicht-technisch formuliert?
6. Sind Sekundaeraktionen im Overflow gebuendelt?
7. Bleibt Kontext bei Navigation stabil?
8. Sind Styles tokenbasiert statt hardcoded?
9. Funktioniert der Hauptflow auf Mobile ohne Bruch?
10. Ist der aktive Schritt jederzeit sichtbar?

## 11) Was bewusst vermieden wird

- mehrere gleich starke CTAs ohne Hierarchie
- technischer Jargon im sichtbaren UI
- unerklaerte Menuespruenge
- harte Designwerte ausserhalb der Tokens
- Mischen von Refactor- und Feature-Aenderungen in einem Schritt

## Kurzregel

Wenn ein Element nicht zur aktuellen Entscheidung beitraegt, geht es in den Hintergrund.
