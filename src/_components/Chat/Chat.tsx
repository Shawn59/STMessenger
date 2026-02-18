import styles from './Chat.module.scss';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import type { IChatTypes } from './Chat.types';
import { AvatarAtom, MenuAtom, TextFieldChat } from '@atoms';
import { Message } from './components/Message/Message';
import uuid from 'react-uuid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDateLocalUtc } from '../../utils/getFromatedDate';
import { DialogProfile } from '../DialogProfile/DialogProfile';
import { actionLogout } from '../../store/userSlice/user.slice';
import type { IUserModel } from '../../types/user';
import { actionShowSnackbar } from '../../store/snackbarSlice/snackbarSlice.slice';
import type { ISnackbarState } from '../../store/snackbarSlice/snackbarSlice.slice.types';
import type { IMessage, ISocketData } from '../../store/socketSlice/socket.slice.types';
import { actionSendMessage } from '../../store/socketSlice/socket.slice';
import { arrayBufferToBase64 } from '../../utils/bufferUtils';

export const Chat: FC<IChatTypes> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const user: IUserModel = useAppSelector((state) => state.user.user);
  const socket: ISocketData = useAppSelector((state) => state.socket);

  let nextDate = '';

  const menuData = [{ id: 1, label: 'Выйти', onClick: logout }];

  const showErrorUploadFile = (message: string) => {
    const snackbar: ISnackbarState = {
      message,
      severity: 'error',
      duration: 10000,
    };

    dispatch(actionShowSnackbar(snackbar));
  };

  const sendMessage = (message: string) => {
    const newMessage: IMessage = {
      id: uuid(),
      text: message,
      user,
      senderId: socket.senderId,
      timestamp: new Date().toISOString(),
    };

    dispatch(actionSendMessage(newMessage));
  };

  const sendGifMessage = (link: string) => {
    const newMessage: IMessage = {
      id: uuid(),
      text: '',
      link,
      user,
      senderId: socket.senderId,
      timestamp: new Date().toISOString(),
    };

    dispatch(actionSendMessage(newMessage));
  };

  const sendFileMessage = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      let base64 = '';

      if (arrayBuffer instanceof ArrayBuffer) {
        base64 = arrayBufferToBase64(arrayBuffer);
      }

      const newMessage: IMessage = {
        id: uuid(),
        text: '',
        user,
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          buffer: base64,
        },
        senderId: socket.senderId,
        timestamp: new Date().toISOString(),
      };

      dispatch(actionSendMessage(newMessage));
    };

    reader.readAsArrayBuffer(file);
  };

  function logout() {
    dispatch(actionLogout());
  }

  return (
    <div className={classNames(styles.chat, className as any)}>
      <div className={styles.logoContainer}>
        <img className={styles.logoContainer_logo} src={'/chat/st-logo.svg'} alt={'логотип'} />
        <span className={styles.logoContainer_text}>{'Messenger'}</span>
      </div>

      <div className={styles.header}>
        <div className={styles.avatarContainer}>
          <AvatarAtom img={user.avatarImg} status={1} />

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

      <div className={styles.content}>
        {socket?.messages?.map((item) => {
          let isShowDate = false;

          let date = getDateLocalUtc(item.timestamp, 'd MMMM');

          if (nextDate !== date) {
            nextDate = date;
            isShowDate = true;
          }

          return (
            <div key={item.id}>
              {isShowDate && <div className={styles.dateChip}>{<span>{date}</span>}</div>}

              <Message
                message={item.text}
                link={item.link}
                file={item.file}
                isAuthor={item.user.id === user.id}
                user={item.user}
                date={item.timestamp}
              />
            </div>
          );
        })}

        <DialogProfile />
      </div>

      <div className={styles.messageInput}>
        <TextFieldChat
          placeholder={'Введите текст...'}
          onSendMessage={sendMessage}
          onSendGifMessage={sendGifMessage}
          onSendFileMessage={sendFileMessage}
          onShowErrorUploadFile={showErrorUploadFile}
        />
      </div>
    </div>
  );
};
