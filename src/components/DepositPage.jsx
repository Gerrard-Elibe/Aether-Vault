import React, { useState, useEffect } from 'react';
import { ArrowDownLeft, Copy, Clock, CheckCircle2 } from 'lucide-react';
import './DepositPage.css';

export default function DepositPage({ gatewayDetails, handleCopy, onConfirmDeposit }) {
  const [selectedMethod, setSelectedMethod] = useState('BTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositRef, setDepositRef] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(900); // 15 Minute countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedMethod]);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTargetAddress = () => {
    switch (selectedMethod) {
      case 'BTC': return gatewayDetails.btcAddress;
      case 'Cash App': return gatewayDetails.cashAppTag;
      case 'PayPal': return gatewayDetails.payPalLink;
      case 'Chime': return gatewayDetails.chimeTag;
      case 'USDT-TRC20': return gatewayDetails.usdtTRC20;
      case 'USDT-ERC20': return gatewayDetails.usdtERC20;
      default: return gatewayDetails.btcAddress;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!depositAmount || !depositRef) {
      alert('Provide deposit amount and transaction reference/hash');
      return;
    }
    onConfirmDeposit({ amount: parseFloat(depositAmount), method: selectedMethod, reference: depositRef });
  };

  return (
    <div className="deposit-container">
      <div className="deposit-panel">
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowDownLeft size={18} color="var(--accent-color)" /> Deposit Funds
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Choose payment gateway, copy address, transfer in your app, then submit reference.
          </p>
        </div>

        <div className="form-group">
          <label>1. CHOOSE PAYMENT METHOD</label>
          <div className="method-buttons-grid">
            {['BTC', 'Cash App', 'PayPal', 'Chime', 'USDT-TRC20', 'USDT-ERC20'].map(m => (
              <button
                key={m}
                onClick={() => { setSelectedMethod(m); setTimerSeconds(900); }}
                className={`method-btn ${selectedMethod === m ? 'active' : ''}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label>2. AMOUNT DEPOSITED (USD)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label>3. SENDER REF / TXHASH / NOTE</label>
            <input
              type="text"
              placeholder="Paste transaction hash or payment note"
              value={depositRef}
              onChange={(e) => setDepositRef(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Confirm & Credit Deposit
          </button>
        </form>
      </div>

      {/* External Payment Copy Box */}
      <div className="address-instruction-box">
        <div className="countdown-timer-badge">
          <Clock size={14} />
          <span>Payment Window: {formatTimer(timerSeconds)}</span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Transfer to the official address below using your external app:
        </p>

        <p className="target-address-display">{getTargetAddress()}</p>

        <button
          onClick={() => handleCopy(getTargetAddress(), selectedMethod)}
          className="copy-btn"
        >
          <Copy size={14} /> Copy Address Handle
        </button>
      </div>
    </div>
  );
}