import * as Yup from 'yup';

const getChannelNameSchema = (channels, t) => {

  const schema = Yup.string()
    .trim()
    .min(3, t('validation.min'))
    .max(20, t('validation.max'))
    .notOneOf(channels, t('validation.unique'))
    .required(t('validation.required'));

  return schema;
};

export default getChannelNameSchema;
