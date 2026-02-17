import styles from './Chat.module.scss';
import classNames from 'classnames';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import type { IChatTypes } from './Chat.types';
import { AvatarAtom, TextFieldChat } from '@atoms';
import { Message } from './components/Message/Message';
import uuid from 'react-uuid';
import socket from '../../socket';
import type { IUser } from '../../store/userSlice/user.slice.types';
import { useAppSelector } from '../../store/hooks';
import { getDateLocalUtc } from '../../utils/getFromatedDate';
import { DialogProfile } from '../DialogProfile/DialogProfile';

const field = () => {
  return <div></div>;
};

export const Chat: FC<IChatTypes> = ({ className = '' }) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  let nextDate = '';
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  const [messageHistory, setMessageHistory] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: uuid(),
        text: message,
        user,
        senderId: socket.id,
        timestamp: new Date().toISOString(),
      };

      //отправка сообещния
      socket.emit('message', newMessage);

      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('message', (message) => {
      console.log('Пришло новое сообщение', message);

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

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setMessage(value);
  };

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
          <img className={styles.toolsContainer_icon} src={'/chat/menu.svg'} alt={'меню'} />
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
                isAuthor={item.user.id === user.id}
                user={user}
                /*    name={item.user.firstName}
                lastName={item.user.lastName}
                avatarImg={item.user.avatarImg}*/
                date={item.timestamp}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.messageInput}>
        <TextFieldChat
          placeholder={'Введите текст...'}
          value={message}
          onSubmit={sendMessage}
          onChange={handleChangeValue}
        />
      </div>

      <DialogProfile />
    </div>
  );
};
