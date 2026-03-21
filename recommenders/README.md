# Recommendation Scorer

Dieses Verzeichnis enthält den ersten **Recommendation-Scorer** für StyleGuider.

## Datei
- `score_style_recommendations.py`

## Zweck
Das Skript liest:
- Stilfamilien aus `examples/`
- Seed-Dateien aus `seeds/recommendations/`

und berechnet daraus pro Seed:
- `primary_fit`
- `secondary_fit`
- einen Score pro Stilfamilie
- eine kurze Begründung
- einen Vergleich mit der erwarteten Empfehlung aus der Seed-Datei

## Bewertungslogik
Der MVP-Scorer arbeitet mit drei Blöcken:

1. **Designachsen** – 65 %  
   Vergleich der Seed-Präferenzen mit den Achsenwerten der Stilfamilie.

2. **Keywords / Positionierung** – 20 %  
   Abgleich von Branche, Markentyp, Positionierungsbegriffen und Tonalität mit
   `brand_keywords`, `suitable_for` und `not_recommended_for`.

3. **Kanalabdeckung** – 15 %  
   Prüft, ob die gewünschten Kanäle in `channel_rules` oder `template_specs`
   sinnvoll abgedeckt sind.

## Standard-Output
Wenn kein eigener Pfad angegeben wird, schreibt das Skript nach:

```text
exports/recommendations/recommendation_results.json
```

## Ausführen
Vom Repo-Root aus:

```bash
python3 recommenders/score_style_recommendations.py
```

Mit explizitem Repo-Pfad:

```bash
python3 recommenders/score_style_recommendations.py --repo "/Users/MrM/Desktop/Own Apps/StyleGuider"
```

Mit eigenem Output-Pfad:

```bash
python3 recommenders/score_style_recommendations.py --out "/Users/MrM/Desktop/Own Apps/StyleGuider/exports/recommendations/my_results.json"
```

## Empfohlene Repo-Struktur

```text
StyleGuider/
├── examples/
├── seeds/
│   └── recommendations/
├── exports/
│   └── recommendations/
└── recommenders/
    ├── README.md
    └── score_style_recommendations.py
```

## Hinweise
- Das Skript benötigt **keine externen Python-Pakete**.
- Es verarbeitet sowohl **Einzeldateien** (`*.example.json`) als auch eine
  **Collection-Datei**, falls diese wieder in `examples/` liegt.
- Der Scorer ist bewusst **MVP-tauglich**, nicht mathematische Religion.
  Ziel ist belastbare, nachvollziehbare Vorlogik für die App.
