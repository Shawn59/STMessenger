import React from 'react';
import type { IUserModel } from '../../../../types/user';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { actionLogout, actionSetUser } from '../../../../store/userSlice/user.slice';
import styles from './HeaderChat.module.scss';
import { AvatarAtom, DownloadFile, MenuAtom } from '@atoms';
import { constants } from '../../../../constants';
import type { onRejectType } from '../../../../_atoms/DownloadFile/DownloadFile.types';
import type { ISnackbarState } from '../../../../store/snackbarSlice/snackbarSlice.slice.types';
import { actionShowSnackbar } from '../../../../store/snackbarSlice/snackbarSlice.slice';
import { arrayBufferToBase64 } from '../../../../utils/bufferUtils';

export const HeaderChat = React.memo(() => {
  const menuData = [{ id: 1, label: 'Выйти', onClick: logout }];
  const user: IUserModel = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const fileOptions = {
    accept: constants.file.mimeTypeImages,
    maxFiles: 1,
    maxSize: 1024 * 1024, //1mb
  };

  function logout() {
    dispatch(actionLogout());
  }

  const handleAcceptFile = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      let base64 = '';

      if (arrayBuffer instanceof ArrayBuffer) {
        base64 = arrayBufferToBase64(arrayBuffer);
      }

      const url = `data:${file.type};base64,${base64}`;

      const updateUser = { ...user, avatarImg: url };
      dispatch(actionSetUser(updateUser));
    };

    reader.readAsArrayBuffer(file);
  };

  const handleRejectFile: onRejectType = (_, error) => {
    const snackbar: ISnackbarState = {
      message: error.message,
      severity: 'error',
      duration: 10000,
    };

    dispatch(actionShowSnackbar(snackbar));
  };

  return (
    <div className={styles.headerChat}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarBlock}>
          <DownloadFile options={fileOptions} onReject={handleRejectFile} onAccept={handleAcceptFile}>
            <AvatarAtom img={user.avatarImg} status={1} />
          </DownloadFile>
        </div>

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
