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
    console.log('Pretty printing the BST:');
    prettyPrint(bst.root);
    console.log('Reached end of testTree()');
    console.log('Is the tree balanced?: ', bst.isBalanced());
}

testTree();
