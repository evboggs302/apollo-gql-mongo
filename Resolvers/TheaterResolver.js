const Theater = require("../models/theaters.js");
const Movie = require("../models/movies.js");

module.exports = {
  Query: {
    theaters: (parent, args, context, info) => {
      return Theater.find(args).then((theat) => {
        return theat.map((u) => ({ ...u._doc }));
      });
    },
  },
  AllowedStates: {
    AL: "AL",
    AK: "AK",
    AZ: "AZ",
    AR: "AR",
    CA: "CA",
    CO: "CO",
    CT: "CT",
    DC: "DC",
    DE: "DE",
    FL: "FL",
    GA: "GA",
    HI: "HI",
    ID: "ID",
    IL: "IL",
    IN: "IN",
    IA: "IA",
    KS: "KS",
    KY: "KY",
    LA: "LA",
    ME: "ME",
    MD: "MD",
    MA: "MA",
    MI: "MI",
    MN: "MN",
    MS: "MS",
    MO: "MO",
    MT: "MT",
    NE: "NE",
    NV: "NV",
    NH: "NH",
    NJ: "NJ",
    NM: "NM",
    NY: "NY",
    NC: "NC",
    ND: "ND",
    OH: "OH",
    OK: "OK",
    OR: "OR",
    PA: "PA",
    PR: "PR",
    RI: "RI",
    SC: "SC",
    SD: "SD",
    TN: "TN",
    TX: "TX",
    UT: "UT",
    VT: "VT",
    VA: "VA",
    WA: "WA",
    WV: "WV",
    WI: "WI",
    WY: "WY",
  },
  //   Movies: {
  //     comments: (parent, args, context, info) => {
  //       const { _id } = parent;
  //       return Comment.find({ movie_id: _id })
  //         .limit(20)
  //         .then((comments) => {
  //           return comments.map((u) => ({ ...u._doc }));
  //         });
  //     },
  //   },
  // Mutation: {},
};
