const initialState = {
  episode: '',
  episodes: '',
  playing: false,
  handleCloseClick: '',
  frontmatter: '',
  index: '',
  isOpen: false,
  durations: '',
  shouldInit: true,
};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';

export const toggleDarkMode = (
  episode, episodes, playing, index,
  frontmatter, handleCloseClick, isOpen, durations, shouldInit,
) => ({
  type: TOGGLE_DARKMODE,
  episode,
  episodes,
  playing,
  index,
  frontmatter,
  handleCloseClick,
  isOpen,
  durations,
  shouldInit,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return {
        ...state,
        episodes: action.episodes,
        episode: action.episode,
        playing: action.playing,
        frontmatter: action.frontmatter,
        index: action.index,
        handleCloseClick: action.handleCloseClick,
        isOpen: action.isOpen,
        durations: action.durations,
        shouldInit: action.shouldInit,
      };
    default:
      return state;
  }
};
