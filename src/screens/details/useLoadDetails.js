import {useEffect, useState} from 'react';
import {getMediaById, getCast, getVideos} from '../../api/TmdbEndpoint';

export default (media) => {
  const [state, setDetails] = useState(media.item);

  const runAsyncQuery = async (type, id) => {
    try {
      const detailsResponse = await getMediaById(type, id);
      console.log(`runAsyncQuery: ${JSON.stringify(detailsResponse)}`);

      const {runtime, status, production_companies} = detailsResponse;
      const newState = {
        ...state,
        ...{runtime: runtime, status: status, companies: production_companies},
      };

      const cast = await getCast(type, id);
      const videos = await getVideos(type, id);
      setDetails({
        ...state,
        ...newState,
        ...{videos: videos, cast: cast},
      });
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  useEffect(() => {
    runAsyncQuery(media.item.type, media.item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state];
};
