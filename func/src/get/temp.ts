const throwErr = (): never => {
  throw new Error('err!');
};

const textOrUndefined = (): string | undefined => {
  return Math.random() > 0.5 ? 'text' : undefined;
};

const main = (): string => {
  let text: string | undefined = undefined;

  text = textOrUndefined();

  if (text === undefined) {
    throwErr();
  }

  return text;
};
