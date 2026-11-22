let hasPlayedIntro = false;

export const hasPlayedCircuitIntro = () => hasPlayedIntro;

export const markCircuitIntroPlayed = () => {
  hasPlayedIntro = true;
};

export const resetCircuitIntro = () => {
  hasPlayedIntro = false;
};
