<template>
  <div>
    <div v-if="file">
      <header class="p-4 rounded bg-grey mb-4 shadow-lg">
        <h1 class="capitalize">
          <input v-model="file.name" @change="update" class="bg-transparent p-1" type="text">
        </h1>
      </header>
      <section class="flex">
        <article class="w-5/6">
          <textarea
            @change="update"
            class="w-full h-screen rounded p-1 border outline-none focus:border-grey-dark"
            v-model="file.content"
          ></textarea>
        </article>
        <aside class="w-1/6">
          <ul>
            <li v-for="child in file.children" :key="child.id">{{child.name}}</li>
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
