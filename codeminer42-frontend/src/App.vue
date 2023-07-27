<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <v-app>
    <v-main style="background-color: #e7e6e6;">
      <router-view v-slot="{ Component, route }">
        <transition name="fade">
          <component :is="Component" :key="route.path"/>
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>
