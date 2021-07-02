const flaggingReducer = (state, action) => {
  return {
    ...state,
    flagging: action.value,
  }
}

export default flaggingReducer
