import VuexPersistence from 'vuex-persist';
import localforage from 'localforage';

const db = localforage.createInstance({
  name: "files"
});

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      storage: window.localStorage
    }).plugin(store);
  });
}
