import {createHmac} from 'crypto'
import VirtualNode from './virtual-node'
import NodeWeights from './node-weight'


/**
 * @description 哈希映射
 * @param {string} key
 * @return {number}
 */
function hash(key:string): number{
    const digest = createHmac('sha256', key).update(key).digest('hex');
    const digits = digest.substring(6,10);
    if(digits.length < 4){
        return 0
    }
    /* tslint:disable no-bitwise */
    return Number.parseInt(digits[0], 16) << 24
        |  Number.parseInt(digits[1], 16) << 16
        |  Number.parseInt(digits[2], 16) << 8
        |  Number.parseInt(digits[3], 16)
    /* tslint:enable */
}

/**
 * @description 哈希环
 * @export
 * @class HashRing
 */
export default class HashRing{
    // 虚拟节点
    nodes: VirtualNode[];
    // 权重
    weights: NodeWeights;
    // 每个节点的虚拟节点数
    virtualSpots: number;

    constructor(virtualSpots = 10){
        this.nodes = [];
        this.weights = {};
        this.virtualSpots = virtualSpots;
    }

    /**
     * @description 添加权重
     * @param {string} nameKey 节点名
     * @param {number} [weight=1] 权重
     * @memberof HashRing
     */
    addNode(nameKey: string, weight: number = 1){
        this.weights[nameKey] = weight;
        this.generate();
    }

    /**
     * @description 更新节点权重
     * @param {string} nameKey 节点名
     * @param {number} weight 权重
     * @memberof HashRing
     */
    updateNode(nameKey: string, weight: number){
        this.weights[nameKey] = weight;
        this.generate();
    }

    /**
     * @description 移除节点
     * @param {string} nameKey 节点名
     * @memberof HashRing
     */
    removeNode(nameKey: string){
        delete this.weights[nameKey];
        this.generate();
    }

    /**
     * @description 获取key对应的节点名词
     * @param {string} key
     * @return {string}
     * @memberof HashRing
     */
    getNode(key: string):string{
        if(this.nodes.length === 0){
            return ''
        }
        const spotValue = hash(key);
        const node = this.nodes.find(item=>item.spotValue >= spotValue) || this.nodes[0]
        return node.nameKey;
    }

    /**
     * @description 重新计算节点的spotValue值
     * @memberof HashRing
     */
    generate(){
        const totalWeight = Object.keys(this.weights).reduce((sum, key)=> sum + this.weights[key], 0);
        const totalSpots = Object.keys(this.weights).length * this.virtualSpots;
        this.nodes = [];
        Object.keys(this.weights).forEach(key=>{
            const weight = this.weights[key];
            const spots = Math.ceil(weight / totalWeight * totalSpots);
            for(let i = 1; i <= spots; i++){
                const nameKey = key + ':' + i;
                const spotValue = hash(nameKey);
                this.nodes.push(new VirtualNode(nameKey, spotValue));
            }
        })
        this.nodes.sort((a,b)=>{
            return a.spotValue - b.spotValue
        });
    }
}
