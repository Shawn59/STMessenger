export interface IChatTypes {
  className?: string;
}

export type MessageContentType =
  | { type: 'text'; text: string }
  | { type: 'gif'; link: string }
  | { type: 'file'; file: File };
