const ListenerManager = {
  listeners: [],
  
  add: function (unsub) {
    this.listeners.push(unsub);
  },

  clearAll: function () {
    this.listeners.forEach(unsub => unsub());
    this.listeners = [];
  }
};

export default ListenerManager;
