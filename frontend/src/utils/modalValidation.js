import * as Yup from "yup";
import { useTranslation } from "react-i18next";

export const getChannelNameSchema = (channels) => {
  const { t } = useTranslation();

  const schema = Yup.string()
    .trim()
    .min(3, t('validation.min'))
    .max(20, t('validation.max'))
    .notOneOf(channels, t('validation.unique'))
    .required(t('validation.required'));

  return schema;
};