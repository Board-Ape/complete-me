import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node('');
  }

  insert (word) {
    console.log(this.root);
    let wordAsArray = [...word];

    let firstLetter = wordAsArray[0];

    // check if root node has the starting letter of our word
    if (this.root.children[firstLetter]) {
      console.log('root has child:', firstLetter);
    } else {
      console.log('root does NOT have child:', firstLetter);
      this.root.children[firstLetter] = new Node(firstLetter);

      let currNode = this.root.children[firstLetter];

      // console.log('wordAsArray length:', wordAsArray.length);

      for (let i = 1; i < wordAsArray.length; i++) {
        console.log('currNode', currNode);
        currNode.children[wordAsArray[i]] = new Node(wordAsArray[i])
        currNode = currNode.children[wordAsArray[i]];
      }
    }

    // console.log('ROOT:', this.root);

    console.log('ROOT:', util.inspect(this.root, {showHidden: false, depth: null}))

    //let newNode = new Node(wordAsArray[0]);
    //this.root = newNode;

  }
}
