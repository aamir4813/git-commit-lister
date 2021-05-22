// eslint-disable-next-line
export default (commitReducer = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_COMMITS":
      return action.payload;
    default:
      return "";
  }
};
