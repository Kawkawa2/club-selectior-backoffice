import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Gestion des particuliers',
    path: '/particuliers',
    icon: icon('ic_user'),
  },
  {
    title: 'Gestion des professionnels',
    path: '/professionnels',
    icon: icon('ic_pro'),
  },
  {
    title: 'Gestion des Store',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Gestion des codes promo',
    path: '/code-promo',
    icon: icon('ic_code'),
  },
];

export default navConfig;
