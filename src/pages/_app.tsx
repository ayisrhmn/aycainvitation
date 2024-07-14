import '@/styles/globals.css';
import 'react-photo-view/dist/react-photo-view.css';
import type { AppProps } from 'next/app';
import { PhotoProvider } from 'react-photo-view';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <PhotoProvider>
      <Component {...pageProps} />
    </PhotoProvider>
  );
};

export default App;
