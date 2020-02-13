export default function customer({ next, store }) {
  // Change if value this to test page protection
  if (!store.getters.auth.user.data.isCustomer) {
    return next({
      name: "login"
    });
  }

  return next();
}
