<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import auth from "@/router/middleware/auth";

export default {
  middleware: [auth]
};
</script>