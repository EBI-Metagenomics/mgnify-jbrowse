import React from 'react';
import type { GffFeature } from './gff';

function Field(props: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 2 }}>{props.label}</div>
      <div style={{ fontSize: 13, wordBreak: 'break-word' }}>{props.children}</div>
    </div>
  );
}

export function FeaturePanel(props: {
  feature: GffFeature | null;
  essentiality?: { status: string; color: string; icon: string } | null;
}) {
  const f = props.feature;
  if (!f) {
    return (
      <div style={{ padding: 12, color: '#6b7280', fontSize: 13 }}>
        Select a gene to see details.
      </div>
    );
  }

  const attrs = f.attributes ?? {};

  const locusTag = attrs.locus_tag ?? f.locus_tag ?? '—';
  const name = attrs.Name ?? attrs.gene ?? attrs.ID ?? '—';
  const product = attrs.product ?? attrs.Product ?? '—';

  return (
    <div style={{ padding: 12 }}>
      <div style={{ fontWeight: 800, marginBottom: 10 }}>Feature Details</div>

      <Field label="Locus Tag">{locusTag}</Field>
      <Field label="Name">{name}</Field>
      <Field label="Product">{product}</Field>
      <Field label="Type">{f.type}</Field>
      <Field label="Location">
        {f.refName}:{f.start + 1}..{f.end} ({f.strand === 1 ? '+' : f.strand === -1 ? '-' : '.'})
      </Field>

      {props.essentiality ? (
        <Field label="Essentiality Status">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: props.essentiality.color,
                display: 'inline-block',
              }}
            />
            <span aria-hidden="true">{props.essentiality.icon}</span>
            <span style={{ fontWeight: 600 }}>{props.essentiality.status}</span>
          </span>
        </Field>
      ) : null}

      <div style={{ marginTop: 14, fontWeight: 700, marginBottom: 6, fontSize: 12 }}>
        Attributes
      </div>
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 6 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <tbody>
            {Object.entries(attrs).map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: '6px 8px', borderBottom: '1px solid #f3f4f6', width: 120, color: '#374151' }}>
                  {k}
                </td>
                <td style={{ padding: '6px 8px', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>
                  {v || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

