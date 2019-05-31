<template>
  <div>
    <div v-if="file">
      <header class="p-4 rounded bg-grey mb-4 shadow-lg">
        <h1 class="capitalize">
          <input v-model="file.name" @change="update" class="bg-transparent p-1" type="text">
        </h1>
      </header>
      <section class="flex">
        <article :class="file.parent_id || file.children.length ? 'w-5/6':'w-full'">
          <textarea
            @change="update"
            class="w-full h-screen rounded p-1 border outline-none focus:border-grey-dark"
            v-model="file.content"
          ></textarea>
        </article>
        <aside v-if="file.parent_id || file.children.length" class="w-1/6 p-2">
          <ul class="list-reset">
            <li v-if="file.parent_id">
              <nuxt-link :to="`/${file.parent_id}`" class="w-full block">&lsaquo; Back To Parent</nuxt-link>
            </li>
            <li v-for="child in file.children" :key="child.id">
              <nuxt-link :to="`/${child.id}`" class="w-full block">{{child.name}}</nuxt-link>
            </li>
          </ul>
        </aside>
      </section>
    </div>
    <div class="flex" v-else>
      <h1>No File Found :(</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tmpFile: {
        name: null
      }
    };
  },
  computed: {
    file() {
      const { flatState } = this.$store.state;
      const file = flatState.find(f => f.id == this.$route.params.file);
      const returnFile = { ...file };
      returnFile.children = flatState.filter(
        child => child.parent_id == file.id
      );
      return returnFile;
    }
  },
  methods: {
    update() {
      this.$store.commit("updateItem", this.file);
      this.$root.$mount();
    }
  }
};
</script>
