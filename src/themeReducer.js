import { CHANGE_THEME, CHANGE_DISPLAY_APPBAR } from './configuration/actions';

const inititalState = {
  theme: 'light',
  displayAppBar: false
}

export default (previousState = inititalState, { type, payload }) => {
    if (type === CHANGE_THEME) {
        return {
          ...previousState,
          theme: payload,
        }
    }

    if (type === CHANGE_DISPLAY_APPBAR) {
      return {
        ...previousState,
        displayAppBar: payload,
      }
    }

    return previousState;
};
