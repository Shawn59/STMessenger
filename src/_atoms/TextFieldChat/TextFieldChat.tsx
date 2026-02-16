import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { ITextFieldChatTypes } from './TextFieldChat.types';
import { FC, useRef } from 'react';
import styles from './TextFieldChat.module.scss';
import classNames from 'classnames';
import { ButtonAtom } from '../Button/Button';
import { ClipSvg, GifSvg, SmileSvg } from '../../svg';

export const TextFieldChat: FC<ITextFieldChatTypes> = ({ className, onChange, onSubmit, ...rest }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <TextField
      fullWidth
      className={classNames(styles.textFieldChat, className as any)}
      autoComplete={'off'}
      onKeyDown={handleKeyDown}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <ClipSvg className={classNames(styles.endIcon, styles.withFill)} />
            </InputAdornment>

            <InputAdornment position="end">
              <SmileSvg className={classNames(styles.endIcon, styles.smile)} />
            </InputAdornment>

            <InputAdornment position="end">
              <GifSvg className={classNames(styles.endIcon, styles.withFill)} />
            </InputAdornment>

            <InputAdornment className={styles.sendBtnContainer} position="end">
              <ButtonAtom
                customTheme={'Orange'}
                customSize={'Small'}
                onClick={onSubmit}
                endIcon={<img src={'/chat/right-arrow.svg'} />}
              />
            </InputAdornment>
          </>
        ),
      }}
      {...rest}
    />
  );
};
