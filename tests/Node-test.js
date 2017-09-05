import { expect } from 'chai'
import Node from '../scripts/Node.js'

describe ('Node', () => {

  let node;

  beforeEach( () => {
    node = new Node();
  })

  it('should be a function', () => {

    expect(node).to.be.a.function;
  })

  it('should have a children property that is an object', () => {

    expect(node.children).to.deep.equal( {});
  })

  it('should have a property of letter that defaults to null', () => {

    expect(node.letter).to.equal( null );
  })

  it('should have a property of isCompleteWord that defaults to false', () => {

    expect(node.isCompleteWord).to.equal( false );
  })

  it('should accept a parameter that is set to letter', () => {

    expect(node.letter).to.equal( null );

    let newNode = new Node('a')

    expect(newNode.letter).to.equal( 'a' );
  })
})
