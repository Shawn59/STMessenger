import styles from './Chat.module.scss';
import classNames from 'classnames';
import React, { FC, useEffect, useRef } from 'react';
import type { IChatTypes } from './Chat.types';
import { Message } from './components/Message/Message';
import { TextFieldChat } from './components/TextFieldChat/TextFieldChat';
import uuid from 'react-uuid';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDateLocalUtc } from '../../utils/getFromatedDate';
import { DialogProfile } from './components/DialogProfile/DialogProfile';
import type { IUserModel } from '../../types/user';
import { actionShowSnackbar } from '../../store/snackbarSlice/snackbarSlice.slice';
import type { ISnackbarState } from '../../store/snackbarSlice/snackbarSlice.slice.types';
import type { IMessage, ISocketData } from '../../store/socketSlice/socket.slice.types';
import { actionSendMessage } from '../../store/socketSlice/socket.slice';
import { arrayBufferToBase64 } from '../../utils/bufferUtils';
import { isUserNearBottom } from './helpers/isUserNearBottom';
import { HeaderChat } from './components/HeaderChat/HeaderChat';
import type { MessageContentType } from './Chat.types';

export const Chat: FC<IChatTypes> = ({ className = '' }) => {
  const dispatch = useAppDispatch();
  const user: IUserModel = useAppSelector((state) => state.user.user);
  const socket: ISocketData = useAppSelector((state) => state.socket);
  let nextDate = '';
  const messagesContainerRef = useRef<HTMLElement | null>(null);
  const endDivRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (Array.isArray(socket.messages)) {
      scrollToBottomIfNeeded(socket.messages[socket.messages.length - 1]);
    }
  }, [socket.messages, user]);

  function scrollToBottomIfNeeded(message: IMessage) {
    if (messagesContainerRef.current && user && endDivRef.current) {
      if (message?.user?.id === user.id || isUserNearBottom(messagesContainerRef.current)) {
        endDivRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  const showErrorUploadFile = (message: string) => {
    const snackbar: ISnackbarState = {
      message,
      severity: 'error',
      duration: 10000,
    };

    dispatch(actionShowSnackbar(snackbar));
  };

  const sendMessage = async (content: MessageContentType) => {
    const baseMessage = {
      id: uuid(),
      user,
      senderId: socket.senderId,
      timestamp: new Date().toISOString(),
    };

    let message: IMessage;

    if (content.type === 'text') {
      message = { ...baseMessage, text: content.text };
    } else if (content.type === 'gif') {
      message = { ...baseMessage, text: '', link: content.link };
    } else {
      const arrayBuffer = await readFileAsArrayBuffer(content.file);
      const base64 = arrayBufferToBase64(arrayBuffer);
      message = {
        ...baseMessage,
        text: '',
        file: {
          name: content.file.name,
          type: content.file.type,
          size: content.file.size,
          buffer: base64,
        },
      };
    }

    dispatch(actionSendMessage(message));
  };

  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });

  return (
    <div className={classNames(styles.chat, className as any)}>
      <div className={styles.logoContainer}>
        <img className={styles.logoContainer_logo} src={'/chat/st-logo.svg'} alt={'логотип'} />
        <span className={styles.logoContainer_text}>{'Messenger'}</span>
      </div>

      <HeaderChat />

      <div className={styles.content} ref={messagesContainerRef}>
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

        <div ref={endDivRef} />

        <DialogProfile />
      </div>

      <div className={styles.messageInput}>
        <TextFieldChat
          placeholder={'Введите текст...'}
          onSendMessage={sendMessage}
          onShowErrorUploadFile={showErrorUploadFile}
        />
      </div>
    </div>
  );
};
