import { closeModal, openModal } from './modalSlice';

export const openAndStyle = (data) => (dispatch) => {
  document.body.style.overflow = 'hidden';
  document.body.classList.add('modal-open');
  dispatch(openModal(data));
};
export const closeAndStyle = () => (dispatch) => {
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  dispatch(closeModal());
};
