import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_NIAARI } from '@/constants';

const data = {
  prefix: APP_NIAARI.prefix,
  title: APP_NIAARI.title,
  coupleNick: {
    bride: APP_NIAARI.content.couple.bride.nickname,
    groom: APP_NIAARI.content.couple.groom.nickname
  }
};

const Dashboard = () => {
  return (
    <DashboardContainer
      prefix={data.prefix}
      title={data.title}
      coupleNick={data.coupleNick}
    />
  );
};

export default Dashboard;
