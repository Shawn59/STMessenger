import type { IMessageTypes } from './Message.types';
import React, { FC, useMemo } from 'react';
import { AvatarAtom } from '@atoms';
import styles from './Message.module.scss';
import classNames from 'classnames';
import { getDateLocalUtc } from '../../../../utils/getFromatedDate';
import { useAppDispatch } from '../../../../store/hooks';
import { actionOpenModal } from '../../../../store/userProfileModalSlice/userProfileModal.slice';
import { constants } from '../../../../constants';

export const Message: FC<IMessageTypes> = React.memo(({ isAuthor = false, message, link, file, user, date }) => {
  if (!user || (!date && (!message || !link || !file))) return;

  console.log('Message')

  const dispatch = useAppDispatch();

  const handleAvatarClick = () => {
    dispatch(actionOpenModal(user));
  };

  const getFile = useMemo(() => {
    if (file && typeof file.buffer === 'string') {
      const mimeKeys = Object.keys(constants.file.mimeTypeImages);

      const isImage = mimeKeys.includes(file.type);

      const url = `data:${file.type};base64,${file.buffer}`;

      return (
        <div className={styles.fileContainer}>
          <a href={url} download={file.name}>
            {isImage ? <img src={url} className={styles.fileImage} /> : file.name}
          </a>
        </div>
      );
    }
  }, []);

  return (
    <div className={classNames(styles.message, isAuthor && styles.isAuthor)}>
      <AvatarAtom img={user.avatarImg} onClick={handleAvatarClick} />

      <div className={styles.messageBlock}>
        <div className={styles.messageBlock_header}>
          <div className={styles.header_fio}>{`${user.firstName} ${user.lastName}`}</div>

          <div className={styles.header_date}>{getDateLocalUtc(date)}</div>
        </div>

        {message && <div className={styles.text}>{message}</div>}

        {link && <img src={link} className={styles.img} />}

        {file && getFile}
      </div>
    </div>
  );
}, (prev, next) => {
  return prev.user.avatarImg === next.user.avatarImg &&
      prev.user === next.user;
});
