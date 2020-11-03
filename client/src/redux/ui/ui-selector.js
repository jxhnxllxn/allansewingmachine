import { createSelector } from 'reselect';

const selectUi = state => state.ui;

export const selectCartHidden = createSelector(
  [selectUi],
  ui => ui.cartMenuIsOpen
);

export const selectSettingHidden = createSelector(
  [selectUi],
  ui => ui.settingMenuIsOpen
);

  