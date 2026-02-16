import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import styles from './Auth.module.scss';

export const Auth = () => {
  const [data, setData] = useState({ fio: '', room: '' });

  const changeData = (e) => {
    const { name, value } = e.currentTarget;

    setData({ ...data, ...{ [name]: value } });
  };

  const handleEnter = () => {};

  return (
    <div className={styles.auth}>
      <span className={styles.title}>{'Подключиться'}</span>

      <TextField name={'fio'} label={'ФИО'} value={data.fio} onChange={changeData} />
      <TextField name={'room'} label={'Комната'} value={data.room} onChange={changeData} />

      <Button onClick={handleEnter} variant="contained">
        {'Войти'}
      </Button>
    </div>
  );
};
