class NodeRepository {

    constructor() {
        sessionStorage.getNode = (id) => this.getNode(id);
    }

    addNode(node) {
        if (node.type !== 'SwitchNode'){
            this[node.id] = node;
        }
        else {
            for (const path of node.pathNodes) {
                this[path.id] = path;
            }
            this[node.id] = node;
        }
    }

    getNode(id) {
        return this[id];
    }

    alter(id, changes = {}) {
        if (this[id]) {
            for (const atributo in changes) {
                if (this[id].hasOwnProperty(atributo)) {
                    this[id].set(atributo, changes[atributo]);
                }
            }
        }
    }
}

module.exports = NodeRepository;