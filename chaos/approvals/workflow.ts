/**
 * Chaos Experiment Approval Workflow
 */
export class ChaosApproval {
  public static approveExperiment(experimentId: string, approverRole: string) {
    if (approverRole === 'Site Reliability Team') {
      console.log(`Experiment ${experimentId} safely authorized.`);
      return true;
    }
    throw new Error('Unauthorized to approve chaos experiments');
  }
}
