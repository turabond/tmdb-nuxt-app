<template>
  <header class="bg-opacity-80 backdrop-blur shadow-md sticky top-0 z-50 py-4 w-full flex items-center justify-center">
    <div class="container flex items-center justify-between px-5 md:px-8">
      <NuxtLink
        to="/"
        class="text-3xl font-normal text-primary text-red-600"
      >
        NuxtFlix
      </NuxtLink>

      <LoginButton>
        Sign In
      </LoginButton>
    </div>
  </header>
</template>
