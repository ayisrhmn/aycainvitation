import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_ERLYNSYEH } from '@/constants';

const data = {
  prefix: APP_ERLYNSYEH.prefix,
  title: APP_ERLYNSYEH.title,
  coupleNick: {
    bride: APP_ERLYNSYEH.content.couple.bride.nickname,
    groom: APP_ERLYNSYEH.content.couple.groom.nickname
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
