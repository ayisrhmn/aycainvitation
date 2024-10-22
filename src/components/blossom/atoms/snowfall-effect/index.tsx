'use client';

import Snowfall from 'react-snowfall';

const SnowfallEffect = () => {
  const sakura = document.createElement('img');
  sakura.src = '/icons/sakura.png';

  return (
    <Snowfall images={[sakura]} radius={[5, 10]} style={{ zIndex: 9999 }} />
  );
};

export default SnowfallEffect;
