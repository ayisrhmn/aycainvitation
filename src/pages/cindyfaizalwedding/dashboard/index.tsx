import DashboardContainer from '@/components/containers/dashboard-container';
import { APP_CINDYFAIZAL } from '@/constants';

const data = {
  prefix: APP_CINDYFAIZAL.prefix,
  title: APP_CINDYFAIZAL.title,
  coupleNick: {
    bride: APP_CINDYFAIZAL.content.couple.bride.nickname,
    groom: APP_CINDYFAIZAL.content.couple.groom.nickname
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
