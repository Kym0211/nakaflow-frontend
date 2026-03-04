import React, { useEffect, useState } from 'react';
import Attribute from './Attribute';

interface EntityDetail {
  rank: number;
  name: string;
  stake_sol: number;
  percent: number;
  cumulative: number;
  commission: number;
  skip_rate: number;
  is_verified: boolean;
}

const EntityTable: React.FC<{ endpoint: string }> = ({ endpoint }) => {
  const [entities, setEntities] = useState<EntityDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setEntities(data.entities || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) return <div className="table-status">Loading entity data...</div>;
  if (error) return <div className="table-status">Failed to load entity data.</div>;
  if (!entities.length) return null;

  const superminority = entities.filter((e, idx) => {
    if (e.cumulative <= 33.33) return true;
    // include the entity that crosses the threshold
    if (idx > 0 && entities[idx - 1].cumulative <= 33.33) return true;
    return false;
  });

  return (
    <div className="entity-table-wrapper">
      <div className="table-title">Superminority Entities ({superminority.length} entities controlling 33% of stake)</div>
      <div className="table-scroll">
        <table className="entity-table">
          <thead>
            <tr>
              <th className="col-rank">#</th>
              <th className="col-name">Entity</th>
              <th className="col-num">Stake (SOL)</th>
              <th className="col-num">Share %</th>
              <th className="col-num">Cumul. %</th>
            </tr>
          </thead>
          <tbody>
            {superminority.map((e) => (
              <tr key={e.rank}>
                <td className="col-rank">{e.rank}</td>
                <td className="col-name">
                  {e.name}
                  {e.is_verified && <span className="verified" title="Manually verified entity">✅</span>}
                </td>
                <td className="col-num">{(e.stake_sol / 1e6).toFixed(2)}M</td>
                <td className="col-num">{e.percent.toFixed(2)}%</td>
                <td className="col-num">{e.cumulative.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-legend">
        <span className="legend-item"><span className="verified">✅</span> Manually verified entity</span>
      </div>

      <style jsx>{`
        .entity-table-wrapper {
          margin-top: 12px;
        }
        .table-title {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a2e;
          margin-bottom: 8px;
        }
        .table-scroll {
          overflow-x: auto;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .entity-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          table-layout: fixed;
        }
        .entity-table th {
          background: #eef1f6;
          padding: 8px 12px;
          font-weight: 600;
          color: #333;
          border-bottom: 2px solid #ccc;
          white-space: nowrap;
        }
        .entity-table td {
          padding: 6px 12px;
          border-bottom: 1px solid #eee;
          color: #444;
        }
        .entity-table tbody tr:hover {
          background: #f8f9fc;
        }
        .col-rank {
          width: 40px;
          text-align: center;
        }
        .col-name {
          text-align: left;
        }
        .col-num {
          width: 110px;
          text-align: right;
          font-family: 'Noto Sans TC', monospace;
          white-space: nowrap;
        }
        th.col-num {
          text-align: right;
        }
        .verified {
          margin-left: 4px;
          font-size: 12px;
        }
        .table-legend {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #666;
          margin-top: 6px;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .table-status {
          font-size: 13px;
          color: #888;
          padding: 12px 0;
        }
      `}</style>
    </div>
  );
};

const DetailsCard: React.FC<{ metadata: any }> = ({ metadata }) => {
  return (
    <div className="details-card">
      <div className="metadata">
        {metadata.description && <div className="description">{metadata.description}</div>}

        <div className="row">
          {metadata.website && (
            <Attribute title="Website">
              <a href={metadata.website} target="website">
                {metadata.website.replace('https://', '')}
              </a>
            </Attribute>
          )}
          {metadata.blockchain && <Attribute title="Blockchain">{metadata.blockchain}</Attribute>}
        </div>

        {metadata.remark && (
          <div className="remark">
            <div className="remark-header">
              <span className="remark-icon">ℹ️</span>
              <span>Why Our Number Differs From Other Trackers</span>
            </div>
            <div className="remark-body">{metadata.remark}</div>
          </div>
        )}

        {metadata.entityDetailsEndpoint && (
          <EntityTable endpoint={metadata.entityDetailsEndpoint} />
        )}

        <div className="spacer" />
      </div>

      <style jsx>{`
        .details-card {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .metadata {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .description {
          margin: 4px 0;
        }
        .row {
          display: flex;
        }
        .row > :global(div) {
          flex: 1;
        }
        .spacer {
          flex: 1;
        }
        .remark {
          margin: 12px 0 4px;
          padding: 12px 16px;
          background: #f0f4ff;
          border-left: 4px solid #4a6cf7;
          border-radius: 0 6px 6px 0;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
        }
        .remark-header {
          font-weight: 600;
          margin-bottom: 6px;
          font-size: 14px;
          color: #1a1a2e;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .remark-icon {
          font-size: 16px;
        }
        .remark-body {
          color: #444;
        }
      `}</style>
    </div>
  );
};

export default DetailsCard;