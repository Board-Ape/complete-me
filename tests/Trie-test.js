import { expect } from 'chai';
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
const text = "/usr/share/dict/words"
const fs = require('fs')
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('Trie functionality', () => {

  describe('insert', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should have a root', () => {
      expect(completeMe.root).to.equal(null);
    })

    it('should be able to insert a word and root should be a Node', () => {
      completeMe.insert('connect');

      expect(completeMe.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {
      completeMe.insert('connect');

      expect(completeMe.root.children.c.letter).to.be.equal('c')

      expect(
        completeMe.root
        .children.c
        .children.o.letter
      ).to.equal('o')

    })

    it('should be able to insert a word and the last letter should have a isWord property of true', () => {
      completeMe.insert('connect');

      expect(
        completeMe.root
        .children.c
        .children.o
        .children.n
        .children.n
        .children.e
        .children.c
        .children.t.letter
      ).to.equal('t')

      expect(
        completeMe.root
        .children.c
        .children.o
        .children.n
        .children.n
        .children.e
        .children.c
        .children.t.isWord
      ).to.equal(true)
    })

    it('should be able to insert multiple words and children objects should have multiple options', () => {
      completeMe.insert('connect');
      completeMe.insert('con');

      let childKeys = Object.keys(
        completeMe.root
        .children.c
        .children.o
        .children
      );

      expect(childKeys).to.deep.equal(['n']);
      expect(completeMe.root
      .children.c
      .children.o
      .children.n.isWord).to.eq(true)

    })

    it('should have nodes which represent incomplete words where the isWord prop is false', () => {
      completeMe.insert('connect');

      expect(
        completeMe.root
        .children.c
        .children.o
        .children.n
        .children.n.isWord
      ).to.equal(false);

    })
  })

//================================================================

  describe('count', () => {
    let completeMe

    beforeEach(() => {
      completeMe = new Trie();
    })

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0);

      completeMe.insert('can');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('con');
      expect(completeMe.count()).to.equal(2);

      completeMe.insert('connect');
      expect(completeMe.count()).to.equal(3);

      completeMe.insert('connects');
      expect(completeMe.count()).to.equal(4);
    })

    it('should not change count if duplicate words are inserted', () => {
      expect(completeMe.count()).to.equal(0);

      completeMe.insert('can');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('can');
      expect(completeMe.count()).to.equal(1);
    })
  });

//================================================================

  describe('suggest', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
      completeMe.insert('con');
      completeMe.insert('connect');
      completeMe.insert('connected');
      completeMe.insert('contact');
      completeMe.insert('apt');
      completeMe.insert('cat');
      completeMe.insert('zebra');
    })

    it('should return all children words of suggestion', () => {

      let suggestions = completeMe.suggest('con');

      expect(suggestions).to.deep.equal([ 'con', 'connect', 'connected', 'contact' ])

      suggestions = completeMe.suggest('connectb');

      expect(suggestions).to.deep.equal([])

      suggestions = completeMe.suggest('connect');

      expect(suggestions).to.deep.equal([ 'connect', 'connected' ])

      suggestions = completeMe.suggest('ca.');

      expect(suggestions).to.deep.equal([])

      suggestions = completeMe.suggest('z');

      expect(suggestions).to.deep.equal([ 'zebra' ])
    })
  });

//================================================================

  describe('select', () => {

    it('should be able to select order of words returned by suggest', () => {
      let completeMe = new Trie()

      completeMe.insert('con')
      completeMe.insert('connect')
      completeMe.insert('connected')
      completeMe.insert('contact')

      expect(completeMe.suggest('con')).to.deep.equal([ 'con', 'connect', 'connected', 'contact' ])
      //
      completeMe.select('connect');
      //
      expect(completeMe.suggest('con')).to.deep.equal([ 'connect', 'con', 'connected', 'contact' ])

      completeMe.select('connected');

      expect(completeMe.suggest('con')).to.deep.equal([ 'connected', 'connect', 'con', 'contact' ])

      completeMe.select('connect');

      expect(completeMe.suggest('con')).to.deep.equal([  'connect', 'connected', 'con', 'contact' ])

      completeMe.select('contact');

      expect(completeMe.suggest('con')).to.deep.equal([ 'connect', 'contact', 'connected', 'con' ])
      //
      completeMe.select('con');

      expect(completeMe.suggest('con')).to.deep.equal([ 'connect', 'con', 'contact', 'connected' ])

      completeMe.select('con');

      expect(completeMe.suggest('con')).to.deep.equal([ 'con', 'connect', 'contact', 'connected' ])

    })
  })

  //================================================================

  describe('populate', () => {

    it('should populate the Trie with the dictionary', () => {
      var completion = new Trie()

      completion.populate(dictionary)
      expect(completion.count()).to.eq(234371)
    }).timeout(2000)
  })
})
