import { useQuery } from 'react-query';
import Button from '../../../ui/Button';
import FileUpload from '../../../ui/FileUpload';
import RadioGroup from '../../../ui/RadioGroup';
import TextField from '../../../ui/TextField';
import styles from './CreateUserForm.module.css';
import { fetchPositions } from '../../../../queries/positionQueries';
import { useForm } from 'react-hook-form';
import {
  ACCEPTED_IMAGE_TYPES,
  CreateUserFormType,
  createUserSchema,
} from './CreateUserSchema';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  onSubmit: (form: HTMLFormElement) => void;
}

export default function CreateUserForm({ onSubmit }: IProps) {
  const { data: positions = [] } = useQuery('positions', fetchPositions);
  const [fileName, setFileName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateUserFormType>({
    mode: 'onChange',
    resolver: zodResolver(createUserSchema),
  });

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name || '');
  };

  const submitHandler = handleSubmit((_, e) => {
    onSubmit(e?.target);
  });

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <TextField
        {...register('name', { required: true })}
        className={styles.textInput}
        error={!!errors?.name}
        helperText={errors?.name?.message}
        id='name-input'
        label='Your name'
      />
      <TextField
        {...register('email', { required: true })}
        className={styles.textInput}
        error={!!errors?.email}
        helperText={errors?.email?.message}
        id='email-input'
        label='Email'
      />
      <TextField
        {...register('phone', { required: true })}
        className={styles.lastTextInput}
        error={!!errors?.phone}
        helperText={errors?.phone?.message}
        id='phone-input'
        label='Phone'
      />
      <RadioGroup
        legend='Select your position'
        className={styles.radioGroup}
        {...register('position_id', { required: true })}
        error={!!errors?.position_id}
        data={positions.map(
          (position) => [position.id, position.name] as [number, string]
        )}
      />
      <FileUpload
        label='Upload'
        placeholder='Upload your photo'
        fileName={fileName}
        {...register('photo', {
          onChange: fileChangeHandler,
          required: true,
        })}
        className={styles.fileInput}
        error={!!errors?.photo}
        helperText={errors?.photo?.message as string}
        accept={ACCEPTED_IMAGE_TYPES.join(',')}
        id='photo-input'
      />
      <Button className={styles.submitButton} disabled={!isDirty || !isValid}>
        Sign up
      </Button>
    </form>
  );
}
