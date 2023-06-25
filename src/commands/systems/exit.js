export const exit = {
  name: 'Exit',
  description: 'Exiting the program',
  usage: '.exit',
  perform: async () => {
    process.exit(0);
  },
};
