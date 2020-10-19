import React, {useReducer} from 'react';

export default (reducer, actions, initialState) => {
  const Context = React.createContext();
  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundedActions = {};

    for (let key in actions) {
      boundedActions[key] = actions[key](dispatch);
    }

    console.log(`createProvider: ${JSON.stringify(boundedActions)}`);
    return <Context.Provider value={{state, ...boundedActions}}>{children}</Context.Provider>;
  };
  return {Context, Provider};
};
