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

    // Check if the BST is balanced (i.e., height difference between left and right subtrees of every node is <=1)
    isBalanced() {
        return this.isBalancedHelper(this.root);
    }

    // Helper function to recursively check if a subtree is balanced
    isBalancedHelper(node) {
        // Case: Empty tree is balanced
        if (node === null) {
            return true;
        }
        // Calculate the height of the left and right subtree
        const leftHeight = this.height(node.leftChild);
        const rightHeight = this.height(node.rightChild);
        // Calculate the absolute difference between the two subtree heights
        const diff = Math.abs(leftHeight - rightHeight);
        if (diff <= 1) {
            // Recursively check the left and right subtrees for balance
            return (
                this.isBalancedHelper(node.leftChild) &&
                this.isBalancedHelper(node.rightChild)
            );
        }
        // If the difference is more than 1, the subtree is unbalanced
        return false;
    }

    // Calculate the height of the given node
    height(node) {
        if (node !== null) {
            // Recursively calculate the height of the left and right subtree
            const leftHeight = this.height(node.leftChild);
            const rightHeight = this.height(node.rightChild);
            // Return the maximum height of the two subtrees (+1 for the current node)
            return Math.max(leftHeight, rightHeight) + 1;
        }
        return 0;
    }

    // Insert a value into the BST
    insert(value) {
        this.root = this.insertNode(this.root, value);
    }

    // Recursive-traversal method to insert a value into the BST
    insertNode(node, value) {
        // If the current node is null, create a new node with the passed value
        if (node === null) {
            return new Node(value);
        }
        // Insert to the left if value is less than the current node's value
        if (value < node.value) {
            const newNode = node;
            newNode.leftChild = this.insertNode(node.leftChild, value);
            return newNode;
        }
        // Insert to the right if value is greater than the current node's value
        if (value > node.value) {
            const newNode = node;
            newNode.rightChild = this.insertNode(node.rightChild, value);
            return newNode;
        }
        // Return the current node on equal
        return node;
    }

    // Rebalances the BST by creating a new tree from the in-order traversal of the current tree
    rebalance() {
        // Perform the in-order traversal to get sorted array of BST
        const array = this.inOrder();
        // Build a new balanced BST from the sorted array
        this.root = this.buildTree(array);
    }

    // Perform in-order traversal of the tree
    inOrder() {
        const result = [];
        this.inOrderTraversal(this.root, (node) => {
            result.push(node.value);
        });
        return result;
    }

    // Recursive in-order traversal
    inOrderTraversal(node, callback) {
        if (node !== null) {
            // Recursively traverse the left subtree
            this.inOrderTraversal(node.leftChild, callback);
            // Invoke the callback to push the node value
            callback(node);
            // Recursively traverse the right subtree
            this.inOrderTraversal(node.rightChild, callback);
        }
    }
}

export default Tree;
