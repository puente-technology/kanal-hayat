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
  questionIndex: '',
  liveStream: '',
};

const TOGGLE_DARKMODE = 'TOGGLE_DARKMODE';

export const toggleDarkMode = (
  episode, episodes, playing, index,
  frontmatter, handleCloseClick, isOpen, hosts, isBigScreen, questionIndex, liveStream,
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
  questionIndex,
  liveStream,
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
        questionIndex: action.questionIndex,
        liveStream: action.liveStream,
      };
    default:
      return state;
  }
};
