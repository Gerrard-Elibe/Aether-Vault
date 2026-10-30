import React from 'react';
import { Lock, Eye, EyeOff, LogOut, PieChart, ArrowDownLeft, ArrowUpRight, History, Sliders, DollarSign } from 'lucide-react';
import './DashboardPage.css';

export default function DashboardPage({
  user,
  onLogout,
  appName,
  currentRoute,
  setCurrentRoute,
  hideBalances,
  setHideBalances,
  balanceUSD,
  accentTheme,
  setAccentTheme
}) {
  const routes = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'deposit', label: 'Deposit Gateway', icon: ArrowDownLeft },
    { id: 'withdraw', label: 'Cash Out', icon: ArrowUpRight },
    { id: 'history', label: 'Ledger Audit', icon: History }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Dynamic Navigation Header */}
      <div className="header-navigation">
        <div className="header-top">
          <div className="brand-section">
            <div className="brand-logo">
              <Lock size={20} />
            </div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff' }}>{appName}</h1>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Institutional Vault Management</p>
            </div>
          </div>

          <div className="user-profile-bar">
            <button
              onClick={() => setHideBalances(!hideBalances)}
              style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {hideBalances ? <EyeOff size={14} color="var(--accent-color)" /> : <Eye size={14} />}
              <span>{hideBalances ? 'Balances Hidden' : 'Hide Balances'}</span>
            </button>

            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#ffffff' }}>{user?.fullName}</p>
              <p style={{ fontSize: '9px', color: 'var(--success-color)' }}>● Authenticated</p>
            </div>

            <button onClick={onLogout} className="logout-btn">
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Route Selector Tabs */}
        <div className="nav-route-tabs">
          {routes.map(r => {
            const Icon = r.icon;
            const active = currentRoute === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setCurrentRoute(r.id)}
                className={`nav-tab-item ${active ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dashboard Panel */}
      {currentRoute === 'overview' && (
        <div className="dashboard-overview-grid">
          <div className="balance-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>MAIN PORTFOLIO BALANCE</span>
              <span style={{ color: 'var(--success-color)' }}>Ready</span>
            </div>
            <div className="balance-val">
              {hideBalances ? '••••••••' : `$${balanceUSD.toFixed(2)}`}
              <span style={{ fontSize: '16px', marginLeft: '6px', color: 'var(--accent-color)' }}>USD</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Bitcoin Equivalent: {hideBalances ? '••••' : (balanceUSD / 67450).toFixed(6)} BTC
            </p>
          </div>

          {/* Theme Customizer Integrated into Dashboard */}
          <div className="theme-picker-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 'bold' }}>
              <Sliders size={16} color="var(--accent-color)" />
              <span>Vault Theme Selector</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Switch interface color schemes:
            </p>
            <div className="theme-options-grid">
              {[
                { id: 'gold', label: 'Gold' },
                { id: 'emerald', label: 'Emerald' },
                { id: 'cyan', label: 'Cyan' },
                { id: 'amber', label: 'Amber' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setAccentTheme(t.id)}
                  className={`theme-chip ${accentTheme === t.id ? 'active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}