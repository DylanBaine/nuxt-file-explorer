export const state = () => {
  return {
    folders: [],
    flatState: []
  }
}


export const mutations = {
  addItem({ folders, flatState }, payload) {
    const data = {
      id: flatState.length + 1,
      parent_id: false,
      name: payload.name,
      content: "",
      children: [],
      addingChildren: false,
    };
    flatState.push(data);
    folders.push(data);
  },
  pushChild({ folders, flatState }, { parent, child }) {
    const data = {
      id: flatState.length + 1,
      parent_id: parent.id,
      name: child.name,
      content: "",
      children: [],
      addingChildren: false
    };
    flatState.push(data);
    parent.children.push(data);
  },
  addingChild({ folders }, parent) {
    parent.addingChildren = true;
  },
  cancelAddingChild({ folders }, parent) {
    parent.addingChildren = false;
  }
}
