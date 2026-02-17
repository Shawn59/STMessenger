import { Dialog, IconButton } from '@mui/material';
import type { IDialogProfile } from './DialogProfile.types';
import React, { FC } from 'react';
import styles from './DialogProfile.module.scss';
import { AvatarAtom } from '@atoms';
import { actionCloseModal } from '../../store/userProfileModalSlice/userProfileModal.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { IUserProfileModalState } from '../../store/userProfileModalSlice/userProfileModal.slice.types';

export const DialogProfile: FC<IDialogProfile> = React.memo(() => {
  const dispatch = useAppDispatch();
  const userProfile: IUserProfileModalState = useAppSelector((state) => state.userProfile);

  console.log('userProfile = ', userProfile);

  const closeModal = () => {
    dispatch(actionCloseModal());
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
          <AvatarAtom className={styles.avatar} />

          {userProfile.userData && (
            <>
              <div className={styles.userInfo}>
                <div className={styles.fio}>{`${userProfile.userData.firstName} ${userProfile.userData.lastName}`}</div>

                <div className={styles.profession}>{userProfile.userData.profession}</div>
              </div>

              {userProfile.userData?.email && (
                <div>
                  <div>{'Почта'}</div>

                  <div>{userProfile.userData.email}</div>
                </div>
              )}

              {userProfile.userData?.phone && (
                <div>
                  <div>{'Телефон'}</div>

                  <div>{userProfile.userData.phone}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
});
