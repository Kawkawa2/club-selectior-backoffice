import { useMemo, useState,useEffect, useCallback  } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Api from 'src/services/api';

import TopRecommended from '../top-recommended';
import AppWidgetSummary from '../app-widget-summary';
import TopVisitedStores from '../top-visited-stores';

// ----------------------------------------------------------------------

export default function AppView() {
  const api = useMemo(() => new Api(), []);

  // hooks
  const [parsCount, setParsCount] = useState({total_particulars:0, total_test_subscribed_particulars:0,total_subscribed_particulars:0});
  const [prosCount, setProsCount] = useState({total_pros:0, total_subscribed_pros:0,total_test_pros:0, total_stores:0,total_offres:0});
  const [topStoresCount, setTopStoresCount] = useState([]);
  const [recoMax, setRecoMax] = useState([]);




  // fetch the pros statistics
  const getSubscribedprofessionals = useCallback(() => {

    api.getSubscribedprofessionals().then((res) => {
      setProsCount((statistics) => ({
        ...statistics,
        total_pros: res.statistics.total_pros,
        total_test_pros: res.statistics.total_test_subscribed_pros,
        total_subscribed_pros: res.statistics.total_subscribed_pros,

      }));
    });
    api.getStoresStatistics().then((res) => {
      setProsCount((statistics) => ({
        ...statistics,
        total_stores: res.statistics.total_stores
      }));
    });
    api.getOffresStatistics().then((res) => {
      setProsCount((statistics) => ({
        ...statistics,
        total_offres: res.statistics.total_offres
      }));
    });
  }, [api]);
  
  // fetch the par statistics
  const getSubscribedParticulars = useCallback(() => {
    api.getSubscribedParticulars().then((res) => {
        setParsCount(res.statistics);
    });
  }, [api]);

  // fetch the store statistics
  const getTopVisitedStores = useCallback(() => {
    api.getTopVisitedStores().then((res) => {
        setTopStoresCount(res.top_visited_stores);
    });
  }, [api]);

   // fetch the recomax
   const getTopRecommendedCompanies = useCallback(() => {
    api.getTopRecommendedCompanies().then((res) => {
        setRecoMax(res.top_recommended_companies);
    });
  }, [api]);

  useEffect(() => {
    getSubscribedParticulars();
    getSubscribedprofessionals();
    getTopVisitedStores();
    getTopRecommendedCompanies()

  }, [getSubscribedParticulars, getSubscribedprofessionals,getTopVisitedStores,getTopRecommendedCompanies]); 
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Salut, Bienvenue à nouveau. 👋
      </Typography>

      <Grid container spacing={3}>

        {/* statics sumarry */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Particuliers abonnés - test"
            total={`(${parseInt(parsCount.total_subscribed_particulars, 10)  }-${  parseInt(parsCount.total_test_subscribed_particulars, 10)})/${  parseInt(parsCount.total_particulars, 10)}`} 
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Professionnels abonnés - test"
            total={`(${parseInt(prosCount.total_subscribed_pros, 10)  }-${  parseInt(prosCount.total_test_pros, 10)})/${  parseInt(prosCount.total_pros, 10)}`} 
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Nombre de Store"
            total={prosCount.total_stores}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Nombre d'offres"
            total={prosCount.total_offres}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>


        {/* chart for top visited stores */}
        <Grid xs={12} md={6} lg={8}>
          <TopVisitedStores
            title="Top 10 des Store visités"
            subheader="Nom de l'entreprise / Nombre de visites"
            chart={{
              series: topStoresCount.map((i) => ({ label: i.company_name, value: i.visit_count }))
            }}
          />
        </Grid>

        {/* chart for top recommended companies */}

        <Grid xs={12} md={6} lg={4}>
          <TopRecommended
            title="Top 5 des professionnels recommandés"
            chart={{
              series: recoMax.map((i) => ({ label: i.company_name, value: i.recommendation_count }))

            }}
          />
        </Grid>
  
      </Grid>
    </Container>
  );
}
