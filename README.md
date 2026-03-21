# StyleGuider

StyleGuider ist eine App zur fundierten Entwicklung und Ausgabe konsistenter Brand-Design-Systeme für Online- und Offline-Kommunikation.

Der Fokus liegt nicht auf beliebigen Looks, sondern auf **begründbaren Stilfamilien**, die sich systematisch auf Website, Flyer, Visitenkarten, PDFs, Social Assets und KI-Workflows übertragen lassen.

## Ziel des Projekts

StyleGuider soll Nutzerinnen und Nutzer dabei unterstützen,

- eine passende Stilfamilie für ihre Marke zu bestimmen,
- daraus belastbare Designregeln abzuleiten,
- kanalbezogene Templates zu erzeugen,
- technische und menschlich lesbare Exporte bereitzustellen,
- sowie Bild- und Code-KI konsistent mit der Markenlogik zu steuern.

## Kernprinzipien

- **System statt Zufall:** Styles werden als Regelwerke definiert, nicht als lose Moodboards.
- **Kanalübergreifende Konsistenz:** Ein Stil gilt für die gesamte Kommunikation, wird aber pro Kanal angepasst.
- **Nutzenorientierung:** Empfehlungen müssen für reale Kommunikationsmittel funktionieren.
- **Exportfähigkeit:** Ergebnisse sollen direkt in Web-, Print- und KI-Workflows überführt werden können.
- **Begründbarkeit:** Stilentscheidungen sollen nachvollziehbar, dokumentierbar und validierbar sein.

## Aktueller Projektstand

Das Repository enthält aktuell:

- konzeptionelle Architektur-Dokumente,
- ein Master-Schema für Stilobjekte,
- erste Beispielobjekte für sieben Stilfamilien,
- sowie die Grundstruktur für Seeds, Validatoren und spätere Export-Logik.

## Stilfamilien (MVP)

Der aktuelle Grundstock umfasst sieben Stilfamilien:

1. Minimal Swiss
2. Modern Editorial
3. Warm Human
4. Bold Startup
5. Premium Luxury
6. Creative Playful
7. Natural Organic

Diese Familien dienen als belastbarer Startpunkt für Recommendation-Logik, Preview-Systeme, Template-Erzeugung und Export-Bundles.

## Repository-Struktur

```text
StyleGuider/
├── docs/
│   ├── architecture/
│   ├── exports/
│   └── data-model/
├── schema/
│   ├── StyleGuider_Master_Schema.json
│   ├── StyleGuider_Master_Schema_Example.json
│   └── StyleGuider_Master_Schema_README.md
├── examples/
│   ├── README_Style_Families.md
│   ├── StyleGuider_Style_Families_Collection.json
│   ├── minimal_swiss.example.json
│   ├── modern_editorial.example.json
│   ├── warm_human.example.json
│   ├── bold_startup.example.json
│   ├── premium_luxury.example.json
│   ├── creative_playful.example.json
│   └── natural_organic.example.json
├── seeds/
│   └── recommendations/
├── validators/
├── exports/
└── README.md
```

## Wichtige Bereiche

### `docs/`
Enthält konzeptionelle und architektonische Dokumente.

- `architecture/`: Systemarchitektur und modulare Struktur
- `exports/`: Export- und Template-Architektur
- `data-model/`: fachliche Beschreibung des Datenmodells

### `schema/`
Technische Referenz für die Objektstruktur.

Hier liegt das Master-Schema mit Feldnamen, Datentypen, Pflichtfeldern, Enums und Beispielobjekten.

### `examples/`
Konkrete Stilfamilien-Objekte, die auf dem Schema aufbauen.

Sie dienen als Startpunkt für:
- Recommendation-Logik
- UI-Previews
- Token-Generierung
- Kanalregeln
- Export-Bundles

### `seeds/`
Beispielhafte Eingabefälle mit erwarteten Empfehlungen.

Diese Dateien sind wichtig, um die spätere Entscheidungslogik testbar zu machen.

### `validators/`
Skripte zur Prüfung von JSON-Dateien gegen das Master-Schema.

### `exports/`
Ablage für tatsächlich generierte Outputs, zum Beispiel:
- CSS Variables
- Design Tokens
- Brand Guide PDFs
- Agent Prompts
- Image Style Packs

## Zentrale Dateien für den Einstieg

Zum Start sind diese Dateien am wichtigsten:

1. `docs/architecture/StyleGuider_Systemarchitektur_Specs.md`
2. `docs/exports/StyleGuider_Export_und_Template_Architektur.md`
3. `docs/data-model/StyleGuider_Datenmodell_JSON_Schema.md`
4. `schema/StyleGuider_Master_Schema.json`
5. `examples/StyleGuider_Style_Families_Collection.json`

## Empfohlene nächste Schritte

1. Erste Seed-Dateien systematisch ergänzen
2. JSON-Validator gegen das Master-Schema aufsetzen
3. Recommendation-Logik mit Seeds testen
4. Kanal-Templates pro Stilfamilie schärfen
5. Export-Bundles technisch konkretisieren

## Langfristige Ausbaustufen

Mögliche spätere Erweiterungen:

- Dark-Mode-Varianten
- zusätzliche Theme-Varianten pro Stilfamilie
- Figma-/Tailwind-spezifische Exporte
- länderspezifische Print-Defaults
- Scoring- und Ranking-Logik für Empfehlungen
- mehrstufige Prompt-Strategien für KI-Agenten

## Arbeitsweise

StyleGuider sollte schrittweise weiterentwickelt werden:

1. fachliche Struktur klären
2. Schemata stabilisieren
3. Beispielobjekte ausbauen
4. Seed-Daten ergänzen
5. Validierung einführen
6. Recommendation-Engine implementieren
7. Exporte operationalisieren

So bleibt das Projekt fundiert, nachvollziehbar und technisch sauber erweiterbar.
