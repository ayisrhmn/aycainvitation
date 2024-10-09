import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_SYEHERLYN } from '@/constants';

const data = {
  prefix: APP_SYEHERLYN.prefix,
  title: APP_SYEHERLYN.title,
  coupleNick: {
    bride: APP_SYEHERLYN.content.couple.bride.nickname,
    groom: APP_SYEHERLYN.content.couple.groom.nickname
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
