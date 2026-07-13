import { mobileOperationsRepository } from '../../repositories/mobileOperations.repository';

class IncidentManagementService {
  async getIncidents() {
    return mobileOperationsRepository.getIncidents();
  }

  async createIncident(incidentData: any) {
    return mobileOperationsRepository.createIncident(incidentData);
  }
}

export const incidentManagementService = new IncidentManagementService();
