const jwt = require('jsonwebtoken');
const jwtkey = 'hellojs';
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  if (authHeader == null) {
    res.send("error")
    console.log(req.body);
  }
  else {

    jwt.verify(authHeader, jwtkey, (error, decoded) => {
      console.log(decoded, error);
      if (error) return res.send("something is wrong");
      //req.id=decoded.student_id;
      // console.log(student_id);
      next();
    })
  }
}
module.exports = { verifyToken };
