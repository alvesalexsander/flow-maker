class NodeRepository {

    addNode(node) {
        this[node.id] = node;
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