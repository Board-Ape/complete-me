import { expect } from 'chai'
import Node from '../scripts/Node.js'

describe ('Node', () => {
  let node;

  beforeEach( () => {
    node = new Node('pizza');
  })

  it.skip('should be a function', () => {
    expect(node).to.exist
  })

  it.skip('should start out with no letters', () => {
    expect(node.letters).to.equal(null)
  })

  it.skip('should not start out as a word', () => {
    expect(node.isWord).to.equal(false)
  })

  it.skip('shold have no children', () => {
    expect(node.children).to.deep.equal({})
  })

})
