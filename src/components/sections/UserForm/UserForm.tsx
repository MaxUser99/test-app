import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Container from '../../ui/Container';
import FileUpload from '../../ui/FileUpload';
import TextField from '../../ui/TextField';
import styles from './UserForm.module.css';
import Button from '../../ui/Button';
import { fetchToken } from '../../../queries/tokenQueries';
import { fetchPositions } from '../../../queries/positionQueries';
import { createUser } from '../../../queries/userQueries';
import {
  ACCEPTED_IMAGE_TYPES,
  CreateUserForm,
  createUserSchema,
} from './UserFormSchema';
import RadioGroup from '../../ui/RadioGroup';

export default function UserForm() {
  const { data: token = '' } = useQuery('token', fetchToken, {
    refetchInterval: 40 * 60 * 1000, // 40 minutes
  });
  const { data: positions = [] } = useQuery('positions', fetchPositions);
  const mutation = useMutation(createUser);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateUserForm>({
    mode: 'onChange',
    resolver: zodResolver(createUserSchema),
  });
  const [fileName, setFileName] = useState('');

  const submitHandler = handleSubmit(async (data, e) => {
    console.log('should send data: ', data);
    const formData = new FormData(e?.target);
    console.log('values: ', [...formData.entries()]);
    // const result = await mutation.mutate([token, formData]);
    // console.log('result: ', result);
  });

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name || '');
  };

  return (
    <Container className={styles.container} as='section'>
      <h2 className={styles.heading}>Working with POST request</h2>
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
    </Container>
  );
}
