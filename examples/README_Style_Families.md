# StyleGuider Stilfamilien – Beispielobjekte

Diese Sammlung enthält sieben repo-taugliche Beispielobjekte auf Basis des Master-Schemas.

## Enthaltene Stilfamilien
- minimal_swiss
- modern_editorial
- warm_human
- bold_startup
- premium_luxury
- creative_playful
- natural_organic

## Zweck
Die Dateien dienen als belastbarer Grundstock für:
- Recommendation-Logik
- UI-Vorschauen
- Token-Generierung
- kanalbezogene Templates
- Export-Bundles
- spätere Validierung gegen das Master-Schema

## Struktur
Jede Datei enthält:
- `style_family`
- `design_axes`
- `tokens`
- `channel_rules`
- `template_specs`
- `export_bundle`
- `dos` / `donts`
- `governance`

## Empfohlene Repo-Struktur

```text
StyleGuider/
├── docs/
├── schema/
└── examples/
    ├── minimal_swiss.example.json
    ├── modern_editorial.example.json
    ├── warm_human.example.json
    ├── bold_startup.example.json
    ├── premium_luxury.example.json
    ├── creative_playful.example.json
    ├── natural_organic.example.json
    └── StyleGuider_Style_Families_Collection.json
```

## Hinweis
Die Objekte sind bewusst **MVP-tauglich** und **streng genug für echte App-Logik**, aber noch nicht überzüchtet. 
Sie können später um Dark Mode, Lokalisierung, zusätzliche Exportziele, Tailwind/Figma-Mappings oder feinere Recommendation-Metadaten erweitert werden.
