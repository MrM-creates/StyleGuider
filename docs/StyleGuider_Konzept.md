# Konzept: StyleGuider App

## 1. Ausgangslage
Bei der Erstellung von neuen Websites, Apps oder Printmedien (wie zuletzt beim "Anna's Baby Moments" Mockup) stehen Entwickler und Designer oft vor dem Problem des "Blank Canvas": Ohne strenge Vorgaben interpretieren KIs (und Menschen) Stile wie "Pastell" oder "Modern" immer wieder unterschiedlich. Es fehlt ein deterministisches, wiederverwendbares Design-System, das als verbindliche Grundlage für alle weiteren Arbeitsschritte dient und einen Wildwuchs an Farben und unpassenden Schriften verhindert.

## 2. Die Idee
**StyleGuider** ist eine intelligente Web-App, die das Erstellen und Verwalten von Design-Systemen (Styleguides) revolutioniert. 
Der User wählt eine Design-Richtung (z.B. *Pastell, Bold, Classic, Crazy*) oder lädt "Best Practice"-Beispiele hoch. Die App generiert daraufhin einen komplett stimmigen, visuellen Styleguide mit festgelegten Farben (Hex-Codes), Typografie-Paarungen (Heading & Body), UI-Elementen (Buttons, Inputs) und Elevations (Schatten/Border-Radii). 
Das Besondere: Der generierte Styleguide ist nicht nur visuell ansprechend, sondern die **funktionale Basis für jegliche weitere Entwicklung durch KI-Agenten oder Coder**.

## 3. Kernfunktionen

*   **Vibe- und Such-Engine:** Designs können entlang von Stimmungen (z.B. "freundlich", "positiv", "düster") durchsucht und generiert werden.
*   **Best-Practice Extraktion:** User können existierende Designs als Vorlage nutzen, woraus die App die Kern-Parameter (Farben, Fonts) extrahiert und harmonisiert.
*   **Design-Guardrails (Schutzplanken):** Intelligente Farb- und Kontrast-Prüfung nach Web-Standards (WCAG), damit User keine unleserlichen "Malkasten"-Designs erschaffen. Die App instruiert den User und korrigiert automatisch.
*   **Code & Token Export:** Automatisierter Export des Design-Systems in reale Code-Base-Formate (z.B. eine fertige `style.css` mit allen CSS-Variablen oder Design-Token als `.json`).
*   **KI-Agent Prompt Export (Skill/Fähigkeit):** Die App generiert einen fertigen "System Prompt", der exakt auf Coding KIs (wie Codex, Copilot, Cursor oder Antigravity) zugeschnitten ist. Die KI wird extrem strikt instruiert, das entwickelte Design 1:1 umzusetzen.
*   **Bild-KI Sync:** JSON-Ausgabe mit Farb- und Stimmungsparametern für Bild-Generatoren (z.B. Midjourney), damit produzierte Fotos und Illustrationen perfekt in die Markenwelt (den Vibe) passen.

## 4. Next Steps
1. **Workspace Wechsel:** Den neuen Ordner `/Desktop/Own Apps/StyleGuider` in der IDE (Editor) als alleinigen, aktiven Workspace öffnen.
2. **Kontext übergeben:** Die KI (den Agenten) im neuen Workspace starten und ihm dieses Markdown-Dokument als Start-Briefing übergeben ("Das ist unser App-Konzept. Lass uns bauen.").
3. **Setup MVP (Minimum Viable Product):** Initialisierung eines Vanilla JavaScript / Vite Projekts.
4. **Erster Meilenstein:** Bau des Core-UI-Dashboards, in dem Stile per Knopfdruck gewechselt werden können und sich Vorschau-Elemente live anpassen.
