import React, { useState } from "react";

const INITIAL_HEADER = "Why Our Number Differs From Other Trackers";

const INITIAL_REMARK = `Most trackers report Solana's Nakamoto Coefficient by treating each validator node as an independent entity — but this significantly inflates the number. In reality, many large operators run multiple validators under slightly different names or Keybase IDs.

Our calculation performs entity-level deduplication using several techniques: we merge validators sharing the same Keybase ID or operator name (e.g., "Galaxy 01" and "Galaxy 02" become one "Galaxy" entity), map known validator public keys to their parent organizations using a manually curated override list, account for corporate acquisitions (such as Chorus One's merger with Bitwise), and attribute the full known custodial stake of exchanges like Coinbase — who control ~38M SOL, even though only ~12M is traceable to their public validator keys.

The table below shows the resulting superminority — the smallest set of consolidated entities whose combined stake exceeds one-third of the network.`;

const INITIAL_TABLE_TITLE = "Superminority Entities ({count} entities controlling 33% of stake)";

const SAMPLE_ENTITIES = [
  { rank: 1, name: "Coinbase", stake: 38.66, percent: 8.68, cumulative: 8.68, verified: true },
  { rank: 2, name: "Figment", stake: 21.78, percent: 4.89, cumulative: 13.56, verified: true },
  { rank: 3, name: "Helius", stake: 14.57, percent: 3.27, cumulative: 16.83, verified: true },
  { rank: 4, name: "Jupiter", stake: 13.01, percent: 2.92, cumulative: 19.75, verified: true },
  { rank: 5, name: "Binance", stake: 11.03, percent: 2.48, cumulative: 22.23, verified: true },
  { rank: 6, name: "Kraken", stake: 8.75, percent: 1.96, cumulative: 24.19, verified: true },
  { rank: 7, name: "Kiln", stake: 8.29, percent: 1.86, cumulative: 26.06, verified: true },
  { rank: 8, name: "Bitwise Onchain Solutions", stake: 7.91, percent: 1.78, cumulative: 27.83, verified: false },
  { rank: 9, name: "Forward Industries", stake: 7.58, percent: 1.70, cumulative: 29.53, verified: true },
  { rank: 10, name: "Galaxy", stake: 7.24, percent: 1.62, cumulative: 31.16, verified: true },
  { rank: 11, name: "Everstake", stake: 7.21, percent: 1.62, cumulative: 32.78, verified: true },
  { rank: 12, name: "Staking Facilities", stake: 6.95, percent: 1.56, cumulative: 34.34, verified: true },
];

const CopyButton: React.FC<{ text: string; label: string }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        className={`copy-btn ${copied ? "copied" : ""}`}
        onClick={() => {
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
      >
        {copied ? "Copied!" : label}
      </button>
      <style jsx>{`
        .copy-btn {
          padding: 6px 14px;
          font-size: 13px;
          border: 1px solid #4a6cf7;
          border-radius: 4px;
          background: transparent;
          color: #4a6cf7;
          cursor: pointer;
          transition: all 0.2s;
        }
        .copy-btn.copied {
          background: #4a6cf7;
          color: #fff;
        }
        .copy-btn:hover {
          background: #f0f4ff;
        }
        .copy-btn.copied:hover {
          background: #4a6cf7;
        }
      `}</style>
    </>
  );
};

