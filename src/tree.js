/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Node from './node.js';

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    // Build the BST from the parameter array and returns the level-0 root node
    buildTree(array) {
        // Remove dulpicates from the array by converting it to a Set
        const unqiueArray = new Set(array);
        // Convert the Set back to an array and sort it in ascending order for balancing
        const sortedArray = [...unqiueArray].sort((a, b) => a - b);
        // Base case: if the sorted array is empty (i.e., empty tree), return null
        if (sortedArray.length === 0) return null;
        // Determine tree root by identifying array median
        const middleIndex = Math.floor(sortedArray.length / 2);
        // Create the root
        const root = new Node(sortedArray[middleIndex]);
        // Recursively build the left subtree using the lesser elements
        root.leftChild = this.buildTree(sortedArray.slice(0, middleIndex));
        // Recursively build the right subtree using the greater elements
        root.rightChild = this.buildTree(sortedArray.slice(middleIndex + 1));
        return root;
    }
}

export default Tree;
