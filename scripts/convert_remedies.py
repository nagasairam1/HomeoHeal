#!/usr/bin/env python3
import argparse
import pandas as pd
import json
import re
from pathlib import Path

def normalize_row(row):
    def split_indications(val):
        if pd.isna(val): return []
        if isinstance(val, str):
            tokens = re.split(r'[;,\n\r]+', val)
            return [t.strip() for t in tokens if t.strip()]
        if isinstance(val, (list, tuple)):
            return [str(x).strip() for x in val if str(x).strip()]
        return [str(val).strip()]

    indications = split_indications(row.get('indications', ''))
    return {
        "id": str(row.get('id', '')).strip() or None,
        "name": str(row.get('name', '')).strip(),
        "indications": indications,
        "category": str(row.get('category', '')).strip(),
        "potency": str(row.get('potency', '')).strip(),
        "dosage": str(row.get('dosage', '')).strip(),
        "notes": str(row.get('notes', '')).strip(),
        "precautions": str(row.get('precautions', '')).strip()
    }

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', '-i', required=True)
    parser.add_argument('--output', '-o', default='data/remedies.json')
    args = parser.parse_args()

    p = Path(args.input)
    if not p.exists():
        raise SystemExit(f"Input file not found: {args.input}")

    if p.suffix.lower() in ['.xls', '.xlsx']:
        df = pd.read_excel(p)
    else:
        df = pd.read_csv(p)

    records = []
    for _, row in df.fillna('').to_dict(orient='index').items():
        rec = normalize_row(row)
        if not rec['id']:
            rec['id'] = f"r{1000 + len(records)}"
        records.append(rec)

    outp = Path(args.output)
    outp.parent.mkdir(parents=True, exist_ok=True)
    with open(outp, 'w', encoding='utf-8') as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(records)} remedies to {outp}")

if __name__ == "__main__":
    main()
