const Reducer = (state, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts:action.payload
      }
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case 'POST_ERROR':
      return {
        ...state,
        error: action.payload
      }
   /* case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }*/
    default:
      return state;
  }
};

export default Reducer;