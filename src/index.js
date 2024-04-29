/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import Tree from './tree.js';

function testTree() {
    console.log('Testing BST...');
    // Create a BST from an array of numbers  TODO: USE RANDOM NUMBERS FOR FINAL TESTING
    const array = [10, 20, 30, 40, 50, 1, 100, 65, 64, 67, 80];
    console.log(`Creating BST from array: ${array}`);
    const bst = new Tree(array);
    console.log(bst);
    console.log('Reached end of testTree()');
}

testTree();
