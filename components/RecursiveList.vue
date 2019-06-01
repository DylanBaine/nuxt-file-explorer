<template>
  <ul class="w-full list-reset border-l">
    <li v-for="item in items" :key="item.id" class="w-full">
      <div class="flex p-1">
        <button
          @click="toggleVeviewingChildren(item)"
          class="p-1"
        >{{item.viewingChildren ||item.addingChildren ? '&lrtri;':'&ultri;'}}</button>
        <nuxt-link class="mr-1 w-32" :to="`/${item.id}`">{{item.name}}</nuxt-link>
        <button @click="addingChild(item)" class="p-1">&plus;</button>
      </div>
      <div class="ml-2" v-if="item.viewingChildren || item.addingChildren">
        <recursive-list :key="item.id" :items="item.children"></recursive-list>
        <ul class="list-reset">
          <li v-if="item.addingChildren">
            <input
              class="p-1 w-full"
              v-model="newItem"
              @blur="addingItem = false"
              @keyup.escape="cancelAddingItem(item)"
              @change="pushItem(item)"
            >
            <small class="font-xs">ESC to cancel, ENTER to save.</small>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      viewingChildren: false,
      newItem: null,
      addingItem: false
    };
  },
  props: ["items"],
  mounted() {
    document.addEventListener("keydown", ({ altKey, key }) => {
      if (altKey && key.toLowerCase() === "Escape") {
        this.$store.commit("cancelAddingChild");
        this.$mount();
      }
    });
  },
  methods: {
    pushItem(parent) {
      this.$store.commit("pushChild", {
        parent,
        child: { name: this.newItem }
      });
      this.newItem = null;
      this.$store.commit("cancelAddingChild", parent);
      this.$mount();
    },
    addingChild(item) {
      this.$store.commit("addingChild", item);
      this.$mount();
    },
    cancelAddingItem(parent) {
      parent.addingChildren = false;
      this.$mount();
    },
    toggleVeviewingChildren(item) {
      this.$store.commit("viewingChildren", item);
      this.$mount();
    }
  }
};
</script>
