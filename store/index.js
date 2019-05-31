export const state = () => {
  return {
    flatState: []
  }
}

const formatItem = (topState, parentArg) => {
  const parent = { ...parentArg };
  parent.children = topState.filter(child => child.parent_id == parent.id).map(child => {
    return formatItem(topState, child);
  });
  return parent;
}

export const getters = {
  getItemById: state => id => {
    return state.find(item => item.id == 1);
  },
  formattedFromFlatState({ flatState }) {
    return flatState.filter(item => item.parent_id == false).map(item => {
      return formatItem(flatState, item);
    })
  }
}

export const mutations = {
  updateItem({ flatState }, item) {
    var updating = flatState.find(i => i.id == item.id);
    flatState.splice(
      flatState.indexOf(updating),
      1,
      item
    )
  },
  addItem({ flatState }, payload) {
    const data = {
      id: flatState.length + 1,
      parent_id: false,
      name: payload.name,
      content: "",
      children: [],
      addingChildren: false,
    };
    flatState.push(data);
  },
  pushChild({ flatState }, { parent, child }) {
    const data = {
      id: flatState.length + 1,
      parent_id: parent.id,
      name: child.name,
      content: "",
      children: [],
      addingChildren: false
    };
    flatState.push(data);
  },
  addingChild(ctx, parent) {
    parent.addingChildren = true;
  },
  cancelAddingChild(ctx, parent) {
    parent.addingChildren = false;
  }
}
