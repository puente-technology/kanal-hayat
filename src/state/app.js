const initialState = {
  episode: '',
  episodes: '',
  playing: false,
  handleCloseClick: '',
  frontmatter: '',
  index: '',

};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';

export const toggleDarkMode = (
  episode, episodes, playing, index, frontmatter, handleCloseClick,
) => ({
  type: TOGGLE_DARKMODE, episode, episodes, playing, index, frontmatter, handleCloseClick,
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
      };
    default:
      return state;
  }
};
