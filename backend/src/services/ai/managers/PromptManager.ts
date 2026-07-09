export class PromptManager {
  private templates: Map<string, string> = new Map();

  constructor() {
    this.registerTemplate('explain_concept', 'You are an expert tutor. Explain the following academic concept clearly to a university student: {{concept}}');
    this.registerTemplate('summarize_paper', 'Summarize the key points of this academic paper, focusing on methodologies and findings: {{text}}');
  }

  registerTemplate(name: string, template: string) {
    this.templates.set(name, template);
  }

  buildPrompt(templateName: string, variables: Record<string, string>): string {
    let template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`Prompt template '${templateName}' not found.`);
    }

    for (const [key, value] of Object.entries(variables)) {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
    return template;
  }
}

export const promptManager = new PromptManager();
