<template>
    <nav aria-label="Page navigation example ">
  <ul class="inline-flex items-center -space-x-px my-2">
    <li>
      <div class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="subPage(1)" @click="link(1,'sub')">
        <span class="sr-only">Previous</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
      </div>
      
    </li>
    <li>
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="subPage(3)" @click="link(3,'sub')"><a>{{subPage(3)}}</a></div>
    </li>
    <li>
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="subPage(2)" @click="link(2,'sub')"><a>{{subPage(2)}}</a></div>
    </li>
    <li>
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="subPage(1)" @click="link(1,'sub')">{{subPage(1)}}</div>
    </li>
    <li>
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-600 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="pag">{{pag}}</div>
    </li>
    <li>
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="addPage(1)" @click="link(1, 'sum')">{{addPage(1)}}</div>
    </li>
    <li>
      
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="addPage(2)" @click="link(2,'sum')">{{addPage(2)}}</div>
  
    </li>
    <li>
       
      <div class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="addPage(3)" @click="link(3,'sum')">{{addPage(3)}}</div>
      
    </li>
    <li>
       
      <div class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" v-show="addPage(1)" @click="link(1,'sum')">
        <span class="sr-only" >Next</span>
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
      </div>
      
    </li>
  </ul>
</nav>
</template>

<script>
export default {
    data() {
      let pag = parseInt(this.page)
        return {
            pag
        }
    },
    props: {
      page: String,
      allPages: Number
    },
    created: function() {
      this.$watch(
      () => this.page,
      (toParams, previousParams) => {
        if(toParams != previousParams) {
          this.pag = parseInt(toParams)
        }
      }
    )
    },
    methods: {
      addPage(num) {
        let page = this.pag + num
        if(page > this.allPages) {
          return false
        }
        return page
      },
      subPage(num) {
        let page = this.pag - num
        if(page <= 0) {
          return false
        }
        return page
      },
      link(num, equation) {
        let search = Object.values(this.$route.query)[0]

        if(equation == "sum") {
          
          return this.$router.push({name: this.$route.name, params: {page: this.addPage(num)},query: {search}})
          
        }
        return this.$router.push({name: this.$route.name, params: {page: this.subPage(num)},query: {search}})
      }
    }
}
</script>

<style scoped>

</style>