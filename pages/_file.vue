<template>
  <article>
    <header>
      <h1>{{file.name}}</h1>
    </header>
    <section v-html="file.content"></section>
  </article>
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
