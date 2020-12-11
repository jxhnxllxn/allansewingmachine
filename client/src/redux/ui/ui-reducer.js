const initialState = {
  sideNavIconIsOpen: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_SIDENAV_ICON':
      return {
        sideNavIconIsOpen: !state.sideNavIconIsOpen,
      }
    // case 'TOGGLE_NAV_MENU':
    //   return {
    //     navMenuIsOpen: !state.navMenuIsOpen,
    //   }
    // case 'TOGGLE_LOADING_SCREEN':
    //   return {
    //     loadingScreenActive: !state.loadingScreenActive,
    //   }
    default:
      return state
  }
}

export default uiReducer
