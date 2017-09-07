import { expect } from 'chai';
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
const text = "/usr/share/dict/words"
const fs = require('fs')
// const dictionary = fs.readFileSync(text).toString().trim().split('\n')

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
      completeMe.insert('hello');

      expect(completeMe.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {
      completeMe.insert('apple');

      expect(completeMe.root.children.a.letter).to.be.equal('a')

      expect(
        completeMe.root
        .children.a
        .children.p
        .letter
      ).to.equal('p')

    })

    it('should be able to insert a word and the last letter should have a isWord property of true', () => {
      completeMe.insert('hello');

      expect(
        completeMe.root
        .children.h
        .children.e
        .children.l
        .children.l
        .children.o
        .letter
      ).to.equal('o')

      expect(
        completeMe.root
        .children.h
        .children.e
        .children.l
        .children.l
        .children.o
        .isWord
      ).to.equal(true)
    })

    it('should be able to insert multiple words and children objects should have multiple props', () => {
      completeMe.insert('apple');
      completeMe.insert('app');

      let childKeys = Object.keys(
        completeMe.root
        .children.a
        .children.p
        .children
      );

      expect(childKeys).to.deep.equal(['p']);
      expect(completeMe.root
      .children.a
      .children.p
      .children.p.isWord).to.eq(true)

    })

    it('should have nodes which represent incomplete words where the isWord prop is false', () => {
      completeMe.insert('apple');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .isWord
      ).to.equal(false);

    })
  })

  describe('count', () => {
    let completeMe

    beforeEach(() => {
      completeMe = new Trie();
    })

    it('should return number of words inserted', () => {
      expect(completeMe.count()).to.equal(0);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('app');
      expect(completeMe.count()).to.equal(2);

      completeMe.insert('apple');
      expect(completeMe.count()).to.equal(3);

      completeMe.insert('apples');
      expect(completeMe.count()).to.equal(4);
    })

    it('should not change count if duplicate words are inserted', () => {
      expect(completeMe.count()).to.equal(0);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);
    })
  });

  describe('Suggest', () => {
      let completeMe;

      beforeEach(function () {
        completeMe = new Trie();
        completeMe.insert('app');
        completeMe.insert('apple');
        completeMe.insert('applesauce');
        completeMe.insert('apply');
        completeMe.insert('apt');
        completeMe.insert('cat');
        completeMe.insert('x-ray');
      })

      it('should return all children words of suggestion', () => {

        let suggestions = completeMe.suggest('app');

        expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

        suggestions = completeMe.suggest('applesb');

        expect(suggestions).to.deep.equal([])

        suggestions = completeMe.suggest('apple');

        expect(suggestions).to.deep.equal([ 'apple', 'applesauce' ])

        suggestions = completeMe.suggest('ca.');

        expect(suggestions).to.deep.equal([])

        suggestions = completeMe.suggest('x');

        expect(suggestions).to.deep.equal([ 'x-ray' ])
      })
    });

  describe('select', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it.skip('should be able to select order of words returned by suggest', () => {
      completeMe.insert('app')
      completeMe.insert('apple')
      completeMe.insert('applesauce')
      completeMe.insert('apply')

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      completeMe.select('ape');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      completeMe.select('apply');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])

      completeMe.select('apple');
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])
    })
  })

})
