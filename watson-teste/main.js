'use strict';

const nodes = require('./watson-dialogs-nodes.json').dialog_nodes;

const firstNode = node => !node.parent && !node.previous_sibling && (!node.type || node.type !== 'folder');
const initialNodes = nodes.filter(firstNode);

const firstChildren = nodes.filter(node => node.parent === initialNodes[0].dialog_node)

console.info(initialNodes);

const mermaid = "```mermaid\ngraph TD\n\t"+initialNodes.dialog_node+" --> "+firstChildren[0].dialog_node+'\n\t'+initialNodes.dialog_node+" --> AlexsanderÉFoda```"

// console.log(mermaid);