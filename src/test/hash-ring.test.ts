
import HashRing from '../lib/hash-ring'

describe('hash-ring', function(){
    const hashRing = new HashRing();
    it('can add node', function(){
        hashRing.addNode('node1')
        console.log(hashRing.nodes)
        hashRing.addNode('node2')
        console.log(hashRing.nodes)
        return true
    })

    it('can update node', function(){
        hashRing.addNode('node2', 10);
        console.log(hashRing.nodes)
        return true
    })

    it('can remove node', function(){
        hashRing.removeNode('node1');
        console.log(hashRing.nodes)
        return hashRing.getNode('a').startsWith('node2')
    })
})