const initialState = {
  loading: true,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, loading: false};
    case 'userData':
      return {...state, loading: false, user: action.payload};
    default:
      return state;
  }
};

export default userReducer;
