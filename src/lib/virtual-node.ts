/**
 * @description 虚拟节点
 * @class VirtualNode
 */
export default class VirtualNode{
    /**
     * @description 节点名词
     * @type {string}
     * @memberof VirtualNode
     */
    nameKey: string;
    /**
     * @description 节点在环的位置
     * @type {number}
     * @memberof VirtualNode
     */
    spotValue: number;

    constructor(nameKey: string, spotValue: number){
        this.nameKey = nameKey
        this.spotValue = spotValue
    }
}