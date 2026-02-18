import { Dialog, IconButton } from '@mui/material';
import type { IDialogProfile } from './DialogProfile.types';
import React, { FC } from 'react';
import styles from './DialogProfile.module.scss';
import { AvatarAtom } from '@atoms';
import { actionClearModal, actionCloseModal } from '../../../../store/userProfileModalSlice/userProfileModal.slice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import type { IUserProfileModalState } from '../../../../store/userProfileModalSlice/userProfileModal.slice.types';

export const DialogProfile: FC<IDialogProfile> = React.memo(() => {
  const dispatch = useAppDispatch();
  const userProfile: IUserProfileModalState = useAppSelector((state) => state.userProfile);

  const closeModal = () => {
    dispatch(actionCloseModal());

    setTimeout(() => {
      actionClearModal();
    });
  };

  return (
    <Dialog open={userProfile.isOpen} className={styles.dialogProfile}>
      <div className={styles.header}>
        <span className={styles.title}>{'Информация'}</span>

        <div className={styles.toolsBlock}>
          <IconButton>
            <img src={'/chat/phone.svg'} loading={'lazy'} />
          </IconButton>

          <IconButton onClick={closeModal}>
            <img src={'/close.svg'} loading={'lazy'} />
          </IconButton>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.avatarContainer}>
          <AvatarAtom className={styles.avatar} img={userProfile.userData?.avatarImg} />

          {userProfile.userData && (
            <>
              <div className={styles.userInfo}>
                <div className={styles.fio}>{`${userProfile.userData.firstName} ${userProfile.userData.lastName}`}</div>

                <div className={styles.profession}>{userProfile.userData.profession}</div>
              </div>
            </>
          )}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoBlock}>
            <div className={styles.title}>{'Почта'}</div>

            {userProfile.userData?.email ? (
              <a href={'mailto:' + userProfile.userData.email} className={styles.email}>
                {userProfile.userData.email}
              </a>
            ) : (
              <span className={styles.empty}>{'email не указан'}</span>
            )}
          </div>

          <div className={styles.divider} />

          <div className={styles.infoBlock}>
            <div className={styles.title}>{'Телефон'}</div>

            {userProfile.userData?.phone ? (
              <a href={'tel:' + userProfile.userData.phone.match(/\d/g).join('')} className={styles.phone}>
                {userProfile.userData.phone}
              </a>
            ) : (
              <span className={styles.empty}>{'телефон не указан'}</span>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
});
