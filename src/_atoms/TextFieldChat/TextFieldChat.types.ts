import type { TextFieldProps } from '@mui/material';

export interface ITextFieldChatTypes extends TextFieldProps {
  onSendMessage: (message: string) => void;
  onSendGifMessage: (link: string) => void;
  onSendFileMessage: (file: File) => void;
  onShowErrorUploadFile: (message: string) => void;
}
