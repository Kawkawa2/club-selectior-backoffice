// ----------------------------------------------------------------------
import { getUser } from 'src/utils/helper';

import { ADMIN_PHOTO_URL } from 'src/_mock/demo-data';

function parseStoredUser() {
  const stored = getUser();
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

const user = parseStoredUser();

export const account = {
  id: user?.id,
  displayName: user?.name,
  email: user?.email,
  photoURL: user?.photoURL || ADMIN_PHOTO_URL,
};
