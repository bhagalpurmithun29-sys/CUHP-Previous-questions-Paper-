import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = '/api/v1/agents';

export interface AgentInfo {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
}

export interface AgentStatus {
  activeAgents: number;
  systemHealth: string;
}

export const useGetAgentStatus = () => {
  return useQuery({
    queryKey: ['agentStatus'],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/status`);
      return response.data.data as AgentStatus;
    }
  });
};

export const useGetAgentList = () => {
  return useQuery({
    queryKey: ['agentList'],
    queryFn: async () => {
      const response = await axios.get(`\${API_URL}/list`);
      return response.data.data as AgentInfo[];
    }
  });
};

export const useAgentQuery = () => {
  return useMutation({
    mutationFn: async (question: string) => {
      const response = await axios.post(`\${API_URL}/query`, { question });
      return response.data.data;
    }
  });
};
