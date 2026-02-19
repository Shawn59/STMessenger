import type { TextFieldProps } from '@mui/material';
import type { MessageContentType } from '../../Chat.types';

export interface ITextFieldChatTypes extends TextFieldProps {
  onSendMessage: (value: MessageContentType) => void;
  onShowErrorUploadFile: (message: string) => void;
}
