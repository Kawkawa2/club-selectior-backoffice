import { Helmet } from 'react-helmet-async';

import { AdminView } from 'src/sections/admin/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Admins </title>
      </Helmet>

      <AdminView />
    </>
  );
}
