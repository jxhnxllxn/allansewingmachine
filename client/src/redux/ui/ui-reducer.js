const initialState = {
  navIconsMenuIsOpen: false,
  navMenuIsOpen: false,
  loadingScreenActive: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_MENU_ICONS':
      return {
        navIconsMenuIsOpen: !state.navIconsMenuIsOpen,
      }
    case 'TOGGLE_NAV_MENU':
      return {
        navMenuIsOpen: !state.navMenuIsOpen,
      }
    case 'TOGGLE_LOADING_SCREEN':
      return {
        loadingScreenActive: !state.loadingScreenActive,
      }
    default:
      return state
  }
}

export default uiReducer
