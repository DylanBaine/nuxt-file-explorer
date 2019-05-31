<template>
  <div class="flex">
    <aside class="w-1/6 h-screen bg-grey shadow-lg p-4 fixed pin-t overflow-auto">
      <header class="mb-2">
        <h3>
          Folders
          <button @click="addingFolder = true">+</button>
        </h3>
      </header>
      <section>
        <recursive-list :items="formattedItems"></recursive-list>
        <input
          class="p-1 w-full"
          v-model="newfolder"
          @change="pushFolder"
          @blur="addingFolder = false"
          placeholder="Folder Name..."
          v-if="addingFolder"
        >
      </section>
    </aside>
    <div class="w-1/6 h-screen"></div>
    <div class="w-5/6 px-4 bg-grey-lightest relative">
      <header :class="`p-2`">
        <div class="m-auto w-64 relative">
          <input
            ref="search"
            class="w-full border-2 rounded-full w-1/3 p-2 outline-none focus:border-grey-dark"
            placeholder="Search... (alt+s)"
            type="text"
            @focus="searching = true"
            @keyup.esc="searching = false"
            @keyup.enter="navigateToFirstSearchItem"
            v-model="search"
          >
          <ul
            v-if="searching && search.length"
            class="w-full list-reset bg-white absolute shadow-md mt-2 rounded"
          >
            <li v-for="item in searchItems" :key="item.id">
              <nuxt-link
                class="w-full block rounded-none p-1 focus:bg-grey-lighter focus:text-black hover:bg-grey-lighter hover:text-black"
                :to="`/${item.id}`"
              >{{item.name}}</nuxt-link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <nuxt/>
      </main>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
Vue.component(
  "recursive-list",
  require("~/components/RecursiveList.vue").default
);
export default {
  data() {
    return {
      searching: false,
      search: "",
      addingFolder: false,
      newfolder: ""
    };
  },
  mounted() {
    document.addEventListener("keydown", ({ altKey, key }) => {
      if (altKey && key.toLowerCase() === "s") {
        this.searching = true;
        this.$refs.search.focus();
      }
    });
  },
  watch: {
    $route() {
      this.search = "";
    }
  },
  computed: {
    formattedItems() {
      return this.$store.getters.formattedFromFlatState;
    },
    searchItems() {
      const { flatState } = this.$store.state;
      if (!this.search.length) return flatState;
      return flatState.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    pushFolder() {
      this.$store.commit("addItem", { name: this.newfolder });
      this.addingFolder = false;
      this.newfolder = null;
    },
    navigateToFirstSearchItem() {
      this.$router.push(`/${this.searchItems[0].id}`);
      this.$refs.search.blur();
      this.search = "";
      this.searching = false;
    }
  }
};
</script>

<style lang="postcss">
* {
  transition: all 0.2s;
}
a {
  text-decoration: none;
  @apply text-grey-darkest p-1 w-full rounded;
}
a:hover {
  @apply text-white bg-grey-dark;
}
.nuxt-link-active {
  @apply text-white bg-grey-dark;
}
</style>
