class TelemetryRepository {
  async getOverview() {
    return {
      totalOfflineSessions: 1450,
      activeDevices: 320,
      averageSyncDurationMs: 450,
      cacheHitRate: 0.78
    };
  }

  async getSyncStats() {
    return {
      successRate: 0.99,
      failedSyncs: 12,
      queuedOperations: 45,
      averageRetryCount: 1.2
    };
  }

  async getStorageStats() {
    return {
      totalCacheSizeUsed: 1024 * 1024 * 500, // 500MB total across fleet
      averageCachePerUser: 1024 * 1024 * 5, // 5MB
      hitRate: 0.85,
      missRate: 0.15
    };
  }

  async getNetworkStats() {
    return {
      averageOfflineDurationMinutes: 45,
      connectivityDropsPerHour: 2.3
    };
  }
}

export const telemetryRepository = new TelemetryRepository();
