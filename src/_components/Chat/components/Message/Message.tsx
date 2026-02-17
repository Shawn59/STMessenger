import type { IMessageTypes } from './Message.types';
import { FC } from 'react';
import { AvatarAtom } from '@atoms';
import styles from './Message.module.scss';
import classNames from 'classnames';
import { getDateLocalUtc } from '../../../../utils/getFromatedDate';
import { useAppDispatch } from '../../../../store/hooks';
import { actionOpenModal } from '../../../../store/userProfileModalSlice/userProfileModal.slice';

export const Message: FC<IMessageTypes> = ({ isAuthor = false, message, user, date }) => {
  if (!user || !date || !message) return;

  const dispatch = useAppDispatch();

  const handleAvatarClick = () => {
    dispatch(actionOpenModal(user));
  };

  return (
    <div className={classNames(styles.message, isAuthor && styles.isAuthor)}>
      <AvatarAtom img={user.avatarImg} onClick={handleAvatarClick} />

      <div className={styles.messageBlock}>
        <div className={styles.messageBlock_header}>
          <div className={styles.header_fio}>{`${user.firstName} ${user.lastName}`}</div>

          <div className={styles.header_date}>{getDateLocalUtc(date)}</div>
        </div>

        <div className={styles.text}>{message}</div>
      </div>
    </div>
  );
};
