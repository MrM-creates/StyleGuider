# StyleGuider App UI Foundation Contract

Stand: 2026-03-21

## 1) App Purpose Statement

StyleGuider hilft Designern, Entwicklern und Brand-Verantwortlichen dabei,
in wenigen Minuten ein konsistentes Design-System aus einer Stilfamilie zu erzeugen.
Die App fuehrt in drei klaren Schritten von Auswahl ueber Token-Finetuning bis zum Export,
damit Web-, Print- und KI-Workflows mit derselben Markenlogik arbeiten.

## 2) IA Map (max 5 Top-Level Bereiche)

1. Stil waehlen
2. Tokens anpassen
3. Exportieren
4. Live Preview
5. Hilfe/Status

## 3) Layout Contract

### App Shell
- Header: App-Name, Kontext, primaere Aktion `Export oeffnen`
- Main: links gefuehrter Schrittbereich, rechts Live Preview
- Footer: Hilfe, Kontakt, Status

### Step-Panels
- Pro Schritt eine primaere Aktion
- Sekundaere Aktionen nur als dezente Rueckwege
- Erweiterte Optionen in `details` (progressive disclosure)

### Export Modal
- Tabs fuer `CSS`, `JSON`, `AI`, `Image`
- Jede Tab hat genau eine Copy-Aktion

## 4) Copy Contract

### Titel
- Outcome-orientiert: `Erstelle dein Brand-System in 3 klaren Schritten`

### Supporttext
- Kurz, menschlich, ohne Tech-Sprech
- Fokus auf Nutzen: waehlen, anpassen, exportieren

### CTA
- Primaer pro Screen: `Weiter zu Tokens`, `Weiter zu Export`, `Export Design System`

### Fehlertexte
- Format:
  1. Was ist passiert?
  2. Was macht die App jetzt?
  3. Was kann der Nutzer tun?
- Beispiel:
  `Export fehlgeschlagen. Die App hat keine Daten geloescht. Bitte pruefe deine Eingaben und starte den Export erneut.`

## 5) Design Contract

### Tokens
- App-Tokens: Hintergrund, Surface, Border, Text, Accent, Radius, Shadow
- Preview-Tokens: Markenfarben, Typografie, Radius, Shadows

### Typografie
- Maximal zwei aktive Familien pro Stil (Heading + Body)
- UI Standard: Inter

### Abstaende
- 8px-basierte, konsistente Spacing-Logik in Sidebar, Panels und Cards

### Farbrollen
- Eine Akzentfarbe fuer Primary Actions
- Neutrale Flaechen fuer Lesbarkeit und Fokus

## 6) Interaction Contract

1. Entrance: sanftes Panel-Fade-In beim Step-Wechsel
2. Transition: klarer Wechsel ueber Stepper + kontextueller Hilfetext
3. Feedback: sichtbarer Statuschip, Copy-Feedback `Copied!`, aktiver Tab/Step

## 7) Responsive Contract

### Desktop
- Zwei-Spalten-Layout: Steuerung links, Preview rechts

### Tablet
- Einspaltig, Step-Bereich oben, Preview darunter

### Mobile
- Kompakte Header-Aktionen
- Panels und Preview untereinander
- Modal-Tabs in 2x2 Raster

## 8) Accessibility Baseline

1. Sichtbare Focus-States fuer alle interaktiven Elemente
2. Labels fuer Inputs/Selects
3. Step-Navigation mit `aria-current` im aktiven Schritt
4. Dialog-Rolle fuer Export-Modal
5. Keine reine Farbkommunikation ohne Textkontext

## Quality Gate Check

1. App-Zweck auf erstem Screen klar: Ja
2. Naechste Aktion in unter 5 Sekunden erkennbar: Ja
3. Pro Bereich genau eine Hauptaufgabe: Ja
4. Stilregeln token-basiert: Ja
5. Mobile Hauptflow ohne Umwege: Ja
6. Accessibility-Basics eingehalten: Ja
