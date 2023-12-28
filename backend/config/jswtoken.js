const jwtoken = require("jsonwebtoken");

exports.getJswToken = (id) => {
  return jwtoken.sign({ id }, process.env.JWT_SECERT_TOKEN, {
    expiresIn: "1d",
  });
};
