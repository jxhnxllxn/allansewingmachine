const initialState = {
  settingMenuIsOpen: false,
  cartMenuIsOpen: false,
  menuBackDrop: false,
}

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case 'TOGGLE_CART_HIDDEN':
      return {
        cartMenuIsOpen: !state.cartMenuIsOpen,
        menuBackDrop: state.cartMenuIsOpen ? false:true,
      };

    case 'TOGGLE_SETTING_HIDDEN':
      return {
        settingMenuIsOpen: !state.settingMenuIsOpen,
        menuBackDrop: state.ettingMenuIsOpen ? false:true,
      };
    case 'TOGGLE_BACKDROP_HIDDEN':
      return {
        menuBackDrop: false,
      };
    case 'CLOSE_ALL_MENU':
      return {};

    default:
      return state
  }
}

export default uiReducer
