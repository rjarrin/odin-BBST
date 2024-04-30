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

    // Delete a value from the BST
    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }

    // Recursively traverse the BST to delete the desired node
    deleteNode(node, value) {
        const newNode = node;
        // If the current node is null, the value is not in the tree
        if (node === null) {
            return null;
        }
        // Traverse the left subtree if value is less than the current node's value
        if (value < node.value) {
            newNode.leftChild = this.deleteNode(node.leftChild, value);
        }
        // Traverse the right subtree if the value is more than the current node's value
        else if (value > node.value) {
            newNode.rightChild = this.deleteNode(node.rightChild, value);
        }
        // If the value is equal to the current node, handle the deletion based on the number of children
        else {
            // Case: Node without children - remove the node
            if (node.leftChild === null && node.rightChild === null) {
                return null;
            }
            // Case: Node with one child - replace the node with its child
            if (node.leftChild === null) {
                return newNode.rightChild;
            }
            if (node.rightChild === null) {
                return newNode.leftChild;
            }
            // Case: Node with two children - find the minimum value in the right subtree, replace the current node's value with it, and then delete that min value
            const tempNode = this.findMinNode(node.rightChild);
            newNode.value = tempNode.value;
            newNode.rightChild = this.deleteNode(
                node.rightChild,
                tempNode.value,
            );
        }
        return newNode;
    }

    // Recursively find the node with the minimum value in the subtree
    findMinNode(node) {
        // If the current node has no left child, it is the minimum node
        if (node.leftChild === null) {
            return node;
        }
        // Otherwise, continue searching in the left subtree
        return this.findMinNode(node.leftChild);
    }

    // Find a value in the tree
    find(value) {
        return this.findNode(this.root, value);
    }

    // Recursively search for the value
    findNode(node, value) {
        // If the current node is null, return null
        if (node === null) return null;
        // If the value is less than the current's value, search in the left subtree
        if (value < node.value) {
            return this.findNode(node.leftChild, value);
        }
        // If the value is greater than the current's value, search in the right subtree
        if (value > node.value) {
            return this.findNode(node.rightChild, value);
        }
        // If the value is greater than the current node's value, return the node
        return node;
    }

    // Perform pre-order traversal of the tree
    preOrder() {
        const result = [];
        this.preOrderTraversal(this.root, (node) => {
            result.push(node.value);
        });
        return result;
    }

    // Recursive pre-order traversal
    preOrderTraversal(node, callback) {
        if (node !== null) {
            // Invoke the callback to push the node value
            callback(node);
            // Recursively traverse the left subtree
            this.preOrderTraversal(node.leftChild, callback);
            // Recursively traverse the right subtree
            this.preOrderTraversal(node.rightChild, callback);
        }
    }

    // Perform post-order traversal of the tree
    postOrder() {
        const result = [];
        this.postOrderTraversal(this.root, (node) => {
            result.push(node.value);
        });
        return result;
    }

    // Recursive post-order traversal
    postOrderTraversal(node, callback) {
        if (node !== null) {
            // Recursively traverse the left subtree
            this.postOrderTraversal(node.leftChild, callback);
            // Recursively traverse the right subtree
            this.postOrderTraversal(node.rightChild, callback);
            // Invoke the callback to push the node value
            callback(node);
        }
    }

    // Perform a level-order traversal of the tree
    levelOrder() {
        // Initialize an array to store the node values
        const result = [];
        // Initialize a queue with the root node
        const queue = [this.root];
        // While the queue is not empty
        while (queue.length > 0) {
            // Dequeue a node
            const node = queue.shift();
            // Add the node's value to the result array
            result.push(node.value);
            // Enqueue the left and right children of the node
            if (node.leftChild) queue.push(node.leftChild);
            if (node.rightChild) queue.push(node.rightChild);
        }
        // Return the result array
        return result;
    }

    // Return the given node's depth
    depth(node) {
        // If node does not exist, return invalid value (-1)
        if (node === null) return -1;
        // Case: Depth of root node is 0
        if (node === this.root) return 0;
        // Recursively find the parent of the node
        const parent = this.findParent(this.root, node);
        // If the node is not in the tree, return invalid value
        if (parent === null) return -1;
        // Otherwise, return the depth of the parent + 1
        return this.depth(parent) + 1;
    }

    // Helper function to find the parent of a given node
    findParent(currentNode, node) {
        // Case: Reached the end of a branch
        if (currentNode === null) return null;
        // Compare children with the node. If matched, current node is the parent
        if (currentNode.leftChild === node || currentNode.rightChild === node)
            return currentNode;
        // Recursively search the left subtree for the parent
        const leftParent = this.findParent(currentNode.leftChild, node);
        // If the left subtree contains the node, return the left parent
        if (leftParent !== null) return leftParent;
        // If the left subtree does not contain the node, recursively search the right subtree for the parent
        return this.findParent(currentNode.rightChild, node);
    }
}

export default Tree;
