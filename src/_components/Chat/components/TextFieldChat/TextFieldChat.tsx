import { InputAdornment, TextField } from '@mui/material';
import type { ITextFieldChatTypes } from './TextFieldChat.types';
import { ChangeEvent, FC, useState } from 'react';
import styles from './TextFieldChat.module.scss';
import classNames from 'classnames';
import { ButtonAtom, DownloadFile } from '@atoms';
import { ClipSvg, GifSvg, SmileSvg } from '../../../../svg';
import { EmojiPickerMol, GifPickerMol } from '@molecules';
import { constants } from '../../../../constants';
import type { onRejectType } from '../../../../_atoms/DownloadFile/DownloadFile.types';

export const TextFieldChat: FC<ITextFieldChatTypes> = ({
  className,
  onSendMessage,
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
      onSendMessage({ type: 'text', text: newMessage });

      setMessage('');
    }
  };

  const handleSendGif = (link: string) => {
    if (link) {
      onSendMessage({ type: 'gif', link });
    }
  };

  const handleAcceptFile = (files: File[]) => {
    const file = files[0];

    if (file) {
      onSendMessage({ type: 'file', file: file });
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

  const handleRejectFile: onRejectType = (file, error) => {
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
                <EmojiPickerMol onSelect={addEmoji}>
                  <SmileSvg className={classNames(styles.endIcon, styles.smile)} />
                </EmojiPickerMol>
              </InputAdornment>

              <InputAdornment position="end">
                <GifPickerMol onSelect={handleSendGif}>
                  <GifSvg className={classNames(styles.endIcon, styles.withFill)} />
                </GifPickerMol>
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
