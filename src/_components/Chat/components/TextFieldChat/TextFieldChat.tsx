import { InputAdornment, TextField } from '@mui/material';
import type { ITextFieldChatTypes } from './TextFieldChat.types';
import { ChangeEvent, FC, useState } from 'react';
import styles from './TextFieldChat.module.scss';
import classNames from 'classnames';
import { ButtonAtom } from '../Button/Button';
import { ClipSvg, GifSvg, SmileSvg } from '../../svg';
import { EmojiPickerAtom } from '../EmojiPicker/EmojiPicker';
import { GifPickerAtom } from '../GifPicker/GifPicker';
import { DownloadFile } from '../DownloadFile/DownloadFile';
import { constants } from '../../constants';
import type { onRejectType } from '../DownloadFile/DownloadFile.types';

export const TextFieldChat: FC<ITextFieldChatTypes> = ({
  className,
  onSendMessage,
  onSendGifMessage,
  onSendFileMessage,
  onShowErrorUploadFile,
  ...rest
}) => {
  const [message, setMessage] = useState('');

  const fileOptions = {
    accept: constants.file.mimeTypeAccept,
    maxFiles: 1,
    maxSize: 1024 * 1024, //1mb
  };

  const handleSendMessage = () => {
    const newMessage = message.trim();

    if (newMessage) {
      onSendMessage(newMessage);

      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleSendMessage();
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setMessage(value);
  };

  const addEmoji = (value: string) => {
    setMessage((prevState) => `${prevState}${value}`);
  };

  const handleAcceptFile = (files: File[]) => {
    const file = files[0];

    if (file) {
      onSendFileMessage(file);
    }
  };

  const handleRejectFile: onRejectType = (file, error) => {
    console.log(' handleRejectFile file= ', file);
    console.log(' handleRejectFile error= ', error);

    if (onShowErrorUploadFile) {
      onShowErrorUploadFile(error.message);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        className={classNames(styles.textFieldChat, className as any)}
        autoComplete={'off'}
        value={message}
        onKeyDown={handleKeyDown}
        onChange={handleChangeValue}
        InputProps={{
          endAdornment: (
            <>
              <InputAdornment position="end">
                <DownloadFile options={fileOptions} onReject={handleRejectFile} onAccept={handleAcceptFile}>
                  <ClipSvg className={classNames(styles.endIcon, styles.withFill)} />
                </DownloadFile>
              </InputAdornment>

              <InputAdornment position="end" className={styles.smileIconContainer}>
                <EmojiPickerAtom onSelect={addEmoji}>
                  <SmileSvg className={classNames(styles.endIcon, styles.smile)} />
                </EmojiPickerAtom>
              </InputAdornment>

              <InputAdornment position="end">
                <GifPickerAtom onSelect={onSendGifMessage}>
                  <GifSvg className={classNames(styles.endIcon, styles.withFill)} />
                </GifPickerAtom>
              </InputAdornment>

              <InputAdornment className={styles.sendBtnContainer} position="end">
                <ButtonAtom
                  customTheme={'Orange'}
                  customSize={'Small'}
                  onClick={handleSendMessage}
                  endIcon={<img src={'/chat/right-arrow.svg'} />}
                />
              </InputAdornment>
            </>
          ),
        }}
        {...rest}
      />
    </>
  );
};
