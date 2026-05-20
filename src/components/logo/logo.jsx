
import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

const LOGO_SVG = '/assets/logo.svg';
const LOGO_PNG = '/assets/Logo-removebg-preview .png';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const [src, setSrc] = useState(LOGO_PNG);

  const logo = (
    <Box
      ref={ref}
      component="img"
      src={src}
      alt="Club Selectior"
      onError={() => setSrc(LOGO_SVG)}
      sx={{
        pb: 3,
        display: 'block',
        margin: 'auto',
        width: src === LOGO_SVG ? '85%' : '60%',
        maxHeight: 56,
        objectFit: 'contain',
        ...sx,
      }}
      {...other}
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
