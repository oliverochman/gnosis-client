let initialState = {
  flashMessage: false
}

const flashMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_FLASH_MESSAGE':
      return {
        flashMessage: true
      }
    case 'HIDE_FLASH_MESSAGE':
    debugger;
      return {
        flashMessage: false
      }
    default:
      return state
  }
}

export default flashMessageReducer