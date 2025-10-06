import { redirect } from 'react-router';

import session from '@/utils/session';

export default function sidebarLoader() {
  const token = session.getSession();

  if (!token) {
    return redirect('/login');
  }

  return null;
}
