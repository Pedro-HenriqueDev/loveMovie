<template>
    <div class="container-login">

        <div
            class="form mt-3 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">

            <div class="space-y-6" action="#">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white"><router-link to="/"><img class="w-8"
                            src="../../assets/botao-voltar.png" alt=""></router-link>Recovery Password</h5>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                        email</label>
                    <input @keyup.enter="sendEmail()" type="email" v-model="email" name="email" id="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com" required>
                </div>

                <button @click="sendEmail()"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <div v-if="!loading">
                        Send Email
                    </div>
                    <div v-else role="status">
                        <svg aria-hidden="true"
                            class="inline w-5 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </button>
            </div>
        </div>

    </div>
    <Toast :show="toast.show" :Error="toast.Error" :message="toast.message" @close="watchClose" />
</template>

<script setup>
import axios from 'axios'
import Toast from '@/components/Toast.vue'
import { ref } from 'vue'

const toast = ref({
    show: false,
    Error: false,
    message: ""
})
const loading = ref(false)
const email = ref(null)

function sendEmail() {
    loading.value = true
    if (!email.value) {
        loading.value = false
        showMessage(true, true, "Email field is required")
        return;
    }
    axios.post(process.env.VUE_APP_URL_APIUSER + 'forgotpassword', { email: email.value }).then((res) => {
        if(res.status == 200) {
            showMessage(true, false, "Um email de redefinição de senha foi enviado para o seu email")
            loading.value = false
            return
        }
        showMessage(true, true, "Ocorreu um erro")
        loading.value = false
        return
    }).catch((err) => {
        loading.value = false
        showMessage(true, true, "Ocorreu um erro")
        return
    })
}
function watchClose(res) {
    toast.value.show = res.show
}
function showMessage(show, Error, message) {
    toast.value.message = message
    toast.value.Error = Error
    toast.value.show = show
}



</script>


<style scoped>.container-login {
    display: flex;
    justify-content: center;
    height: 100vh;
}

.form {
    height: 300px;
}</style>