import { promptManagementRepository } from '../../repositories/promptManagement.repository';

class TemplateService {
  async getTemplates() {
    return promptManagementRepository.findTemplates();
  }

  extractVariables(content: string): string[] {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1].trim());
    }
    return [...new Set(matches)];
  }

  renderTemplate(content: string, variables: Record<string, string>): string {
    let rendered = content;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{\\s*\${key}\\s*\\}\\}`, 'g');
      rendered = rendered.replace(regex, value);
    }
    return rendered;
  }
}

export const templateService = new TemplateService();
