<template>
  <footer class="footer">
    <div class="container">
      <nav>
        <ul>
          <li>
            <router-link :to="{path:'/dashboard'}">Aplikimet</router-link>
          </li>
          <li>
            <router-link :to="{path:'/groups'}">Grupet</router-link>
          </li>
          <li>
            <router-link :to="{path:'/communication'}">Komunikim</router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright text-center">
        &copy; {{ new Date().getFullYear() }}
        <a
          href="https://forcewing.com"
          target="_blank"
        >Forcewing</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style>
</style>
