/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Tree from './tree.js';

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) return;
    if (node.rightChild !== null) {
        prettyPrint(
            node.rightChild,
            `${prefix}${isLeft ? '│   ' : '    '}`,
            false,
        );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.leftChild !== null) {
        prettyPrint(
            node.leftChild,
            `${prefix}${isLeft ? '    ' : '│   '}`,
            true,
        );
    }
}

function testTree() {
    console.log('Testing BST...');
    // Create a BST from an array of numbers  TODO: USE RANDOM NUMBERS FOR FINAL TESTING
    const array = [10, 20, 30, 40, 50, 1, 100, 65, 64, 67, 80];
    console.log(`Creating BST from array: ${array}`);
    const bst = new Tree(array);

    // Print the BST using prettyPrint
    console.log('Pretty printing the BST:');
    prettyPrint(bst.root);
    // Check if the initial tree is balanced
    console.log('Is the tree balanced?: ', bst.isBalanced());

    // Insert new values
    let newValue = 150;
    console.log(`Inserting value ${newValue}...`);
    bst.insert(newValue);
    prettyPrint(bst.root);
    newValue = 250;
    console.log(`Inserting value ${newValue}...`);
    bst.insert(newValue);
    prettyPrint(bst.root);
    newValue = 1250;
    console.log(`Inserting value ${newValue}...`);
    bst.insert(newValue);
    prettyPrint(bst.root);

    // Check if the new tree is balanced
    console.log('Is the tree balanced?: ', bst.isBalanced());
    // Run rebalance if tree is unbalanced
    if (!bst.isBalanced()) {
        bst.rebalance();
    }
    console.log(`The new root is ${bst.root.value}`);
    prettyPrint(bst.root);
    // Check if the new tree is balanced
    console.log('Is the tree balanced?: ', bst.isBalanced());

    // Delete a value
    const deleteValue = 10;
    console.log(`Deleting value ${deleteValue}, 40, and 65...`);
    bst.deleteItem(deleteValue);
    bst.deleteItem(40);
    bst.deleteItem(65);
    // Check if the new tree is balanced
    console.log('Is the tree balanced?: ', bst.isBalanced());
    // Run rebalance if tree is unbalanced
    if (!bst.isBalanced()) {
        bst.rebalance();
    }
    console.log(`The new root is ${bst.root.value}`);
    prettyPrint(bst.root);

    // Find a value
    const valueToFind = 20;
    console.log(`Searching for value ${valueToFind}`);
    if (bst.find(valueToFind)) {
        console.log(`Is ${valueToFind} present?: true`);
    } else {
        console.log(`Is ${valueToFind} present?: false`);
    }

    // Perform traversals
    console.log(`Performing in-order traversal: ${bst.inOrder()}`);
    console.log(`Performing pre-order traversal: ${bst.preOrder()}`);
    console.log(`Performing post-order traversal: ${bst.postOrder()}`);

    console.log('Reached end of testTree()');
}

testTree();
