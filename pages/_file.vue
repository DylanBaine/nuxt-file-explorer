<template>
  <div>
    <div v-if="file">
      <header class="mb-2">
        <h1 class="capitalize">
          <input
            v-model="file.name"
            @change="update"
            class="bg-transparent outline-none text-5xl p-1"
            type="text"
          >
        </h1>
        <div
          class="mb-2 bg-white w-1/3 p-2 rounded shadow relative z-10"
          id="toc"
          v-if="toc"
          v-html="toc"
        ></div>
      </header>
      <section class="flex">
        <article :class="file.parent_id || file.children.length ? 'w-5/6':'w-full'">
          <header class="-mt-10 mb-2">
            <div class="text-right">
              <small>alt+v to toggle</small>
              <button
                @click="editing = !editing"
                class="rounded w-24 p-2 bg-grey-darkest outline-none text-white"
              >{{editing ? 'View':'Edit'}}</button>
            </div>
          </header>
          <textarea
            v-show="editing"
            ref="textField"
            @change="update"
            class="w-full h-screen rounded p-1 border outline-none focus:border-grey-dark bg-transparent"
            v-model="file.content"
          ></textarea>
          <div v-show="!editing" class="w-full" id="content" v-html="fileHtml"></div>
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
    <div class="p-6 text-3xl fixed pin-b pin-r">
      <a clall="p-2 rounded-full" href="#">&uarr;</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editing: false,
      tmpFile: {
        name: null
      }
    };
  },
  watch: {
    $route(route) {
      this.markViewingHash(route);
    }
  },
  computed: {
    parent() {
      return this.$store.state.flatState.find(
        item => item.id == this.file.parent_id
      );
    },
    converter() {
      const showdown = require("showdown");
      const converter = new showdown.Converter({
        metadata: true,
        simplifiedAutoLink: true
      });
      return converter;
    },
    fileHtml() {
      return this.converter.makeHtml(this.file.content);
    },
    toc() {
      if (!this.file || !this.file.content) return;
      return this.file.content
        .split("\n")
        .filter(line => line.includes("#"))
        .map(header => {
          const findHash = new RegExp("#", "g");
          const hashCount = (header.match(findHash) || []).length;
          var specialChars = "!@#$^&%*()+=-[]/{}|:<>?,.";
          for (var i = 0; i < specialChars.length; i++) {
            header = header.replace(
              new RegExp("\\" + specialChars[i], "gi"),
              ""
            );
          }
          header = header.replace(findHash, "");
          const link = header.toLowerCase().replace(new RegExp(" ", "g"), "");
          return `<a class="ml-${hashCount} block" href="#${link}">&middot; ${header}</a>`;
        })
        .join("");
    },
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
  updated() {
    this.markViewingHash(this.$route);
    if (this.parent) {
      this.$store.commit("viewingChildren", this.parent);
    }
  },
  mounted() {
    document.addEventListener("keydown", ({ altKey, key }) => {
      if (altKey && key.toLowerCase() === "v") {
        this.editing = !this.editing;
        this.$nextTick(() => {
          if (this.editing && this.$refs.textField) {
            this.$refs.textField.focus();
          }
        });
      }
    });
  },
  methods: {
    markViewingHash(route) {
      const viewing = document.getElementById(route.hash.replace("#", ""));
      if (viewing && route.hash) {
        viewing.classList.add("bg-yellow");
        setTimeout(() => {
          viewing.classList.remove("bg-yellow");
        }, 2000);
      }
    },
    update() {
      this.$store.commit("updateItem", this.file);
      this.$root.$mount();
    }
  }
};
</script>

<style lang="postcss">
#content h1,
#content h2,
#content h3 {
  @apply py-2 border-b-2;
}

#content a,
#toc a {
  @apply text-blue;
}
#content a:hover,
#toc a:hover {
  text-decoration: underline;
  @apply bg-transparent;
}
</style>

