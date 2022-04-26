module.exports = {
  client: {
    serice: {
      url: "http://localhost:5000/graphql",
      // local copy can be provided by using 'localSchemaFile'
      skipSSLValidation: true,
    },
  },
};
