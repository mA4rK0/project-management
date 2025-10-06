import { redirect } from 'react-router';

import session from '@/utils/session';

export default function authLoader() {
  const token = session.getSession();

  if (token) {
    return redirect('/');
  }

  return null;
}
