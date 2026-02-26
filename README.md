# Hash Ring

一致性哈希（Consistent Hashing）的 TypeScript 实现，支持虚拟节点和节点权重。

## 特性

- 基于 HMAC-SHA256 的哈希映射
- 虚拟节点（Virtual Nodes）支持，默认每个节点 10 个虚拟节点
- 节点权重（Weight）支持，按权重分配虚拟节点数量
- 动态增删和更新节点

## 安装

```bash
npm install
npm install -g typescript mocha ts-node tslint
```

## 使用

```typescript
import HashRing from './lib/hash-ring'

const ring = new HashRing(10); // 每个节点 10 个虚拟节点

// 添加节点（默认权重为 1）
ring.addNode('server-A');
ring.addNode('server-B', 2); // 权重为 2，分配更多虚拟节点

// 根据 key 获取对应节点
const node = ring.getNode('user:1001');

// 更新节点权重
ring.updateNode('server-A', 3);

// 移除节点
ring.removeNode('server-B');
```

## API

### `new HashRing(virtualSpots?: number)`

创建哈希环实例。`virtualSpots` 为每个节点的虚拟节点基数，默认 `10`。

### `addNode(nameKey: string, weight?: number)`

添加节点到哈希环。`weight` 默认为 `1`，权重越大分配的虚拟节点越多。

### `updateNode(nameKey: string, weight: number)`

更新已有节点的权重。

### `removeNode(nameKey: string)`

从哈希环中移除节点。

### `getNode(key: string): string`

根据 key 获取其映射到的节点名称。返回格式为 `节点名:虚拟节点编号`。

## 开发

```bash
# 运行测试
npm test

# 类型检查
npx tsc --noEmit

# 构建
npx tsc

# 代码检查
npx tslint -c tslint.json 'src/**/*.ts'
```

## 项目结构

```
src/
├── lib/
│   ├── hash-ring.ts      # HashRing 主类
│   ├── virtual-node.ts   # VirtualNode 虚拟节点类
│   └── node-weight.ts    # NodeWeights 权重字典类型
└── test/
    └── hash-ring.test.ts # 测试用例
```

## 参考

- [一致性哈希算法](https://segmentfault.com/a/1190000013533592)
- [Consistent Hashing - Wikipedia](https://en.wikipedia.org/wiki/Consistent_hashing)
