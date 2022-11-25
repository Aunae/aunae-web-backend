export const BOARD_STATUS = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
} as const;

export type BOARD_STATUS = typeof BOARD_STATUS[keyof typeof BOARD_STATUS];

export const BOARD_TYPES = {
  NORMAL: 'NORMAL',
  QUESTION: 'QUESTION',
} as const;

export type BOARD_TYPES = typeof BOARD_TYPES[keyof typeof BOARD_TYPES];