const Preview: React.FC<{ header: string; remark: string; tableTitle: string }> = ({
  header,
  remark,
  tableTitle,
}) => {
  const remarkParagraphs = remark.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="preview-wrapper">
      {/* Simulated Row Header */}
      <div className="row-header">
        <div className="row-name">Solana</div>
        <div className="row-val">0</div>
        <div className="row-val">12</div>
        <div className="row-arrow">▲</div>
      </div>

      {/* Expanded Details */}
      <div className="details">
        <div className="description">
          Solana is a decentralized blockchain built to enable scalable, user-friendly apps for the
          world.
        </div>

        <div className="meta-row">
          <div>
            <div className="meta-label">Website</div>
            <a href="https://solana.com/">solana.com/</a>
          </div>
          <div>
            <div className="meta-label">Blockchain</div>
            <div>Solana</div>
          </div>
        </div>

        {/* Remark Callout */}
        <div className="remark">
          <div className="remark-header">
            <span className="remark-icon">ℹ️</span>
            <span>{header}</span>
          </div>
          <div className="remark-body">
            {remarkParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Table Title */}
        <div className="table-title">{tableTitle}</div>

        {/* Entity Table */}
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
              {SAMPLE_ENTITIES.map((e) => (
                <tr key={e.rank}>
                  <td className="col-rank">{e.rank}</td>
                  <td className="col-name">
                    {e.name}
                    {e.verified && (
                      <span className="verified" title="Manually verified entity">
                        ✅
                      </span>
                    )}
                  </td>
                  <td className="col-num">{e.stake.toFixed(2)}M</td>
                  <td className="col-num">{e.percent.toFixed(2)}%</td>
                  <td className="col-num">{e.cumulative.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-legend">
          <span className="legend-item">
            <span className="verified">✅</span> Manually verified entity
          </span>
        </div>
      </div>

      <style jsx>{`
        .preview-wrapper {
          border: 1px solid lightGray;
          border-radius: 0;
          overflow: hidden;
          background: #fff;
        }
        .row-header {
          display: flex;
          align-items: center;
          padding: 0 10px;
          height: 54px;
          border-bottom: 1px solid #e3e3e3;
          background: #fad3f6;
        }
        .row-name {
          flex: 1;
          padding-left: 32px;
          font-size: 18px;
          font-weight: 500;
        }
        .row-val {
          min-width: 110px;
          text-align: right;
          font-size: 14px;
          font-family: "Noto Sans TC", sans-serif;
        }
        .row-arrow {
          padding: 0 4px;
          opacity: 0.7;
          font-size: 14px;
        }
        .details {
          padding: 12px;
          border-top: 1px solid #e3e3e3;
        }
        .description {
          margin: 4px 0;
          font-size: 14px;
        }
        .meta-row {
          display: flex;
          gap: 24px;
          margin: 8px 0;
          font-size: 14px;
        }
        .meta-label {
          color: #999;
          font-size: 12px;
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
        .remark-body p {
          margin: 0 0 10px;
        }
        .remark-body p:last-child {
          margin-bottom: 0;
        }
        .table-title {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a2e;
          margin: 12px 0 8px;
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
          font-family: "Noto Sans TC", monospace;
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
      `}</style>
    </div>
  );
};

const EditSolana: React.FC = () => {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [header, setHeader] = useState(INITIAL_HEADER);
  const [remark, setRemark] = useState(INITIAL_REMARK);
  const [tableTitle, setTableTitle] = useState(INITIAL_TABLE_TITLE);

  const displayTableTitle = tableTitle.replace("{count}", String(SAMPLE_ENTITIES.length));

  const exportJSON = () => {
    return JSON.stringify({ header, remark, tableTitle }, null, 2);
  };

  return (
    <main className="editor-page">
      {/* Top Bar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <span className="toolbar-title">Solana Note Editor</span>
          <span className="toolbar-badge">Live Preview</span>
        </div>
        <div className="toolbar-right">
          <div className="mode-toggle">
            <button
              className={`mode-btn ${mode === "edit" ? "active" : ""}`}
              onClick={() => setMode("edit")}
            >
              Edit
            </button>
            <button
              className={`mode-btn ${mode === "preview" ? "active" : ""}`}
              onClick={() => setMode("preview")}
            >
              Preview
            </button>
          </div>
          <CopyButton text={exportJSON()} label="Copy JSON" />
        </div>
      </div>

      <div className="editor-content">
        {mode === "edit" ? (
          <div className="edit-fields">
            <div className="field">
              <label className="field-label">Callout Header</label>
              <input
                type="text"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                className="field-input"
              />
            </div>

            <div className="field">
              <label className="field-label">Explanation Text</label>
              <p className="field-hint">
                Use blank lines to separate paragraphs. This appears inside the blue callout box.
              </p>
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                rows={12}
                className="field-input field-textarea"
              />
            </div>

            <div className="field">
              <label className="field-label">Table Title</label>
              <p className="field-hint">
                Use <code>{"{count}"}</code> as a placeholder for the entity count (auto-filled).
              </p>
              <input
                type="text"
                value={tableTitle}
                onChange={(e) => setTableTitle(e.target.value)}
                className="field-input"
              />
            </div>

            <div className="field">
              <label className="field-label">Live Preview ↓</label>
              <Preview header={header} remark={remark} tableTitle={displayTableTitle} />
            </div>
          </div>
        ) : (
          <Preview header={header} remark={remark} tableTitle={displayTableTitle} />
        )}
      </div>

      <style jsx>{`
        .editor-page {
          padding: 0 0 60px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .toolbar {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #fff;
          border-bottom: 1px solid #e0e0e0;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          width: 100%;
          max-width: 800px;
        }
        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .toolbar-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
        }
        .toolbar-badge {
          font-size: 12px;
          color: #888;
          background: #f0f0f0;
          border-radius: 4px;
          padding: 2px 8px;
        }
        .toolbar-right {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .mode-toggle {
          display: flex;
          border: 1px solid #ddd;
          border-radius: 6px;
          overflow: hidden;
        }
        .mode-btn {
          padding: 6px 16px;
          font-size: 13px;
          border: none;
          cursor: pointer;
          background: #fff;
          color: #555;
          font-weight: 400;
        }
        .mode-btn.active {
          background: #4a6cf7;
          color: #fff;
          font-weight: 600;
        }
        .editor-content {
          max-width: 800px;
          width: 100%;
          padding: 24px 16px;
        }
        .edit-fields {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .field {
        }
        .field-label {
          display: block;
          font-weight: 600;
          font-size: 14px;
          color: #1a1a2e;
          margin-bottom: 6px;
        }
        .field-hint {
          font-size: 12px;
          color: #888;
          margin: 0 0 6px;
        }
        .field-hint code {
          background: #eee;
          padding: 1px 4px;
          border-radius: 3px;
        }
        .field-input {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          border: 1px solid #ddd;
          border-radius: 6px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }
        .field-textarea {
          resize: vertical;
          line-height: 1.6;
        }
        .field-input:focus {
          border-color: #4a6cf7;
          box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.15);
        }

        @media (max-width: 600px) {
          .toolbar {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
          .toolbar-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </main>
  );
};

export default EditSolana;