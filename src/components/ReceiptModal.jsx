import React from 'react';
import { X } from 'lucide-react';
import './ReceiptModal.css';

export default function ReceiptModal({ activeReceipt, onClose }) {
  if (!activeReceipt) return null;

  return (
    <div className="modal-backdrop-overlay">
      <div className="receipt-modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #1e293b' }}>
          <span style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>TRANSACTION RECEIPT</span>
          <button onClick={onClose} style={{ color: '#94a3b8' }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="receipt-row-item">
            <span>Ref Code:</span>
            <span style={{ color: '#ffffff', fontWeight: 'bold' }}>{activeReceipt.id}</span>
          </div>
          <div className="receipt-row-item">
            <span>Type:</span>
            <span style={{ color: '#fbbf24' }}>{activeReceipt.type}</span>
          </div>
          <div className="receipt-row-item">
            <span>Gateway:</span>
            <span style={{ color: '#ffffff' }}>{activeReceipt.method}</span>
          </div>
          <div className="receipt-row-item">
            <span>Note / Reference:</span>
            <span style={{ color: '#ffffff' }}>{activeReceipt.reference}</span>
          </div>
          <div className="receipt-row-item">
            <span>Amount:</span>
            <span style={{ color: '#34d399', fontWeight: 'bold' }}>${activeReceipt.amount.toFixed(2)} USD</span>
          </div>
          <div className="receipt-row-item">
            <span>Timestamp:</span>
            <span style={{ color: '#cbd5e1' }}>{activeReceipt.timestamp}</span>
          </div>
          <div style={{ paddingTop: '8px', borderTop: '1px solid #1e293b' }}>
            <span style={{ fontSize: '10px', color: '#64748b' }}>Cryptographic TxHash:</span>
            <p className="hash-receipt-display">{activeReceipt.txHash}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn-secondary-action"
          style={{ width: '100%', marginTop: '20px', padding: '12px', borderRadius: '16px' }}
        >
          Close Receipt
        </button>
      </div>
    </div>
  );
}