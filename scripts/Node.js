export default class Node {
  constructor(letter = null, children = {}, isCompleteWord = false) {
    this.letter = letter;
    this.children = children
    this.isCompleteWord = isCompleteWord;
  }
}
