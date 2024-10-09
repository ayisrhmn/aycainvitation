import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_SYEHERLYN } from '@/constants';

const data = {
  prefix: APP_SYEHERLYN.prefix,
  title: APP_SYEHERLYN.title,
  coupleNick: {
    bride: APP_SYEHERLYN.content.couple.bride.name.split(' ')[0],
    groom: APP_SYEHERLYN.content.couple.groom.name.split(' ')[0]
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
