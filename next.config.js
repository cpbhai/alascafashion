// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig
module.exports = {
  env: {
    baseUrl: "http://localhost:3000",
    MONGODB_URL:
      "mongodb+srv://hvs:thakur@cluster0.dsegf.mongodb.net/alascafashion",
    ACCESS_TOKEN_SECRET:
      "nnninjcdgdfg hatgoadis",
    ACCESS_TOKEN_EXPIRE: "5d",
    CLOUD_UPDATE_PRESET: "theinnigsofthelegend5",
    CLOUD_NAME: "alascafashion-media",
    CLOUD_API: "https://api.cloudinary.com/v1_1/alascafashion-media/image/upload",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};