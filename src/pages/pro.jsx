import { Helmet } from 'react-helmet-async';

import { ProView } from 'src/sections/pro/view';

// ----------------------------------------------------------------------

export default function ProPage() {
  return (
    <>
      <Helmet>
        <title> Pro </title>
      </Helmet>

      <ProView />
    </>
  );
}
