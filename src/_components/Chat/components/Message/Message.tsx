import type { IMessageTypes } from './Message.types';
import { FC } from 'react';
import { AvatarAtom } from '@atoms';
import styles from './Message.module.scss';

export const Message: FC<IMessageTypes> = ({ message, name, lastName, avatarImg, date }) => {
  if (!name || !lastName || !date || !message) return;

  return (
    <div className={styles.message}>
      <AvatarAtom img={avatarImg} />

      <div className={styles.messageBlock}>
        <div className={styles.messageBlock_header}>
          <div className={styles.header_fio}>{`${name} ${lastName}`}</div>

          <div className={styles.header_date}>{date}</div>
        </div>

        <div className={styles.text}>{message}</div>
      </div>
    </div>
  );
};
