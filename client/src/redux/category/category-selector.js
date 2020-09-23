import { createSelector } from 'reselect';

const selectCategory = state => state.category;

export const selectCategoryItems = createSelector(
  [selectCategory],
  cart => cart.cartItems
);

export const selectCategoryHidden = createSelector(
  [selectCategory],
  cart => cart.hidden
);

export const selectCategoryItemsCount = createSelector(
  [selectCategoryItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCategoryTotal = createSelector(
  [selectCategoryItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
