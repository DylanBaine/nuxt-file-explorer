<template>
  <ul class="w-full list-reset border-l">
    <li v-for="item in items" :key="item.id" class="w-full">
      <div class="flex p-1">
        <nuxt-link class="mr-1 w-32" :to="`/${item.id}`">{{item.name}}</nuxt-link>
        <button @click="addingChild(item)">&plus;</button>
      </div>
      <div class="ml-2">
        <recursive-list :items="item.children"></recursive-list>
        <ul class="list-reset">
          <li v-if="item.addingChildren">
            <input
              class="p-1 w-full"
              v-model="newItem"
              @keyup.escape="$store.commit('cancelAddingChild', item)"
              @blur="addingItem = false"
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
      newItem: null,
      addingItem: false
    };
  },
  props: ["items"],
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
    }
  }
};
</script>
