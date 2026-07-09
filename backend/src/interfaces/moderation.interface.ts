export enum RejectionReason {
  WRONG_SUBJECT = 'WRONG_SUBJECT',
  WRONG_SEMESTER = 'WRONG_SEMESTER',
  DUPLICATE = 'DUPLICATE',
  UNREADABLE_PDF = 'UNREADABLE_PDF',
  CORRUPTED_PDF = 'CORRUPTED_PDF',
  INCOMPLETE_DOCUMENT = 'INCOMPLETE_DOCUMENT',
  LOW_QUALITY_SCAN = 'LOW_QUALITY_SCAN',
  INCORRECT_METADATA = 'INCORRECT_METADATA',
  COPYRIGHT_CONCERN = 'COPYRIGHT_CONCERN',
  CUSTOM_REASON = 'CUSTOM_REASON'
}

export enum ChangesRequestReason {
  BETTER_SCAN = 'BETTER_SCAN',
  CORRECT_METADATA = 'CORRECT_METADATA',
  CORRECT_SUBJECT = 'CORRECT_SUBJECT',
  REPLACE_PDF = 'REPLACE_PDF',
  UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
}

export interface ReviewActionDTO {
  paperId: string;
  notes?: string;
}

export interface RejectActionDTO extends ReviewActionDTO {
  reason: RejectionReason;
  customReasonText?: string;
}

export interface RequestChangesDTO extends ReviewActionDTO {
  changesRequested: ChangesRequestReason[];
}

export interface BulkActionDTO {
  paperIds: string[];
  action: 'APPROVE' | 'REJECT' | 'ARCHIVE' | 'ASSIGN';
  assigneeId?: string;
  reason?: RejectionReason;
}
