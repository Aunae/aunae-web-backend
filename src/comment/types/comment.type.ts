export const COMMENT_STATUS = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const;

export type COMMENT_STATUS = typeof COMMENT_STATUS[keyof typeof COMMENT_STATUS];
