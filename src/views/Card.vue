<template>
  <div class="membership-card">
    <h1>Card</h1>
  </div>
</template>

<script>
import customer from "@/router/middleware/customer";

export default {
  middleware: [customer]
};
</script>