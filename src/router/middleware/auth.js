export default function auth({ next, store }) {
  // Change if value this to test page protection
  if (!store.getters.auth.loggedIn) {
    return next({
      name: "login"
    });
  }

  return next();
}
