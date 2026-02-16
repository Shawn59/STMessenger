import { useState } from 'react';

import { AppDispatch } from '../../store/store';
import { userSliceActions } from '../../store/user.slice';
import { useDispatch } from 'react-redux';

interface IUser {
  name: string;
  last_name: string;
  patronymic: string;
  age: number;
}

interface IResponse<T> {
  data: T;
  status: number;
  error: string;
}

const FormLogin = () => {
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
};

export const Main = () => {
  const getArr = <T,>(arr: T[]) => {
    return arr[0];
  };

  const data: IResponse<IUser> = {
    data: { name: '23', last_name: 'df', patronymic: 'fg', age: 23 },
    status: 200,
    error: '',
  };

  const el = getArr([1, 2, 3]);
  const el2 = getArr(['sd', '23']);

  let value: unknown;

  value = 42;
  value = 'hello';
  value = { name: 'Alice' };

  return (
    <div>
      main
      <button>lol</button>
      <FormLogin />
    </div>
  );
};
