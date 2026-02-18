import React from 'react';
import type { IUserModel } from '../../../../types/user';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { actionLogout } from '../../../../store/userSlice/user.slice';
import styles from './HeaderChat.module.scss';
import { AvatarAtom, MenuAtom } from '@atoms';
import { actionOpenModal } from '../../../../store/userProfileModalSlice/userProfileModal.slice';

export const HeaderChat = React.memo(() => {
  const menuData = [{ id: 1, label: 'Выйти', onClick: logout }];
  const user: IUserModel = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  function logout() {
    dispatch(actionLogout());
  }

  const handleAvatarClick = () => {
    dispatch(actionOpenModal(user));
  };

  return (
    <div className={styles.headerChat}>
      <div className={styles.avatarContainer}>
        <AvatarAtom img={user.avatarImg} status={1} onClick={handleAvatarClick} />

        <div className={styles.userInfo}>
          <div className={styles.fio}>{`${user.firstName} ${user.lastName}`}</div>

          {user.profession && <div className={styles.prof}>{user.profession}</div>}
        </div>
      </div>

      <div className={styles.toolsContainer}>
        <img className={styles.toolsContainer_icon} src={'/chat/phone.svg'} alt={'звонок'} />

        <MenuAtom
          data={menuData}
          elem={<img className={styles.toolsContainer_icon} src={'/chat/menu.svg'} alt={'меню'} />}
        />
      </div>
    </div>
  );
});
