import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGetProviders, useUnlinkAccount } from '../hooks/useSocialLogin';
import { ProviderButton } from '../components/ProviderButton';
import { ShieldCheckIcon, LinkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export const LinkAccountsPage: React.FC = () => {
  const { user } = useAuth();
  const { data: providers, isLoading } = useGetProviders();
  const { mutate: unlinkAccount, isPending: isUnlinking } = useUnlinkAccount();

  const getIcon = (provider: string) => {
    // Basic icon factory for the dashboard
    return <LinkIcon className="w-5 h-5" />;
  };

  const isLinked = (provider: string) => {
    return user?.authProviders?.some((p: any) => p.provider === provider) || false;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <ShieldCheckIcon className="w-8 h-8 text-primary" />
          Linked Accounts
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your connected social accounts to enable fast, secure single sign-on.
        </p>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-muted/10">
          <h3 className="font-semibold text-lg">Connected Providers</h3>
          <p className="text-sm text-muted-foreground">You can use any of these providers to sign in to your account.</p>
        </div>
        
        <div className="p-6 space-y-4">
          {providers?.map((provider) => {
            const linked = isLinked(provider);
            return (
              <motion.div 
                key={provider}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl border flex items-center justify-between ${linked ? 'bg-success/5 border-success/20' : 'bg-background border-border'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${linked ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {getIcon(provider)}
                  </div>
                  <div>
                    <h4 className="font-semibold capitalize text-base">{provider}</h4>
                    <p className="text-sm text-muted-foreground">
                      {linked ? 'Currently connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                
                <div className="w-48">
                  <ProviderButton
                    provider={provider}
                    icon={getIcon(provider)}
                    isLinking={true}
                    isLinked={linked}
                    onUnlink={() => unlinkAccount(provider)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkAccountsPage;
