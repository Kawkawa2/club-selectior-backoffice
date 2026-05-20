import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
  const theme = useTheme();

  return (
    <Card
      component={Stack}
      spacing={2.5}
      direction="row"
      alignItems="center"
      sx={{
        px: 3,
        py: 3,
        borderRadius: 2,
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.shorter,
        }),
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: theme.customShadows.z8,
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          color: `${color}.dark`,
          bgcolor: (t) => alpha(t.palette[color].main, 0.12),
        }}
      >
        {typeof icon === 'string' ? <Iconify icon={icon} width={32} /> : icon}
      </Box>

      <Stack spacing={0.5} sx={{ minWidth: 0 }}>
        <Typography variant="h4" noWrap>
          {total}
        </Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
