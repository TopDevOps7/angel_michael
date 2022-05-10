<template>
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <!-- Brand/logo -->
  <a class="navbar-brand" href="#">Logo</a>
  
  <!-- Links -->
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#"></a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#"></a>
    </li>
    <li class="nav-item" style="">
      <router-link to="/login" class="nav-link">Logout</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
    name: 'Navbar'
};
</script>