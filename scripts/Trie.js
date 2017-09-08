import Node from './Node'

export default class Trie {
  constructor(node) {
    this.root = null
    this.wordCount = 0
    this.wordFreq = []
  }

  insert(word) {
    let node = new Node()

    if (!this.root) {
      this.root = node
    }

    let letters = [...word.toLowerCase()]
    let currentNode = this.root

    letters.forEach((letter) => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
      }
      currentNode = currentNode.children[letter]
    })

    if (currentNode.isWord === false) {
      currentNode.isWord = true
      this.wordCount++
    }
  }

  count() {
    return this.wordCount
  }

  suggest(word) {
    let wordAsArray = [...word];
    let currNode = this.root;
    let suggestionsArray = [];
    let sortedArray = []

    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]]
    }

    const traverseTheTrie = (word, currNode) => {
      let keys = Object.keys(currNode.children);

      for (let k = 0; k < keys.length; k++) {
        const child = currNode.children[keys[k]];
        let newString = word + child.letter;

        if (child.isWord) {
          suggestionsArray.push(newString);
        }
        traverseTheTrie(newString, child);
      }
    };

    if (currNode && currNode.isWord) {
      suggestionsArray.push(word)
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }

    this.wordFreq.forEach((wordObj) => {
      suggestionsArray.forEach((arrayWord, i) => {
        if (wordObj.word === arrayWord) {
          sortedArray.push(wordObj)
          suggestionsArray.splice(i, 1)
        }
      })
    })

    sortedArray.sort((a, b) => {
      return a.freq - b.freq
    })

    sortedArray.forEach((obj) => {
      suggestionsArray.unshift(obj.word)
    })

    return suggestionsArray;
  }

  select(word) {
    let wordObj = {
      word: word,
      freq: 1
    }

    let foundWord = false

    if (this.wordFreq.length === 0) {
      this.wordFreq.push(wordObj)
      foundWord = true
    } else if (this.wordFreq.length > 0) {
      this.wordFreq.forEach((obj) => {
        if (word === obj.word) {
          foundWord = true
          obj.freq += 1
        }
      })
    }

    if (foundWord === false && this.wordFreq.length > 0) {
      this.wordFreq.push(wordObj)
    }

  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}
