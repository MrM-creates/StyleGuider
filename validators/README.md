# StyleGuider Validators

Dieses Verzeichnis enthält das erste Validierungswerkzeug für das Repository.

## Enthalten
- `validate_styleguider_json.py`

## Was aktuell validiert wird
1. `schema/StyleGuider_Master_Schema_Example.json` gegen `schema/StyleGuider_Master_Schema.json`
2. `examples/*.json` gegen `schema/StyleGuider_Style_Family_Example_Schema.json`
3. `seeds/recommendations/*.json` gegen `schema/StyleGuider_Recommendation_Seed_Schema.json`

## Ausführen

Vom Repo-Root aus:

```bash
python3 validators/validate_styleguider_json.py
```

Mit explizitem Repo-Pfad:

```bash
python3 validators/validate_styleguider_json.py --repo /Pfad/zu/StyleGuider
```

Strenger Modus:

```bash
python3 validators/validate_styleguider_json.py --strict
```

## Warum ein separates Example-Schema?
Die Dateien in `examples/` sind bewusst kompaktere Beispielobjekte und nicht identisch mit dem großen Master-Schema.
Darum würden sie gegen das Master-Schema scheitern, obwohl sie für ihren Zweck korrekt sind.
