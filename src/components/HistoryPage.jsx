import React from 'react';
import { History, CheckCircle2 } from 'lucide-react';
import './HistoryPage.css';

export default function HistoryPage({ transactions }) {
  return (
    <div className="history-panel">
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <History size={18} color="var(--accent-color)" /> Cryptographic Ledger Audit
      </h3>

      {transactions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: '11px' }}>
          No recorded transactions available.
        </div>
      ) : (
        <table className="ledger-table">
          <thead>
            <tr>
              <th>TX ID</th>
              <th>TYPE</th>
              <th>METHOD</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td style={{ fontWeight: 'bold', color: '#ffffff' }}>{tx.id}</td>
                <td>{tx.type}</td>
                <td>{tx.method}</td>
                <td style={{ fontWeight: 'bold', color: '#ffffff' }}>${tx.amount.toFixed(2)}</td>
                <td style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> {tx.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}