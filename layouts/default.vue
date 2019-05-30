<template>
  <div class="flex">
    <aside class="w-1/6 h-screen bg-grey shadow-lg p-4 fixed pin-t">
      <header class="mb-2">
        <h3>
          Folders
          <button @click="addingFolder = true">+</button>
        </h3>
      </header>
      <section>
        <recursive-list :items="$store.state.folders"></recursive-list>
        <input
          class="p-1 w-full"
          v-model="newfolder"
          @change="pushFolder"
          @blur="addingFolder = false"
          v-if="addingFolder"
        >
      </section>
    </aside>
    <div class="w-1/6 h-screen"></div>
    <div class="w-5/6 p-4">
      <nuxt/>
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
      addingFolder: false,
      newfolder: "Name your Folder"
    };
  },
  methods: {
    pushFolder() {
      this.$store.commit("addItem", { name: this.newfolder });
      this.addingFolder = false;
      this.newfolder = null;
    }
  }
};
</script>
