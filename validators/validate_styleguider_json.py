#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Iterable
from jsonschema import Draft202012Validator


def load_json(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def iter_json_files(folder: Path) -> Iterable[Path]:
    if not folder.exists():
        return []
    return sorted(p for p in folder.glob("*.json") if p.is_file())


def validate_file(instance_path: Path, schema_path: Path) -> list[str]:
    schema = load_json(schema_path)
    instance = load_json(instance_path)
    validator = Draft202012Validator(schema)
    errors = sorted(validator.iter_errors(instance), key=lambda e: list(e.path))
    messages = []
    for err in errors:
        location = ".".join(str(x) for x in err.absolute_path) or "<root>"
        messages.append(f"{location}: {err.message}")
    return messages


def find_repo_root(explicit_repo: str | None) -> Path:
    if explicit_repo:
        return Path(explicit_repo).expanduser().resolve()
    script_path = Path(__file__).resolve()
    candidate = script_path.parent.parent
    if (candidate / "schema").exists():
        return candidate
    cwd = Path.cwd().resolve()
    if (cwd / "schema").exists():
        return cwd
    raise FileNotFoundError("Could not detect repo root. Run from the StyleGuider root or pass --repo /path/to/StyleGuider.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate StyleGuider JSON files.")
    parser.add_argument("--repo", help="Path to the StyleGuider repository root.")
    parser.add_argument("--strict", action="store_true", help="Fail if a target group has no files.")
    args = parser.parse_args()

    repo = find_repo_root(args.repo)
    schema_dir = repo / "schema"
    examples_dir = repo / "examples"
    seeds_dir = repo / "seeds" / "recommendations"

    targets = [
        ("master_example", [schema_dir / "StyleGuider_Master_Schema_Example.json"], schema_dir / "StyleGuider_Master_Schema.json"),
        ("style_family_examples", list(iter_json_files(examples_dir)), schema_dir / "StyleGuider_Style_Family_Example_Schema.json"),
        ("recommendation_seeds", list(iter_json_files(seeds_dir)), schema_dir / "StyleGuider_Recommendation_Seed_Schema.json"),
    ]

    any_failure = False
    print(f"Repository: {repo}\n")
    for label, files, schema_path in targets:
        print(f"[{label}]")
        if not schema_path.exists():
            print(f"  ERROR schema not found: {schema_path}")
            any_failure = True
            print("")
            continue
        if not files:
            print("  No files found." + (" (strict mode = failure)" if args.strict else ""))
            if args.strict:
                any_failure = True
            print("")
            continue
        for file_path in files:
            if not file_path.exists():
                print(f"  ERROR missing file: {file_path}")
                any_failure = True
                continue
            try:
                errors = validate_file(file_path, schema_path)
            except Exception as exc:
                print(f"  FAIL {file_path.relative_to(repo)}")
                print(f"       Could not validate file: {exc}")
                any_failure = True
                continue
            if errors:
                print(f"  FAIL {file_path.relative_to(repo)}")
                for item in errors:
                    print(f"       - {item}")
                any_failure = True
            else:
                print(f"  OK   {file_path.relative_to(repo)}")
        print("")
    print("Validation finished successfully." if not any_failure else "Validation finished with errors.")
    return 0 if not any_failure else 1


if __name__ == "__main__":
    raise SystemExit(main())
