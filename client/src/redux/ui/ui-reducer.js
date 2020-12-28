const initialState = {
  sideNavIconIsOpen: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_SIDENAV_ICON':
      return {
        sideNavIconIsOpen: !state.sideNavIconIsOpen,
      }

    default:
      return state
  }
}

export default uiReducer
