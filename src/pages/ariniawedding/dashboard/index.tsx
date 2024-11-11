import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_ARINIA } from '@/constants';

const data = {
  prefix: APP_ARINIA.prefix,
  title: APP_ARINIA.title,
  coupleNick: {
    bride: APP_ARINIA.content.couple.bride.nickname,
    groom: APP_ARINIA.content.couple.groom.nickname
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
