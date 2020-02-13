export default function guest({ next, store }) {
  // Change if value this to test page protection
  if (store.getters.auth.loggedIn) {
    return next({
      name: "home"
    });
  }

  return next();
}
