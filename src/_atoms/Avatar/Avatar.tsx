import styles from './Avatar.module.scss';
import type { IAvatarTypes } from './Avatar.types';
import { FC } from 'react';

export const AvatarAtom: FC<IAvatarTypes> = ({ img, status = 0 }) => {
  return (
    <div className={styles.avatar}>
      <img src={img ?? '/chat/avatar-template.svg'} alt={'аватар'} />
      {!!status && <div className={styles.status} />}
    </div>
  );
};
