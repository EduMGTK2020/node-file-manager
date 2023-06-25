const parseInputLine = (inputLine) => {
  const tmpString = inputLine.trim();

  if (tmpString == '') {
    throw new Error('Invalid input: input is empty');
  }

  const firstSpacePosition = tmpString.indexOf(' ');
  if (firstSpacePosition == -1) {
    return {
      command: tmpString.toLowerCase(),
      args: [],
    };
  } else {
    let countQuote = 0;

    const args = tmpString
      .slice(firstSpacePosition)
      .split('')
      .map((s) => {
        if (s == "'") {
          if (countQuote == 0) {
            countQuote++;
            return '';
          }
          countQuote--;
          return '';
        }
        if (s == ' ') {
          if (countQuote == 1) {
            return '*';
          }
        }
        return s;
      })
      .join('')
      .split(' ')
      .map((item) => {
        return item.replaceAll('*', ' ');
      })
      .filter((item) => item !== '');

    return {
      command: tmpString.slice(0, firstSpacePosition).trim().toLowerCase(),
      args: args,
    };
  }
};

export default parseInputLine;
