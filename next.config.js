

module.exports = {
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: process.env.ALLOWED_METHODS },
            { key: "Access-Control-Allow-Headers", value: process.env.ALLOWED_HEADERS },
          ]
        }
      ]
    }
  };
  