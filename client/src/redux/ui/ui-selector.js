import { createSelector } from 'reselect';

const selectUi = state => state.ui;

// settingMenuIsOpen: false,
//   cartMenuIsOpen: false

export const selectCartHidden = createSelector(
  [selectUi],
  ui => ui.cartMenuIsOpen
);

export const selectSettingHidden = createSelector(
  [selectUi],
  ui => ui.settingMenuIsOpen
);

export const selectBackdropHidden = createSelector(
    [selectUi],
    ui => ui.menuBackDrop
);
  