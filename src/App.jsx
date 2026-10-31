import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import DepositPage from './components/DepositPage';
import CashOutPage from './components/CashOutPage';
import HistoryPage from './components/HistoryPage';

export default function App() {
  const [user, setUser] = useState(null);
  const [appName] = useState('AETHER VAULT');
  const [accentTheme, setAccentTheme] = useState('gold');

  const [currentRoute, setCurrentRoute] = useState('overview');
  const [hideBalances, setHideBalances] = useState(false);
  const [balanceUSD, setBalanceUSD] = useState(100000.00); // Initial balance set to $100k USD

  const [gatewayDetails] = useState({
    btcAddress: 'bc1qAetherVault88997766554433221100xx9922',
    usdtTRC20: 'TJ18AetherVaultTRC20OfficialVault998877',
    usdtERC20: '0xAETHER999988887777666655554444333322221111',
    cashAppTag: '$AetherVaultOfficial',
    payPalLink: 'paypal.me/AetherVaultOfficial',
    chimeTag: '$AetherChimeSign'
  });

  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Synchronize CSS Data Theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', accentTheme);
  }, [accentTheme]);

  const showNotification = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showNotification(`${label} address copied!`, 'success');
  };

  const handleConfirmDeposit = ({ amount, method, reference }) => {
    setBalanceUSD(prev => prev + amount);
    const newTx = {
      id: `AETH-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'Deposit',
      method,
      amount,
      reference,
      status: 'Completed',
      timestamp: new Date().toLocaleString()
    };
    setTransactions(prev => [newTx, ...prev]);
    showNotification(`$${amount.toFixed(2)} USD deposited successfully!`, 'success');
    setCurrentRoute('overview');
  };

  const handleConfirmWithdraw = ({ amount, method, destination }) => {
    setBalanceUSD(prev => prev - amount);
    const newTx = {
      id: `AETH-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'Withdrawal',
      method,
      amount,
      reference: destination,
      status: 'Reviewing',
      timestamp: new Date().toLocaleString()
    };
    setTransactions(prev => [newTx, ...prev]);
    showNotification(`Payout request of $${amount.toFixed(2)} submitted`, 'success');
    setCurrentRoute('overview');
  };

  return (
    <div className="app-container">
      <div className="top-security-bar">
        <ShieldCheck size={14} color="#34d399" />
        <span>INSTITUTIONAL ENCRYPTED VAULT SYSTEM</span>
      </div>

      <div className="main-content-wrapper">
        {!user ? (
          <AuthPage
            onLogin={(usr) => {
              setUser(usr);
              showNotification(`Welcome, ${usr.fullName}!`, 'success');
            }}
            appName={appName}
          />
        ) : (
          <>
            <DashboardPage
              user={user}
              onLogout={() => {
                setUser(null);
                showNotification('Logged out successfully', 'success');
              }}
              appName={appName}
              currentRoute={currentRoute}
              setCurrentRoute={setCurrentRoute}
              hideBalances={hideBalances}
              setHideBalances={setHideBalances}
              balanceUSD={balanceUSD}
              accentTheme={accentTheme}
              setAccentTheme={setAccentTheme}
            />

            {currentRoute === 'deposit' && (
              <DepositPage
                gatewayDetails={gatewayDetails}
                handleCopy={handleCopy}
                onConfirmDeposit={handleConfirmDeposit}
              />
            )}

            {currentRoute === 'withdraw' && (
              <CashOutPage
                balanceUSD={balanceUSD}
                onConfirmWithdraw={handleConfirmWithdraw}
                setCurrentRoute={setCurrentRoute}
              />
            )}

            {currentRoute === 'history' && (
              <HistoryPage transactions={transactions} />
            )}
          </>
        )}
      </div>

      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}