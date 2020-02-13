<template>
  <div class="membership">
    <h1>Membership</h1>
    <router-view />
  </div>
</template>

<script>
import auth from "@/router/middleware/auth";

export default {
  middleware: [auth]
};
</script>