class CacheService {
  async cleanupCache(userId: string) {
    return { status: 'CACHE_CLEARED', freedBytes: 1024000 };
  }

  async getStorageQuota(userId: string) {
    return {
      usedBytes: 50 * 1024 * 1024,
      totalBytes: 500 * 1024 * 1024,
      availableBytes: 450 * 1024 * 1024
    };
  }
}

export const cacheService = new CacheService();
