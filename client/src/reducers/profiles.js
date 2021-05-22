// eslint-disable-next-line
export default (profiles = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    default:
      return "";
  }
};
