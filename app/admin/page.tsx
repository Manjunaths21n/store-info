'use client';

import { useEffect, useState } from 'react';
import { fetchDBStoreConfig, updateStoreStatus } from '../_utils/api-utils';
import Link from 'next/link';
import './admin-page.css';

export default function AdminPage() {
    const [status, setStatus] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        fetchDBStoreConfig().then((config) => {
            setStatus(config.status);
        });
    }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const handleToggle = async () => {
        setLoading(true);
        try {
            const newStatus = !status;
            await updateStoreStatus(newStatus);
            setStatus(newStatus);
            setLastUpdated(new Date());
            showToast(newStatus ? 'Store is now Open' : 'Store is now Closed');
        } catch (error) {
            showToast('Failed to update status');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const isOpen = status === true;
    const isLoaded = status !== null;

    return (
        <>
                       <div className="admin-page">
                {/* Top bar */}
                <div className="topbar">
                    <span className="brand">Admin Panel</span>
                    <Link href="/" className="back-link">← Customer view</Link>
                </div>

                <div className="status-section">
                    {/* Big status */}
                    <div className="status-display">
                        <p className="status-label">Current store status</p>
                        <div className={`status-big ${!isLoaded ? 'loading' : isOpen ? 'open' : 'closed'}`}>
                            {!isLoaded ? 'Loading' : isOpen ? 'Open' : 'Closed'}
                        </div>
                        <div className="status-indicator">
                            <span className={`dot ${!isLoaded ? 'loading' : isOpen ? 'open' : 'closed'}`} />
                            <span className="dot-label">
                                {!isLoaded ? 'Fetching status...' : isOpen ? 'Accepting customers' : 'Not accepting customers'}
                            </span>
                        </div>
                    </div>

                    {/* Toggle card */}
                    <div className="toggle-card">
                        <div className="toggle-row">
                            <div className="toggle-info">
                                <h3>{isOpen ? 'Store is Open' : 'Store is Closed'}</h3>
                                <p>{isOpen ? 'Toggle to close the store for customers.' : 'Toggle to open the store for customers.'}</p>
                            </div>
                            <button
                                className="toggle-switch"
                                onClick={handleToggle}
                                disabled={loading || !isLoaded}
                                aria-label="Toggle store status"
                            >
                                <div className={`switch-track ${isOpen ? 'on' : 'off'}`} />
                                <div className={`switch-thumb ${isOpen ? 'on' : 'off'}`} />
                            </button>
                        </div>

                        {lastUpdated && (
                            <>
                                <div className="divider" />
                                <p className="last-updated">
                                    ✓ Last updated at {lastUpdated.toLocaleTimeString()}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="stats-row">
                        <div className="stat-card">
                            <p className="stat-label">Status</p>
                            <p className={`stat-value ${isOpen ? 'open' : 'closed'}`}>
                                {!isLoaded ? '—' : isOpen ? 'Open' : 'Closed'}
                            </p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Last Changed</p>
                            <p className="stat-value" style={{ fontSize: '1rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                                {lastUpdated ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'This session'}
                            </p>
                        </div>
                    </div>
                </div>

                <footer>Store Status App · Admin</footer>
            </div>

            {toast && <div className="toast">{toast}</div>}
        </>
    );
}
