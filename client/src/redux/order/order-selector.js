import { createSelector } from 'reselect';

const selectOrder = ({order}) => order;

export const selectAllOrder = createSelector(
    [selectOrder],
    (order)=>order.allOrder
);

export const selectPendingOrder = createSelector(
    [selectOrder],
    (order)=>order.pendingOrder
);

export const selectCanceledOrder = createSelector(
    [selectOrder],
    (order)=>order.canceledOrder
);

export const selectProcessedOrder = createSelector(
    [selectOrder],
    (order)=>order.processedOrder
);


export const selectIsLoading = createSelector(
    [selectOrder],
    (order) => order.loading
);

export const selectDashboardAdmin = createSelector(
    [selectOrder],
    (order) => order.countDash
    
);



// export const selectIsAuth = createSelector(
//     [selectOrder],
//     (order) => order.isAuthenticated
// );

// export const selectIsLoading = createSelector(
//     [selectOrder],
//     (order) => order.isLoading
// );