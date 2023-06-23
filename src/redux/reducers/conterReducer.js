const initialState = {
  loading: false,
  count: 1,
  changeVal: '1',
};

export const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + parseInt(state.changeVal),
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - parseInt(state.changeVal),
      };
    case 'changeVal':
      return {
        ...state,
        changeVal: action.payload,
      };
    default:
      return state;
  }
};
