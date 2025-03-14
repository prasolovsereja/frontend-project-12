import * as Yup from 'yup';



export const getChannelNameSchema = (channels) =>
  Yup.string()
    .trim()
    .min(3, 'Имя канала должно содержать минимум 3 символа')
    .max(20, 'Имя канала должно содержать не более 20 символов')
    .notOneOf(channels, 'Канал с таким именем уже существует')
    .required('Имя канала обязательно');