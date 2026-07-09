import React, { useState } from 'react';
import { DocumentDuplicateIcon, CheckIcon } from '@heroicons/react/24/outline';

interface QRCodeCardProps {
  qrCode: string;
  secret: string;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({ qrCode, secret }) => {
  const [copied, setCopied] = useState(false);

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-muted/10 rounded-xl border border-border">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <img src={qrCode} alt="MFA QR Code" className="w-40 h-40 object-contain" />
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <h4 className="font-semibold mb-1">Can't scan the QR code?</h4>
          <p className="text-sm text-muted-foreground">Enter this secret key manually into your authenticator app.</p>
        </div>
        <div className="flex items-center gap-2">
          <code className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-mono tracking-widest break-all select-all">
            {secret.match(/.{1,4}/g)?.join(' ')}
          </code>
          <button 
            onClick={copySecret}
            className="p-2 bg-white dark:bg-gray-800 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            title="Copy Secret"
          >
            {copied ? <CheckIcon className="w-5 h-5 text-success" /> : <DocumentDuplicateIcon className="w-5 h-5 text-muted-foreground" />}
          </button>
        </div>
      </div>
    </div>
  );
};
