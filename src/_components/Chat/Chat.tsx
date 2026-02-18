import styles from './Chat.module.scss';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import type { IChatTypes, IMessage } from './Chat.types';
import { AvatarAtom, MenuAtom, TextFieldChat } from '@atoms';
import { Message } from './components/Message/Message';
import uuid from 'react-uuid';
import socket from '../../socket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDateLocalUtc } from '../../utils/getFromatedDate';
import { DialogProfile } from '../DialogProfile/DialogProfile';
import { actionLogout } from '../../store/userSlice/user.slice';
import type { IUserModel } from '../../types/user';
import { actionShowSnackbar } from '../../store/snackbarSlice/snackbarSlice.slice';
import type { ISnackbarState } from '../../store/snackbarSlice/snackbarSlice.slice.types';

export const Chat: FC<IChatTypes> = ({ className = '' }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);

  const dispatch = useAppDispatch();
  const user: IUserModel = useAppSelector((state) => state.user.user);

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
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };

    //отправка сообещния
    socket.emit('message', newMessage);
  };

  const sendGifMessage = (link: string) => {
    const newMessage: IMessage = {
      id: uuid(),
      text: '',
      link,
      user,
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    };

    //отправка сообещния
    socket.emit('message', newMessage);
  };

  const sendFileMessage = (file: File) => {
    console.log('file = ', file);
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;

      const newMessage: IMessage = {
        id: uuid(),
        text: '',
        user,
        file: {
          name: file.name,
          type: file.type,
          size: file.size,
          buffer: arrayBuffer,
        },
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };

      //отправка сообещния
      socket.emit('message', newMessage);
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    socket.on('message', (message: IMessage) => {
      console.log('Пришло новое сообщение', message);

      if (message.user.id !== user.id) {
        const snackbarData: ISnackbarState = {
          message: 'Пришло новое сообщение',
          severity: 'success',
        };

        dispatch(actionShowSnackbar(snackbarData));
      }

      setMessageHistory((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  // Подключение к Socket.IO после ввода имени
  /*  useEffect(() => {
    //if (!isNameSet) return;

    // Подключаемся, передавая имя пользователя в query-параметрах
    /!*  const newSocket = io(SERVER_URL, {
      query: { username: `${user.name} ${user.lastName}` },
    });*!/

    /!*newSocket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });*!/

    /!* newSocket.on('user joined', (name) => {
      setMessages((prev) => [...prev, { system: true, text: `${name} присоединился к чату` }]);
    });

    newSocket.on('user left', (name) => {
      setMessages((prev) => [...prev, { system: true, text: `${name} покинул чат` }]);
    });*!/

    socket.on('connect_error', (err) => {
      console.error('Ошибка подключения:', err.message);
      alert('Не удалось подключиться к серверу');
    });

    // setSocket(newSocket);

    // Очистка при размонтировании
    return () => {
      socket.disconnect();
    };
  }, []);*/

  // Отправка имени пользователя (логин)
  const handleLogin = (e) => {
    e.preventDefault();
    if (user.firstName.trim()) {
      setIsLoggedIn(true);
      socket.emit('user_join', user.firstName);
    }
  };

  /*  const sendMessage = (e) => {
    e.preventDefault();

    if (message.trim()) {
      socket.emit('send_message', { message });
      setMessage('');
    }
  };*/

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
          <AvatarAtom img={user.avatarImg} status={user.status} />

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

      <div className={styles.body}>
        {messageHistory.map((item) => {
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
