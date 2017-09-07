export default class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.isWord = false;
    this.children = {};
  }
}
