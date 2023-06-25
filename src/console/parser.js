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
    return {
      command: tmpString.slice(0, firstSpacePosition).trim().toLowerCase(),
      args: tmpString
        .slice(firstSpacePosition)
        .trim()
        .split(' ')
        .map((item) => item.trim())
        .filter((item) => item !== ''),
    };
  }
};

export default parseInputLine;
