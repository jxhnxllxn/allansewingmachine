import { createSelector } from 'reselect';

const selectAuth = state => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuth],
    (auth)=>auth.userData
);


export const selectIsAdmin = createSelector(
    [selectAuth],
    (auth) => auth.isAdmin
);

export const selectIsAuth = createSelector(
    [selectAuth],
    (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
    [selectAuth],
    (auth) => auth.isLoading
);