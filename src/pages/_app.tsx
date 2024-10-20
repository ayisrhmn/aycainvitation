import '@/styles/globals.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { AppProps } from 'next/app';
import { PhotoProvider } from 'react-photo-view';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PhotoProvider>
      <Component {...pageProps} />
      <Toaster position='top-right' />
    </PhotoProvider>
  );
};

export default App;
