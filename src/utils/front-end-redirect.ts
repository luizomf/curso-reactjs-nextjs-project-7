export const frontEndRedirect = (redirectTo?: string) => {
  if (typeof window === 'undefined') return;

  const newPath = redirectTo || encodeURI(window.location.pathname);
  window.location.href = `${process.env.NEXT_PUBLIC_LOGIN_URI}/?redirect=${newPath}`;

  return null;
};
