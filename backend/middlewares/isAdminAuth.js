import jwt from "jsonwebtoken";

  export const isAdminAuth = async (req, res, next) => {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ message: "Unauthorized: Please login" });
      }
  
  
      const decodedData = jwt.verify(token, process.env.JWT_SEC);
      if (decodedData.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized",redirect: "/admin-login" });
      }

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Session expired. Please log in again." });
      }
      res.status(500).json({ message: "Authorization error. Please log in." });
    }
  };
  