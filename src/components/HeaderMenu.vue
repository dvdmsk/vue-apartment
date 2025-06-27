<template>
  <header class="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
    <nav class="container mx-auto px-4 py-3 flex gap-8 items-center">
      <RouterLink
        to="/"
        class="text-white hover:text-yellow-400 transition"
        active-class="text-yellow-400 font-bold"
        exact
      >
        Головна
      </RouterLink>
      <RouterLink
        to="/map"
        class="text-white hover:text-yellow-400 transition"
        active-class="text-yellow-400 font-bold"
      >
        Карта
      </RouterLink>
    </nav>
  </header>
</template>

