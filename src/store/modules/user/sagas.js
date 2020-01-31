import { takeLatest, all, call, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {})
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Profile updated success');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Error updating profile, please verify your data');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
