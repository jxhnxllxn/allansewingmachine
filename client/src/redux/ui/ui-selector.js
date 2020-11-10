import { createSelector } from 'reselect';

const selectUi = ({ui}) => ui;

export const selectNavMenuIconsHidden = createSelector(
  [selectUi],
  ui => ui.navIconsMenuIsOpen
);

export const selectNavMenuHidden = createSelector(
  [selectUi],
  ui => ui.navMenuIsOpen
);

  