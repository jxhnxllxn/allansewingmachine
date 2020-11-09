import { createSelector } from 'reselect';

const selectUi = ({ui}) => ui;

export const selectCartHidden = createSelector(
  [selectUi],
  ui => ui.cartMenuIsOpen
);

export const selectSettingHidden = createSelector(
  [selectUi],
  ui => ui.settingMenuIsOpen
);

export const selectNavMenuHidden = createSelector(
  [selectUi],
  ui => ui.navMenuIsOpen
);

  