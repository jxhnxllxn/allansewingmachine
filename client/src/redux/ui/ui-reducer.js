const initialState = {
  settingMenuIsOpen: false,
  cartMenuIsOpen: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'TOGGLE_CART_HIDDEN':
      return {
        cartMenuIsOpen: !state.cartMenuIsOpen,
      };

    case 'TOGGLE_SETTING_HIDDEN':
      return {
        settingMenuIsOpen: !state.settingMenuIsOpen,
      };
    default:
      return state
  }
}

export default uiReducer
