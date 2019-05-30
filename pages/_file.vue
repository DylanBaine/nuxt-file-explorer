<template>
  <div>
    <header class="p-4 rounded bg-grey mb-4 shadow-lg">
      <h1 class="capitalize">{{file.name}}</h1>
    </header>
    <section class="flex">
      <article class="w-5/6" v-html="file.content"></article>
      <aside class="w-1/6">
        <ul>
          <li v-for="child in file.children" :key="child.id">{{child.name}}</li>
        </ul>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    file() {
      const file = this.$store.state.flatState.find(
        f => f.id == this.$route.params.file
      );
      return (
        file || {
          name: null,
          content: null
        }
      );
    }
  }
};
</script>
