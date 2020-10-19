import createProvider from '../../context/createProvider';
import {getMediaDetails} from '../../data/Repository';

const details_reducer = (state, action) => {
  switch (action.type) {
    case 'setInitialState':
      console.log(`setInitialState: payload id: ${JSON.stringify(action.payload)}, state id: ${state.id}`);
      if (action.payload.id !== state.id) {
        return action.payload;
      }
      return state;
    case 'getDetails':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const loadMediaDetails = (dispatch) => {
  return async (media) => {
    dispatch({
      type: 'setInitialState',
      payload: media,
    });
    const mediaDetails = await getMediaDetails(media.type, media.id);
    dispatch({
      type: 'getDetails',
      payload: mediaDetails,
    });
  };
};

export default function detailsReducer() {
  return createProvider(details_reducer, {loadMediaDetails}, []);
}
