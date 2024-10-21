import { useRsvp } from '@/hooks/api/use-rsvp';
import { cn } from '@/utils';
import { Playfair_Display, Playfair_Display_SC } from 'next/font/google';
import Head from 'next/head';

interface DashboardContainerProps {
  prefix: string;
  title: string;
  coupleNick: {
    bride: string;
    groom: string;
  };
}

const playfairDisplaySc = Playfair_Display_SC({
  subsets: ['latin'],
  weight: '400'
});

const playfairDisplay = Playfair_Display({ subsets: ['latin'] });

const tableHead = ['Nama', 'Hadir', 'Sesi'];

const DashboardContainer = ({
  coupleNick,
  prefix,
  title
}: DashboardContainerProps) => {
  const { data } = useRsvp({ prefix });

  return (
    <div className={cn('px-4 py-8', playfairDisplay.className)}>
      {/* #region Head */}
      <Head>
        <title>{title} | Rsvp Dashboard</title>
      </Head>
      {/* #endregion Head */}

      <div className='mb-4'>
        <p className={cn('text-2xl', playfairDisplaySc.className)}>
          {coupleNick.bride} & {coupleNick.groom}
        </p>
        <p className='text-md italic text-slate-500'>Rsvp Dashboard</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              {tableHead.map((thead, i) => (
                <th
                  key={i}
                  className='px-4 py-2 border-b-2 border-gray-200 text-left text-sm'
                >
                  {thead}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i}>
                <td className='px-4 py-2 border-b border-gray-200 text-sm'>
                  {item.name}
                </td>
                <td className='px-4 py-2 border-b border-gray-200 text-xs flex'>
                  <div
                    className={cn(
                      'font-medium py-1 px-4 rounded-full',
                      item.isAttend ? 'bg-emerald-200' : 'bg-red-200'
                    )}
                  >
                    {item.isAttend ? 'Ya' : 'Tidak'}
                  </div>
                </td>
                <td className='px-4 py-2 border-b border-gray-200 text-sm'>
                  {item.session}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardContainer;
