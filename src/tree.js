/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Node from "./node.js";

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
}

export default Tree;