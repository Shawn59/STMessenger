import styles from './Chat.module.scss';
import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react';
import type { IChatTypes } from './Chat.types';
import { AvatarAtom, ButtonAtom, TextFieldChat } from '@atoms';
import { Message } from './components/Message/Message';
import { io } from 'socket.io-client';

export interface IUser {
  name: string;
  lastName: string;
  status: 1 | 0;
  profession?: string;
  avatarImg?: string;
}

//const socket = io('http://localhost:5000');

export const Chat: FC<IChatTypes> = ({ className = '' }) => {
  const [user, setUser] = useState<IUser>({ name: 'Петя', lastName: 'Петровиков', status: 1, profession: 'менеджер' });
  const [message, setMessage] = useState('');

  const data = [
    { id: 1, message: 'Привет, как дела?', user, date: '12.11.2012' },
    { id: 2, message: 'Сегодня отличная погода, не правда ли?', user, date: '15.03.2013' },
    {
      id: 3,
      message: 'Нужно будет купить продукты: молоко, хлеб, яйца, сыр, помидоры и ещё что-нибудь к чаю.',
      user,
      date: '05.07.2014',
    },
    { id: 4, message: 'Встреча назначена на 15:00 в офисе, не опаздывай.', user, date: '22.09.2015' },
    { id: 5, message: 'Я вчера посмотрел интересный фильм, советую.', user, date: '10.12.2016' },
    {
      id: 6,
      message: 'Код должен быть написан аккуратно и с комментариями, чтобы его можно было легко поддерживать.',
      user,
      date: '01.02.2017',
    },
    { id: 7, message: 'Срочно! Позвони мне, когда освободишься.', user, date: '18.06.2018' },
    { id: 8, message: 'Завтра выходной, можно выспаться.', user, date: '30.11.2019' },
    { id: 9, message: 'Не забудь оплатить счета за коммунальные услуги до 25 числа.', user, date: '14.04.2020' },
    {
      id: 10,
      message: 'Это сообщение просто для заполнения массива, но оно достаточно длинное, чтобы показать разнообразие.',
      user,
      date: '07.08.2021',
    },
  ];

  useEffect(() => {
    // socket.emit('join');
  }, []);

  const handleChangeValue = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setMessage(value);
  };

  const sendMessage = () => {
    setMessage('');
  };

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
            <div className={styles.fio}>{`${user.name} ${user.lastName}`}</div>

            {user.profession && <div className={styles.prof}>{user.profession}</div>}
          </div>
        </div>

        <div className={styles.toolsContainer}>
          <img className={styles.toolsContainer_icon} src={'/chat/phone.svg'} alt={'звонок'} />
          <img className={styles.toolsContainer_icon} src={'/chat/menu.svg'} alt={'меню'} />
        </div>
      </div>

      <div className={styles.body}>
        {data.map((item) => {
          return (
            <Message
              key={item.id}
              message={item.message}
              name={item.user.name}
              lastName={item.user.lastName}
              avatarImg={item.user.avatarImg}
              date={item.date}
            />
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
    </div>
  );
};
