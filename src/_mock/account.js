// ----------------------------------------------------------------------
import { getUser } from 'src/utils/helper';

const user=JSON.parse(getUser('user'));
console.log('user',user)
export const account = {
  id: user?.id ,
  displayName: user?.name,
  email: user?.email,
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
