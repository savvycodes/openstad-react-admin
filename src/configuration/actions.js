export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_DISPLAY_APPBAR = 'CHANGE_DISPLAY_APPBAR';

export const changeTheme = (theme) => ({
    type: CHANGE_THEME,
    payload: theme,
});

export const changeDisplayAppBar = (displayAppBar) => ({
    type: CHANGE_THEME,
    payload: displayAppBar,
});
