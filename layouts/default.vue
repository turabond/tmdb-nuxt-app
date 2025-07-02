<template>
  <div class="min-h-screen text-white flex flex-col items-center">
    <AppHeader />

    <main class="flex flex-col flex-1 container px-5 md:px-8">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style>
body {
  background-color: #141414;
  /* background-color: #000000; */
  color: white;
}
</style>
