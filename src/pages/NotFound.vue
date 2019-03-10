<template>
  <div>
    <div class="content">
      <div class="md-layout">
        <router-link :to="{name: 'Dashboard'}">
          <h1 class="text-center" id="home">Go to homepage</h1>
        </router-link>
        <h1 class="text-center">(Page Not Found)</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
#home {
  color: rgb(85, 85, 255);
}
</style>
