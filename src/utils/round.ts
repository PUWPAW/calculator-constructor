const round = (value: number, decimals: number) => {
  const dec = Math.pow(10, decimals);

  return Math.round(value * dec) / dec;
};

export default round;
