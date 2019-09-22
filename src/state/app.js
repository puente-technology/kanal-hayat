const initialState = {
  episode: '',
  episodes: '',
  playing: false,
  handleCloseClick: '',
  frontmatter: '',
  index: '',
  isOpen: false,
  hosts: '',
  isBigScreen: false,
};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';

export const toggleDarkMode = (
  episode, episodes, playing, index,
  frontmatter, handleCloseClick, isOpen, hosts, isBigScreen,
) => ({
  type: TOGGLE_DARKMODE,
  episode,
  episodes,
  playing,
  index,
  frontmatter,
  handleCloseClick,
  isOpen,
  hosts,
  isBigScreen,
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
        hosts: action.hosts,
        isBigScreen: action.isBigScreen,
      };
    default:
      return state;
  }
};
