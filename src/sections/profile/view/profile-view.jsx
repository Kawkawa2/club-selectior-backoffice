import * as React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { setUser } from 'src/utils/helper';

import Api from 'src/services/api';
import { account } from 'src/_mock/account';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const TOAST_OPTIONS = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

function InfoPill({ icon, label, value }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{
        px: 2,
        py: 1.25,
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
      }}
    >
      <Iconify icon={icon} width={20} sx={{ color: 'primary.main' }} />
      <Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.2 }}>
          {label}
        </Typography>
        <Typography variant="subtitle2">{value}</Typography>
      </Box>
    </Stack>
  );
}

InfoPill.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

function SectionCard({ icon, title, subtitle, children, actions }) {
  return (
    <Card
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          px: 3,
          py: 2.5,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1.5,
            color: 'primary.dark',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          }}
        >
          <Iconify icon={icon} width={24} />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{title}</Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      <Box sx={{ px: 3, py: 3, flexGrow: 1 }}>{children}</Box>

      {actions && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          sx={{
            px: 3,
            py: 2.5,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          }}
        >
          {actions}
        </Stack>
      )}
    </Card>
  );
}

SectionCard.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

export default function ProfileView() {
  const theme = useTheme();
  const api = new Api();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);
  const [loadingInfo, setLoadingInfo] = React.useState(false);
  const [loadingPassword, setLoadingPassword] = React.useState(false);

  const [name, setName] = React.useState(account?.displayName || '');
  const [email, setEmail] = React.useState(account?.email || '');
  const [password, setPassword] = React.useState('');
  const [cpassword, setCPassword] = React.useState('');
  const [oldPassword, setOldPassword] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    oldPassword: '',
  });

  const resetInfoForm = () => {
    setName(account?.displayName || '');
    setEmail(account?.email || '');
    setErrors({});
  };

  const resetPasswordForm = () => {
    setOldPassword('');
    setPassword('');
    setCPassword('');
    setErrors({});
  };

  function validateForm1() {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Veuillez entrer votre nom complet';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Veuillez entrer votre email';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Entrer un email valide';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  function validateForm2() {
    let valid = true;
    const newErrors = {};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = 'Veuillez entrer votre ancien mot de passe';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Veuillez entrer votre nouveau mot de passe';
      valid = false;
    }

    if (!cpassword.trim()) {
      newErrors.cpassword = 'Veuillez confirmer le mot de passe';
      valid = false;
    } else if (password !== cpassword) {
      newErrors.cpassword = 'Les mots de passe doivent correspondre';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    if (!validateForm1()) return;

    setLoadingInfo(true);
    try {
      const response = await api.ModifierUser({ name, email }, account?.id);

      if (response.status === true) {
        setUser(JSON.stringify(response?.user));
        toast.success(response.message, TOAST_OPTIONS);
        router.reload();
      } else if (response.email) {
        setErrors({ email: response.email });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erreur interne du serveur', TOAST_OPTIONS);
    } finally {
      setLoadingInfo(false);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();

    if (!validateForm2()) return;

    setLoadingPassword(true);
    try {
      const response = await api.ModifierMDP({ oldPassword, password }, account?.id);

      if (response.status === true) {
        setUser(JSON.stringify(response?.user));
        toast.success(response.message, TOAST_OPTIONS);
        resetPasswordForm();
        router.reload();
      } else if (response.oldPassword) {
        setErrors({ oldPassword: response.oldPassword });
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Erreur interne du serveur', TOAST_OPTIONS);
    } finally {
      setLoadingPassword(false);
    }
  };

  const passwordToggle = (visible, toggle) => (
    <InputAdornment position="end">
      <IconButton onClick={toggle} edge="end" aria-label="toggle password visibility">
        <Iconify icon={visible ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 0.5 }}>
        Mon profil
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Gérez vos informations personnelles et la sécurité de votre compte
      </Typography>

      {/* Hero banner */}
      <Card sx={{ mb: 3, overflow: 'hidden', borderRadius: 2, boxShadow: (t) => t.customShadows.card }}>
        <Box
          sx={{
            height: 140,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/assets/background/overlay_1.svg)',
              backgroundSize: 'cover',
              opacity: 0.15,
            },
          }}
        />

        <Stack spacing={3} sx={{ px: { xs: 2, sm: 3 }, pb: 3, mt: -7 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'center', sm: 'flex-end' }} spacing={2.5}>
            <Avatar
              src={account.photoURL}
              alt={account.displayName}
              sx={{
                width: 112,
                height: 112,
                border: `4px solid ${theme.palette.background.paper}`,
                boxShadow: theme.customShadows.z16,
              }}
            />

            <Stack spacing={0.75} sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' }, pb: { sm: 0.5 } }}>
              <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                spacing={1}
                justifyContent={{ xs: 'center', sm: 'flex-start' }}
              >
                <Typography variant="h4">{account.displayName}</Typography>
                <Chip
                  label="Administrateur"
                  size="small"
                  sx={{
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                    color: 'primary.dark',
                    fontWeight: 700,
                  }}
                />
              </Stack>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {account.email}
              </Typography>
            </Stack>
          </Stack>

          <Grid container spacing={2}>
            <Grid xs={12} sm={4}>
              <InfoPill icon="solar:shield-user-bold" label="Rôle" value="Administrateur" />
            </Grid>
            <Grid xs={12} sm={4}>
              <InfoPill icon="solar:verified-check-bold" label="Statut" value="Compte actif" />
            </Grid>
            <Grid xs={12} sm={4}>
              <InfoPill icon="solar:calendar-bold" label="Plateforme" value="Club Selectior" />
            </Grid>
          </Grid>
        </Stack>
      </Card>

      <Grid container spacing={3} alignItems="stretch">
        <Grid xs={12} lg={6}>
          <SectionCard
            icon="solar:user-id-bold"
            title="Informations personnelles"
            subtitle="Nom affiché et adresse email de connexion"
            actions={
              <>
                <Button variant="outlined" color="inherit" onClick={resetInfoForm}>
                  Annuler
                </Button>
                <LoadingButton variant="contained" color="primary" loading={loadingInfo} onClick={handleSubmit1}>
                  Enregistrer
                </LoadingButton>
              </>
            }
          >
            <Stack spacing={3} component="form" onSubmit={handleSubmit1}>
              <TextField
                fullWidth
                variant="outlined"
                label="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name || 'Ce nom apparaît dans la barre latérale'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="solar:user-rounded-bold" width={20} sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Adresse email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email || 'Utilisée pour vous connecter au backoffice'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="solar:letter-bold" width={20} sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </SectionCard>
        </Grid>

        <Grid xs={12} lg={6}>
          <SectionCard
            icon="solar:lock-password-bold"
            title="Sécurité du compte"
            subtitle="Changez votre mot de passe régulièrement"
            actions={
              <>
                <Button variant="outlined" color="inherit" onClick={resetPasswordForm}>
                  Annuler
                </Button>
                <LoadingButton variant="contained" color="primary" loading={loadingPassword} onClick={handleSubmit2}>
                  Mettre à jour
                </LoadingButton>
              </>
            }
          >
            <Stack spacing={3} component="form" onSubmit={handleSubmit2}>
              <TextField
                fullWidth
                variant="outlined"
                label="Ancien mot de passe"
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                error={Boolean(errors.oldPassword)}
                helperText={errors.oldPassword}
                InputProps={{
                  endAdornment: passwordToggle(showOldPassword, () => setShowOldPassword(!showOldPassword)),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Nouveau mot de passe"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errors.password)}
                helperText={errors.password}
                InputProps={{
                  endAdornment: passwordToggle(showPassword, () => setShowPassword(!showPassword)),
                }}
              />

              <TextField
                fullWidth
                variant="outlined"
                label="Confirmer le mot de passe"
                type={showCPassword ? 'text' : 'password'}
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                error={Boolean(errors.cpassword)}
                helperText={errors.cpassword}
                InputProps={{
                  endAdornment: passwordToggle(showCPassword, () => setShowCPassword(!showCPassword)),
                }}
              />
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Container>
  );
}
