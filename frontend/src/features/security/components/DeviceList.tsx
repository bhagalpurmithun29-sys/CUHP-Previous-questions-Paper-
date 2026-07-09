import React, { useState } from 'react';
import { useSecurityDevices, useRevokeDevice, useRenameDevice } from '../hooks/useSecurityCenter';
import { ComputerDesktopIcon, DevicePhoneMobileIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const DeviceList: React.FC = () => {
  const { data: devices, isLoading } = useSecurityDevices();
  const { mutate: revokeDevice, isPending: isRevoking } = useRevokeDevice();
  const { mutate: renameDevice, isPending: isRenaming } = useRenameDevice();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  if (isLoading) return <div className="animate-pulse h-32 bg-muted/20 rounded-2xl"></div>;
  if (!devices || devices.length === 0) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
  };

  const handleSaveRename = (deviceId: string) => {
    if (editName.trim()) {
      renameDevice({ deviceId, name: editName.trim() }, {
        onSuccess: () => setEditingId(null)
      });
    }
  };

  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/10">
        <h3 className="font-semibold text-lg">Trusted Devices</h3>
        <p className="text-sm text-muted-foreground mt-1">These devices can skip the 2FA verification step during login.</p>
      </div>
      <div className="divide-y divide-border">
        {devices.map((device: any) => (
          <div key={device.deviceId} className="p-6 flex items-center justify-between bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center flex-shrink-0 text-muted-foreground">
                {device.deviceName?.toLowerCase().includes('iphone') || device.deviceName?.toLowerCase().includes('android') ? 
                  <DevicePhoneMobileIcon className="w-6 h-6" /> : <ComputerDesktopIcon className="w-6 h-6" />}
              </div>
              <div className="min-w-0 flex-1">
                {editingId === device.deviceId ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-2 py-1 border rounded text-sm w-full max-w-xs focus:outline-none focus:border-primary"
                      autoFocus
                    />
                    <button onClick={() => handleSaveRename(device.deviceId)} disabled={isRenaming} className="text-success p-1"><CheckIcon className="w-4 h-4" /></button>
                    <button onClick={() => setEditingId(null)} disabled={isRenaming} className="text-muted-foreground p-1"><XMarkIcon className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold truncate">{device.deviceName}</h4>
                    <button onClick={() => { setEditingId(device.deviceId); setEditName(device.deviceName); }} className="text-muted-foreground hover:text-foreground">
                      <PencilIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-0.5">Last used: {formatDate(device.lastUsed)}</p>
              </div>
            </div>
            <button 
              onClick={() => revokeDevice(device.deviceId)}
              disabled={isRevoking || isRenaming}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50"
              title="Revoke Trusted Device"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
