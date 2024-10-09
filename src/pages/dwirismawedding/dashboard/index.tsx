import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_DWIRISMA } from '@/constants';

const data = {
  prefix: APP_DWIRISMA.prefix,
  title: APP_DWIRISMA.title,
  coupleNick: {
    bride: APP_DWIRISMA.content.couple.bride.nickname,
    groom: APP_DWIRISMA.content.couple.groom.nickname
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
