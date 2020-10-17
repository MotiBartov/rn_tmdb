import {useEffect, useState} from 'react';
import {getMediaDetails} from '../../data/Repository';

export default (media) => {
  console.log(`useLoadDetails: ${JSON.stringify(media)}`);
  const [state, setDetails] = useState(media);

  const runAsyncQuery = async (type, id) => {
    const mediaDetails = await getMediaDetails(type, id);

    setDetails({
      ...state,
      ...mediaDetails,
    });
  };

  useEffect(() => {
    runAsyncQuery(media.type, media.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state];
};
