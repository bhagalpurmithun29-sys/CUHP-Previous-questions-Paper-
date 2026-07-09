import React from 'react';
import { useGetTrustedDevices, useRevokeTrustedDevice } from '../hooks/useMFA';
import { ComputerDesktopIcon, DevicePhoneMobileIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

export const TrustedDevices: React.FC = () => {
  const { data: devices, isLoading } = useGetTrustedDevices();
  const { mutate: revokeDevice, isPending: isRevoking } = useRevokeTrustedDevice();

  if (isLoading) {
    return <div className="animate-pulse h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>;
  }

  if (!devices || devices.length === 0) {
    return null; // Don't show the section if no trusted devices
  }

  const getDeviceIcon = (name: string) => {
    if (name.toLowerCase().includes('phone') || name.toLowerCase().includes('android') || name.toLowerCase().includes('ios')) {
      return <DevicePhoneMobileIcon className="w-6 h-6" />;
    }
    return <ComputerDesktopIcon className="w-6 h-6" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border bg-muted/10">
        <h3 className="font-semibold text-lg">Trusted Devices</h3>
        <p className="text-sm text-muted-foreground mt-1">
          These devices skip the 2FA verification step. Revoke any devices you no longer recognize.
        </p>
      </div>
      <div className="divide-y divide-border">
        <AnimatePresence>
          {devices.map((device) => (
            <motion.div 
              key={device.deviceId}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 flex items-center justify-between bg-white dark:bg-gray-900"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center text-muted-foreground">
                  {getDeviceIcon(device.deviceName)}
                </div>
                <div>
                  <h4 className="font-semibold">{device.deviceName}</h4>
                  <p className="text-sm text-muted-foreground">Last used: {formatDate(device.lastUsed)}</p>
                </div>
              </div>
              <button 
                onClick={() => revokeDevice(device.deviceId)}
                disabled={isRevoking}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50"
                title="Revoke Device"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
