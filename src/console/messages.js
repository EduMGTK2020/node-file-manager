const colors = {
  default: '\x1b[0m',
  bold: '\x1b[1m',
  error: '\x1b[31m',
  system: '\x1b[32m',
  user: '\x1b[33m',
};
const showInfo = (infoMessage) =>
  console.log(colors.default + colors.bold + infoMessage + colors.default);

const showError = (errorMessage) =>
  console.log(colors.default + colors.error + errorMessage + colors.default);

const showSystemInfo = (promptMessage) =>
  console.log(colors.system + promptMessage + colors.user);

const showTable = (table) => {
  console.log(colors.default);
  console.table(table);
};

const showAgenda = () => {
  showInfo(
    colors.default +
      'Colors - ' +
      colors.user +
      "User's input, " +
      colors.system +
      "System's output, " +
      colors.error +
      "Error's message\n" +
      colors.default +
      'For a list of all commands type ' +
      colors.user +
      '.help' +
      colors.default +
      ', for exit type ' +
      colors.user +
      '.exit' +
      colors.default +
      ' or press Ctrl+C'
  );
};

const showPrompt = (readline, promptText) => {
  showSystemInfo(promptText);
  readline.setPrompt(colors.system + '=> ' + colors.user);
  readline.prompt();
};

export default {
  showInfo,
  showAgenda,
  showError,
  showTable,
  showSystemInfo,
  showPrompt,
};
