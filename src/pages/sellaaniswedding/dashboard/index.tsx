import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_SELLAANIS } from '@/constants';

const data = {
  prefix: APP_SELLAANIS.prefix,
  title: APP_SELLAANIS.title,
  coupleNick: {
    bride: APP_SELLAANIS.content.couple.bride.nickname,
    groom: APP_SELLAANIS.content.couple.groom.nickname
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
