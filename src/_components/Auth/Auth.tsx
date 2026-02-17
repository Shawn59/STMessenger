import { Button, TextField } from '@mui/material';
import styles from './Auth.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { useForm } from 'react-hook-form';
import { actionSetUser } from '../../store/userSlice/user.slice';
import uuid from 'react-uuid';
import type { AuthFormValues } from '../../store/authSlice/auth.slice.types';
export const Auth = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      profession: '',
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: AuthFormValues) => {
    dispatch(actionSetUser({ ...data, id: uuid() }));

    handleReset();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form className={styles.auth} onSubmit={handleSubmit(onSubmit)}>
      <span className={styles.title}>{'Подключиться'}</span>

      <TextField
        {...register('firstName', {
          required: 'Поле не может быть пустым',
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Имя*'}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        autoComplete={'off'}
      />

      <TextField
        {...register('lastName', {
          required: 'Поле не может быть пустым',
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Фамилия*'}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        autoComplete={'off'}
      />

      <TextField
        {...register('profession', {
          maxLength: { value: 20, message: 'Максимум 20 символов' },
          required: 'Поле не может быть пустым',
          pattern: {
            value: /^\S+$/,
            message: 'Некорректное значение',
          },
        })}
        label={'Профессия*'}
        error={!!errors.profession}
        helperText={errors.profession?.message}
        autoComplete={'off'}
      />

      <Button type="submit" variant="contained" color="primary">
        {'Отправить'}
      </Button>
    </form>
  );
};
