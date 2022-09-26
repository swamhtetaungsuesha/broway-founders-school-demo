/** @type {import('next').NextConfig} */
module.exports  = {
  reactStrictMode: true,
  env : {
    BASE_URL: process.env.BASE_URL,
    MONGODB_URL: process.env.MONGODB_URL,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEXT_PUBLIC_MAILCHIMP_URL: process.env.NEXT_PUBLIC_MAILCHIMP_URL,
    RECAPTCHA_API_KEY : process.env.RECAPTCHA_API_KEY
  },
  devIndicators: {
    buildActivity: false
},
  
}



