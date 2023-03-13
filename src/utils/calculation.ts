const calculation = (a: number, b: number, sign: string) => {
  switch (sign) {
    case "/": {
      return a / b;
    }
    case "x": {
      return a * b;
    }
    case "-": {
      return a - b;
    }
    case "+": {
      return a + b;
    }

    default:
      return b;
  }
};

export default calculation;
