import React from 'react';

export const ConnectedAccounts: React.FC = () => {
  const accounts = [
    { provider: 'Google', connected: true, email: 'user@example.com' },
    { provider: 'Microsoft', connected: false },
    { provider: 'GitHub', connected: false }
  ];

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
      <p className="text-sm text-muted-foreground mb-6">Manage social login connections for your account.</p>
      
      <div className="space-y-4">
        {accounts.map(acc => (
          <div key={acc.provider} className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center font-bold text-lg">
                {acc.provider[0]}
              </div>
              <div>
                <h4 className="font-semibold">{acc.provider}</h4>
                {acc.connected && <p className="text-xs text-muted-foreground">{acc.email}</p>}
              </div>
            </div>
            {acc.connected ? (
              <button className="px-3 py-1.5 border border-border text-xs font-medium rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors">
                Disconnect
              </button>
            ) : (
              <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-lg hover:bg-primary/20 transition-colors">
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
