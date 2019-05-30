export const state = () => {
  return {
    folders: []
  }
}

export const mutations = {
  addItem({ folders }, payload) {
    folders.push({
      id: folders.length + 1,
      name: payload.name,
      children: [],
      addingChildren: false
    });
  },
  pushChild({ folders }, { parent, child }) {
    parent.children.push({
      id: folders.length + 1,
      parent_id: parent.id,
      name: child.name,
      children: [],
      addingChildren: false
    });
  },
  addingChild({ folders }, parent) {
    parent.addingChildren = true;
  },
  cancelAddingChild({ folders }, parent) {
    parent.addingChildren = false;
  }
}
