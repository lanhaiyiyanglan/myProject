<template>
  <div class="navMenu">
    <template v-for="navMenu in navMenus">
        <!-- 最后一级菜单 -->
      <el-menu-item v-if="!navMenu.childs" :key="navMenu.name" :index="navMenu.name+navMenu.url" :route="navMenu.url">
        <i :class="navMenu.icon"></i>
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="navMenu.childs" :key="navMenu.name" :index="navMenu.name+navMenu.url">
        <template slot="title">
          <i :class="navMenu.icon"></i>
          <span> {{navMenu.name}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu :navMenus="navMenu.childs"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus']
  }
</script>
<style scoped>
</style>