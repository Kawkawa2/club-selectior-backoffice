import { Helmet } from 'react-helmet-async';

import { PromoCodeView } from 'src/sections/promoCode/view';

// ----------------------------------------------------------------------

export default function ProPage() {
  return (
    <>
      <Helmet>
        <title> Code Promo </title>
      </Helmet>

      <PromoCodeView />
    </>
  );
}
