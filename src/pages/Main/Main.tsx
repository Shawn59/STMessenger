import { Chat } from '@components';
import styles from './Main.module.scss';
import { useEffect } from 'react';
import { Auth } from '../../_components/Auth/Auth';
import { constants } from '../../constants';
import { useDispatch } from 'react-redux';
import { actionSetUser } from '../../store/userSlice/user.slice';
import { useAppSelector } from '../../store/hooks';

export const Main = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const userInfo = localStorage.getItem(constants.localStorage.USER_INFO);

    if (userInfo) {
      try {
        dispatch(actionSetUser(JSON.parse(userInfo)));
      } catch (error) {
        console.error('Невалидные данные для userInfo', error);

        localStorage.removeItem(constants.localStorage.USER_INFO);
      }
    }
  }, [dispatch]);

  return <section className={styles.main}>{user ? <Chat className={styles.chatContainer} /> : <Auth />}</section>;
};
