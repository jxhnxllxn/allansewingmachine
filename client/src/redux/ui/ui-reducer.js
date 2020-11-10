const initialState = {
  navIconsMenuIsOpen: false,
  navMenuIsOpen: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_MENU_ICONS':
      return {
        navIconsMenuIsOpen: !state.navIconsMenuIsOpen,
      };
    case 'TOGGLE_NAV_MENU':
      return {
        navMenuIsOpen: !state.navMenuIsOpen,
      };
    default:
      return state
  }
}

export default uiReducer
