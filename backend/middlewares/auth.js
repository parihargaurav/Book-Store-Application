import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1️⃣ Check header exists
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized, JWT token is required" });
  }

  // 2️⃣ Check Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized, invalid token format" });
  }

  try {
    // 3️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Attach user info
    req.user = decoded;

    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

export default ensureAuthenticated;
