#!/usr/bin/env python3
"""
StyleGuider Recommendation Scorer

Reads style family examples from examples/ and recommendation seeds from
seeds/recommendations/, then calculates primary and secondary fits.

No third-party dependencies required.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any, Dict, Iterable, List, Tuple

AXES = [
    "emotionality",
    "expressiveness",
    "boldness",
    "luxury",
    "warmth",
    "playfulness",
    "technicality",
]

CHANNEL_ALIASES = {
    "portfolio_pdf": ["portfolio_pdf", "lookbook_pdf", "brand_story_pdf", "service_pdf", "one_pager_pdf"],
    "one_pager_pdf": ["one_pager_pdf", "service_pdf", "brand_story_pdf"],
    "presentation": ["presentation", "pitchdeck"],
    "pitchdeck": ["pitchdeck", "presentation"],
    "social_post": ["social_post", "social"],
    "story": ["story", "social"],
    "website": ["website", "homepage", "landingpage"],
    "landingpage": ["landingpage", "website", "homepage"],
    "email": ["email"],
    "brand_guide": ["brand_guide"],
    "business_card": ["business_card"],
    "flyer": ["flyer", "flyer_a5", "flyer_a4", "event_flyer", "product_flyer"],
}


def load_json(path: Path) -> Dict[str, Any]:
    with path.open('r', encoding='utf-8') as f:
        return json.load(f)


def normalize_token(value: str) -> str:
    return value.strip().lower().replace(' ', '_').replace('-', '_')


def detect_repo_root(explicit_repo: str | None) -> Path:
    if explicit_repo:
        return Path(explicit_repo).expanduser().resolve()
    script_path = Path(__file__).resolve()
    candidate = script_path.parent.parent
    if (candidate / 'examples').exists() and (candidate / 'seeds').exists():
        return candidate
    cwd = Path.cwd().resolve()
    if (cwd / 'examples').exists() and (cwd / 'seeds').exists():
        return cwd
    raise FileNotFoundError('Could not detect repo root. Run from the StyleGuider root or pass --repo.')



def load_style_examples(examples_dir: Path) -> List[Dict[str, Any]]:
    items: List[Dict[str, Any]] = []
    for path in sorted(examples_dir.glob('*.json')):
        data = load_json(path)
        obj_type = data.get('object_type')
        if obj_type == 'style_family_example':
            items.append(data)
        elif obj_type == 'style_family_collection':
            items.extend(data.get('items', []))
    # deduplicate by style id, prefer explicit individual file over collection ordering
    deduped: Dict[str, Dict[str, Any]] = {}
    for item in items:
        style_id = item.get('style_family', {}).get('id')
        if style_id:
            deduped[style_id] = item
    return list(deduped.values())



def iter_seeds(seeds_dir: Path) -> Iterable[Tuple[Path, Dict[str, Any]]]:
    for path in sorted(seeds_dir.glob('*.json')):
        yield path, load_json(path)



def axis_score(seed_prefs: Dict[str, float], style_axes: Dict[str, float]) -> Tuple[float, List[str]]:
    deltas = []
    aligned = []
    for axis in AXES:
        seed_val = float(seed_prefs.get(axis, 0.5))
        style_val = float(style_axes.get(axis, 0.5))
        delta = abs(seed_val - style_val)
        deltas.append(delta)
        aligned.append((delta, axis, seed_val, style_val))
    avg_delta = sum(deltas) / len(deltas)
    score = max(0.0, 1.0 - avg_delta)
    aligned.sort(key=lambda x: x[0])
    reasons = []
    for delta, axis, seed_val, style_val in aligned[:3]:
        reasons.append(f"Axis fit on {axis}: seed {seed_val:.2f} vs style {style_val:.2f}")
    return score, reasons



def keyword_score(seed: Dict[str, Any], style: Dict[str, Any]) -> Tuple[float, List[str]]:
    brand_profile = seed.get('brand_profile', {})
    seed_terms = set()
    for key in ('industry', 'brand_type'):
        value = brand_profile.get(key)
        if isinstance(value, str) and value.strip():
            seed_terms.add(normalize_token(value))
    for key in ('audience', 'positioning_keywords', 'tone'):
        for value in brand_profile.get(key, []):
            if isinstance(value, str) and value.strip():
                seed_terms.add(normalize_token(value))

    style_terms = set()
    sf = style.get('style_family', {})
    for key in ('brand_keywords', 'suitable_for', 'not_recommended_for'):
        for value in sf.get(key, []):
            if isinstance(value, str) and value.strip():
                style_terms.add(normalize_token(value))

    positive = set(normalize_token(x) for x in sf.get('brand_keywords', []) + sf.get('suitable_for', []))
    negative = set(normalize_token(x) for x in sf.get('not_recommended_for', []))

    hits = sorted(seed_terms & positive)
    penalties = sorted(seed_terms & negative)

    base = 0.0
    if seed_terms:
        base = len(hits) / max(4, len(seed_terms))
        base = min(base, 1.0)
    penalty = min(0.35, 0.12 * len(penalties))
    score = max(0.0, min(1.0, base - penalty + (0.15 if brand_profile.get('industry') and normalize_token(brand_profile.get('industry')) in positive else 0.0)))

    reasons = []
    if hits:
        reasons.append('Keyword overlap: ' + ', '.join(hits[:4]))
    if penalties:
        reasons.append('Penalty terms present: ' + ', '.join(penalties[:3]))
    return score, reasons



def channel_score(seed_channels: List[str], style: Dict[str, Any]) -> Tuple[float, List[str]]:
    channel_rules = style.get('channel_rules', {})
    template_specs = style.get('template_specs', {})
    available = {normalize_token(k) for k in channel_rules.keys()} | {normalize_token(k) for k in template_specs.keys()}

    matched = []
    for ch in seed_channels:
        chn = normalize_token(ch)
        candidates = CHANNEL_ALIASES.get(chn, [chn])
        if any(normalize_token(candidate) in available for candidate in candidates):
            matched.append(chn)
    if not seed_channels:
        return 0.5, ['No channels supplied.']
    score = len(matched) / len(seed_channels)
    reasons = [f"Channel coverage: {len(matched)}/{len(seed_channels)} matched"]
    if matched:
        reasons.append('Matched channels: ' + ', '.join(matched))
    return score, reasons



def score_style(seed: Dict[str, Any], style: Dict[str, Any]) -> Dict[str, Any]:
    a_score, a_reasons = axis_score(seed.get('preferences', {}), style.get('design_axes', {}))
    k_score, k_reasons = keyword_score(seed, style)
    c_score, c_reasons = channel_score(seed.get('channels', []), style)

    total = round((a_score * 0.65) + (k_score * 0.20) + (c_score * 0.15), 4)
    reasons = a_reasons + k_reasons + c_reasons
    return {
        'style_id': style['style_family']['id'],
        'style_name': style['style_family']['name'],
        'total_score': total,
        'score_breakdown': {
            'axes': round(a_score, 4),
            'keywords': round(k_score, 4),
            'channels': round(c_score, 4),
        },
        'reasoning': reasons[:6],
    }



def compare_expected(seed: Dict[str, Any], ranking: List[Dict[str, Any]]) -> Dict[str, Any]:
    expected = seed.get('expected_recommendation', {})
    primary = expected.get('primary_fit')
    secondary = expected.get('secondary_fit')
    actual_primary = ranking[0]['style_id'] if ranking else None
    actual_secondary = ranking[1]['style_id'] if len(ranking) > 1 else None
    return {
        'expected_primary': primary,
        'expected_secondary': secondary,
        'actual_primary': actual_primary,
        'actual_secondary': actual_secondary,
        'primary_match': primary == actual_primary,
        'secondary_match': secondary == actual_secondary,
    }



def build_seed_result(seed_path: Path, seed: Dict[str, Any], styles: List[Dict[str, Any]]) -> Dict[str, Any]:
    ranking = [score_style(seed, style) for style in styles]
    ranking.sort(key=lambda x: x['total_score'], reverse=True)
    top_two = ranking[:2]

    explanation = []
    if top_two:
        explanation.append(f"Primary fit {top_two[0]['style_id']} with score {top_two[0]['total_score']:.3f}")
    if len(top_two) > 1:
        explanation.append(f"Secondary fit {top_two[1]['style_id']} with score {top_two[1]['total_score']:.3f}")

    return {
        'seed_file': seed_path.name,
        'seed_id': seed.get('seed_id', seed_path.stem),
        'top_matches': top_two,
        'full_ranking': ranking,
        'expected_comparison': compare_expected(seed, ranking),
        'summary': explanation,
    }



def main() -> int:
    parser = argparse.ArgumentParser(description='Score StyleGuider recommendation seeds against style family examples.')
    parser.add_argument('--repo', help='Path to the StyleGuider repository root.')
    parser.add_argument('--out', help='Optional custom output path for the results JSON.')
    parser.add_argument('--top', type=int, default=2, help='Number of top matches to highlight per seed (default: 2).')
    args = parser.parse_args()

    repo = detect_repo_root(args.repo)
    examples_dir = repo / 'examples'
    seeds_dir = repo / 'seeds' / 'recommendations'
    out_path = Path(args.out).expanduser().resolve() if args.out else (repo / 'exports' / 'recommendations' / 'recommendation_results.json')
    out_path.parent.mkdir(parents=True, exist_ok=True)

    styles = load_style_examples(examples_dir)
    if not styles:
        raise FileNotFoundError(f'No style family examples found in {examples_dir}')

    results = []
    for seed_path, seed in iter_seeds(seeds_dir):
        results.append(build_seed_result(seed_path, seed, styles))

    payload = {
        'repo_root': str(repo),
        'style_family_count': len(styles),
        'seed_count': len(results),
        'results': results,
    }

    with out_path.open('w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f'Repository: {repo}')
    print(f'Style families loaded: {len(styles)}')
    print(f'Seeds scored: {len(results)}')
    print(f'Output written to: {out_path}')
    for item in results:
        if item['top_matches']:
            top = item['top_matches'][0]
            second = item['top_matches'][1] if len(item['top_matches']) > 1 else None
            line = f"- {item['seed_id']}: {top['style_id']} ({top['total_score']:.3f})"
            if second:
                line += f" | second: {second['style_id']} ({second['total_score']:.3f})"
            print(line)
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
