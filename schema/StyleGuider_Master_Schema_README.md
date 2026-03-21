# StyleGuider – Master JSON Schema

Dieses Dokument beschreibt das technische Master-Schema für StyleGuider. Es ist die operative Brücke zwischen den strategischen Dokumenten und einer echten App-Implementierung.

## Zweck

Das Schema definiert:

- die Struktur einer Stilfamilie
- das Brand-Profil
- die normierten Designachsen
- das Token-System
- kanalbezogene Regeln
- konkrete Template-Spezifikationen
- Export-Bundles
- Validierungs- und Governance-Felder

Damit wird aus dem StyleGuider-Konzept ein maschinenlesbares System statt einer Sammlung hübscher Designabsichten.

## Enthaltene Dateien

- `StyleGuider_Master_Schema.json`
- `StyleGuider_Master_Schema_Example.json`
- `StyleGuider_Master_Schema_README.md`

## Struktur des Schemas

### 1. Metadaten

Pflichtfelder:

- `schema_version`
- `release_id`
- `created_at`

Diese Felder sorgen dafür, dass Exporte und Ableitungen einer gemeinsamen Version zugeordnet werden können.

### 2. Style Family

Das Objekt `style_family` definiert die Stilfamilie als vollständige Logik, nicht nur als Farbstimmung.

Beispiele für erlaubte `id`-Werte:

- `minimal_swiss`
- `modern_editorial`
- `warm_human`
- `bold_startup`
- `premium_luxury`
- `creative_playful`
- `natural_organic`

### 3. Brand Profile

Das Objekt `brand_profile` beschreibt die Marke selbst:

- Branche
- Zielgruppe
- Werte
- Persönlichkeit
- Kommunikationsziele
- Kanalprioritäten

### 4. Design Axes

Die App sollte Stile über Achsen bestimmen, nicht direkt über Farbgeschmack.

Pflichtachsen:

- `emotionality`
- `expressiveness`
- `boldness`
- `precision`
- `luxury`
- `digital_first`

Alle Werte laufen auf einer Skala von `0` bis `100`.

### 5. Tokens

Das Token-System ist in folgende Bereiche gegliedert:

- `color`
- `typography`
- `space`
- `radius`
- `border`
- `shadow`
- `motion`
- `states`

Besonders wichtig ist, dass Farben **semantisch** statt nur dekorativ gespeichert werden.

### 6. Channel Rules

Pflichtkanäle:

- `web`
- `print`
- `social`
- `presentation`
- `image_ai`

Jeder Kanal definiert:

- Ziel
- Pflichtregeln
- Overrides
- Exportziele

### 7. Template Specs

`template_specs` enthält konkrete Vorlagenobjekte, etwa für:

- Homepage Hero
- Flyer A5
- Social Post
- Präsentationsfolie

Jede Vorlage enthält:

- Kanal
- Ziel
- Format
- Layoutzonen
- Contentslots
- Komponentenregeln
- Hierarchieregeln
- Exportrichtlinien

### 8. Export Bundle

Das Objekt `export_bundle` gruppiert alle Ausgaben desselben Systemstands.

Bereiche:

- `system_export`
- `human_export`
- `channel_export`
- `ai_export`
- `manifest`

### 9. Validation

Das Schema enthält bewusst ein Validierungsobjekt, damit StyleGuider nicht nur gestaltet, sondern auch prüft.

Wichtige Felder:

- `wcag_target`
- `required_states_present`
- `template_coverage`
- `export_completeness`

## Empfohlene Repo-Struktur

```text
StyleGuider/
├── docs/
│   ├── architecture/
│   ├── exports/
│   └── data-model/
└── schema/
    ├── StyleGuider_Master_Schema.json
    ├── StyleGuider_Master_Schema_Example.json
    └── StyleGuider_Master_Schema_README.md
```

## Hinweise zur Nutzung

- Das Schema ist absichtlich streng. Das ist gut. Sonst wird aus Systemarchitektur wieder Stil-Slalom.
- Für ein MVP kann `export_completeness` auf `mvp` stehen.
- Breaking Changes bei Tokens oder Template-Pflichtfeldern sollten über `schema_version` und `governance.breaking_change` markiert werden.

## Sinnvolle nächste Schritte

1. Beispielobjekte pro Stilfamilie anlegen.
2. Validatoren für Kontrast, Pflichtstates und Template-Coverage definieren.
3. CSS-/Theme-Generator direkt aus dem Schema ableiten.
4. Prompt-Generator für UI- und Image-AI an das Export-Bundle koppeln.
