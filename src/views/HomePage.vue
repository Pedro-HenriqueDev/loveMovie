<template>
  <div class="dark:bg-gray-900 h-screen">
    <main class="main flex-col sm:flex-row dark:bg-gray-900 pt-10">
      <div class="md:w-1/2 sm:w-full flex justify-center">
        <div class="w-full flex justify-center">
          <div
            class="h-72 md:w-9/12 sm:w-full mx-4 p-4 text-center bg-white rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Veja os novos lançamentos do cinema!
            </h5>
            <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
              Veja os detalhes, procure por filmes e favorite-os para assistir
              depois.
            </p>
            <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <router-link
                class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-gray-700"
                to="/login">
                <div class="text-left">
                  <div class="-mt-1 font-sans text-lg font-semibold">Login</div>
                </div>
              </router-link>

              <router-link
                class="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                to="/Cadastre">
                <div class="text-left">
                  <div class="-mt-1 font-sans text-lg font-semibold">
                    Cadastre-se
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/2 sm:w-full">
        <div class="w-1/2 movie-container gap-3">
          <div class="w-5/12" v-for="movie in conteudo" :key="movie.id">
            <div>
              <img class="w-full" :src="`${imgLink}${movie.backdrop_path}`" alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { AutoLogin } from "@/extends/loginExtends";

const imgLink = process.env.VUE_APP_IMAGE
const conteudo = ref([])

async function getmovies() {
  const res = await axios
  .get(
    process.env.VUE_APP_URL +
    "popular" +
    process.env.VUE_APP_KEY +
    "&language=pt-BR"
  )

  conteudo.value.push(...res.data.results.slice(0, 4))
}

AutoLogin()
getmovies()
</script>


<style scoped>
.main {
  height: auto;
  padding-bottom: 20px;
  width: 100%;
  display: flex;
}
.movie-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>