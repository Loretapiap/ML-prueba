import React, { createContext, useReducer } from 'react';

const UserContext = createContext();

const initialState = {
  user: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'set_user':
      return { ...state, user: action.payload };
    case 'set_product':
      return { ...state, product: action.payload };
    case 'clear_user':
      return { ...state, user: null };
    default:
      return state;
  }
}

function UserProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
