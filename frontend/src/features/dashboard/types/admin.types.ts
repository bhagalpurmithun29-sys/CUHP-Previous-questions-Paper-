export interface EntityStats {
  total: number;
  active: number;
  archived: number;
}

export interface DashboardStatistics {
  schools: EntityStats;
  departments: EntityStats;
  courses: EntityStats;
  semesters: EntityStats;
  subjects: EntityStats;
}

export interface HierarchyNode {
  _id: string;
  name: string;
  code: string;
  status: string;
  children?: HierarchyNode[];
}

export interface AuditLog {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  action: string;
  targetId?: string;
  targetModel?: string;
  metadata?: any;
  ipAddress?: string;
  createdAt: string;
}

export interface ValidationReport {
  brokenReferences: {
    departmentsWithoutValidSchool: string[];
    coursesWithoutValidDepartment: string[];
  };
}
