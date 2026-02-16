import { Chat } from '@components';
import styles from './Main.module.scss';
import { useState } from 'react';
import { Auth } from '../../_components/Auth/Auth';

interface IResponse<T> {
  data: T;
  status: number;
  error: string;
}

/*const FormLogin = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>;

  const changeLogin = (e) => {
    const { value } = e.currentTarget;
    setLogin(value);

    dispatch(userSliceActions.addJwt('dd'));
  };

  const changePassword = (e) => {
    const { value } = e.currentTarget;
    setPassword(value);
  };

  return (
    <div>
      <div>{'login'}</div>
      <input value={login} onChange={changeLogin} />

      <div>{'password'}</div>
      <input value={password} onChange={changePassword} />
    </div>
  );
};*/

export const Main = () => {
  return (
    <section className={styles.main}>
      {/*<Auth />*/}

      <Chat className={styles.chatContainer} />
      {/* <FormLogin />*/}
    </section>
  );
};
