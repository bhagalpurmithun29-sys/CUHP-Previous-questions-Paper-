export interface UpdatePreferencesDto {
  theme?: 'light' | 'dark' | 'system';
  language?: 'en' | 'hi';
  
  accessibility?: {
    reducedMotion?: boolean;
    highContrast?: boolean;
    largerText?: boolean;
    keyboardNavigation?: boolean;
  };
  
  notifications?: {
    emailNotifications?: boolean;
    inAppNotifications?: boolean;
    securityAlerts?: boolean;
    academicUpdates?: boolean;
    announcements?: boolean;
  };
  
  dashboard?: {
    defaultLandingPage?: string;
    layoutPreferences?: 'grid' | 'list';
    cardDensity?: 'comfortable' | 'compact';
    visibleWidgets?: string[];
  };
  
  downloads?: {
    defaultFormat?: string;
    autoOpen?: boolean;
    retentionDays?: number;
  };
  
  privacy?: {
    profileVisibility?: 'public' | 'private' | 'connections';
    activityVisibility?: boolean;
    leaderboardParticipation?: boolean;
  };
}
