/**
 * Feature Flag Management
 * Supports Boolean, Percentage, and Role-based rollouts.
 */
export class FeatureFlagManager {
  private flags: Map<string, any> = new Map();

  public isEnabled(flagKey: string, userContext: any): boolean {
    const flag = this.flags.get(flagKey);
    if (!flag) return false;
    
    // Evaluate percentage rollouts
    if (flag.percentage && Math.random() * 100 > flag.percentage) {
      return false;
    }
    
    // Evaluate role-based
    if (flag.roles && !flag.roles.includes(userContext.role)) {
      return false;
    }
    
    return true;
  }
}
