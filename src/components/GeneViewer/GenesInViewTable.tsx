import React from 'react';
import type { GffFeature } from './gff';

export function GenesInViewTable(props: {
  features: GffFeature[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  joinAttribute: string;
}) {
  const { features, selectedId, onSelect, joinAttribute } = props;

  return (
    <div style={{ borderTop: '1px solid #e5e7eb' }}>
      <div style={{ padding: '8px 12px', fontWeight: 800, fontSize: 12 }}>
        Genes in view ({features.length})
      </div>
      <div style={{ overflow: 'visible' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ position: 'sticky', top: 0, background: '#fff' }}>
              <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e5e7eb' }}>
                Locus tag
              </th>
              <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e5e7eb' }}>
                Product
              </th>
              <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e5e7eb' }}>
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((f) => {
              const attrs = f.attributes ?? {};
              const locus = String(
                attrs[joinAttribute] ?? attrs.locus_tag ?? f.locus_tag ?? attrs.ID ?? f.id ?? '',
              );
              const product = attrs.product ?? attrs.Product ?? '—';
              const isSelected = Boolean(selectedId) && Boolean(locus) && locus === selectedId;
              return (
                <tr
                  key={`${f.refName}:${f.start}:${f.end}:${locus}`}
                  onClick={() => {
                    if (locus) onSelect(locus);
                  }}
                  style={{
                    background: isSelected ? '#eef2ff' : undefined,
                    cursor: locus ? 'pointer' : 'default',
                  }}
                  tabIndex={locus ? 0 : -1}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && locus) onSelect(locus);
                  }}
                  aria-selected={locus ? isSelected : undefined}
                >
                  <td style={{ padding: '6px 8px', borderBottom: '1px solid #f3f4f6' }}>
                    {locus || '—'}
                  </td>
                  <td style={{ padding: '6px 8px', borderBottom: '1px solid #f3f4f6' }}>
                    {product}
                  </td>
                  <td style={{ padding: '6px 8px', borderBottom: '1px solid #f3f4f6', color: '#374151' }}>
                    {f.refName}:{f.start + 1}..{f.end}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

