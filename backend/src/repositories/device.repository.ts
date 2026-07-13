class DeviceRepository {
  private devices: Map<string, any[]> = new Map();
  private sessions: Map<string, any[]> = new Map();

  async getDevices(userId: string) {
    return this.devices.get(userId) || [];
  }

  async addDevice(userId: string, device: any) {
    const list = await this.getDevices(userId);
    list.push(device);
    this.devices.set(userId, list);
    return device;
  }

  async updateDevice(userId: string, deviceId: string, updates: any) {
    const list = await this.getDevices(userId);
    const idx = list.findIndex(d => d.id === deviceId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updates };
      this.devices.set(userId, list);
      return list[idx];
    }
    return null;
  }

  async removeDevice(userId: string, deviceId: string) {
    let list = await this.getDevices(userId);
    list = list.filter(d => d.id !== deviceId);
    this.devices.set(userId, list);
    return { success: true };
  }

  async getSessions(userId: string) {
    return this.sessions.get(userId) || [];
  }

  async removeSession(userId: string, sessionId: string) {
    let list = await this.getSessions(userId);
    list = list.filter(s => s.id !== sessionId);
    this.sessions.set(userId, list);
    return { success: true };
  }

  async removeOtherSessions(userId: string, currentSessionId: string) {
    let list = await this.getSessions(userId);
    list = list.filter(s => s.id === currentSessionId);
    this.sessions.set(userId, list);
    return { success: true };
  }
}

export const deviceRepository = new DeviceRepository();
