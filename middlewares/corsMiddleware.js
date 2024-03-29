module.exports = (req, res, next) => {
  // console.log("req-middle 2", req);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Origin",
    // "https://main--beautiful-llama-b6d890.netlify.app"
    "http://localhost:3000"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Custom-Header"
  );
  //console.log("req-middle 6", req);
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};
