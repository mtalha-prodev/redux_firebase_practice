const increment = data => {
  return {type: 'increment', payload: data};
};

const decrement = data => {
  return {type: 'decrement', payload: data};
};
const changeValAction = data => {
  return {type: 'changeVal', payload: data};
};

export {increment, decrement, changeValAction};
