const initialState = {
  settingMenuIsOpen: false,
  cartMenuIsOpen: false,
  navMenuIsOpen: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOGGLE_CART':
      return {
        cartMenuIsOpen: !state.cartMenuIsOpen,
      };
    case 'TOGGLE_SETTING':
      return {
        settingMenuIsOpen: !state.settingMenuIsOpen,
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
