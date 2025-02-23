export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    httpOnly: true,
    secure: isProduction, // Must be true in production
    sameSite: isProduction ? "none" as const : "lax" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    signed: true,
    // Don't set domain in production
    ...(isProduction ? {domain:"production"} : { domain: "localhost" })
  };
};