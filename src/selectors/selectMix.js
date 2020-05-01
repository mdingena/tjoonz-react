const selectMix = slug =>
  ({ mix }) =>
    mix.current.slug === slug ? mix.current : {};

export default selectMix;
