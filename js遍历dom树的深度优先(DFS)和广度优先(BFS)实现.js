//用dfs和bfs算法分别实现遍历以下dom树：
/*<div class="root">
<div class="container">
  <section class="sidebar">
    <ul class="menu">
      <li class="item-1"></li>
      <li class="item-1">
        <a class="link"></a>
      </li>
    </ul>
  </section>
  <section class="main">
    <article class="post"></article>
    <p class="copyright"></p>
  </section>
</div>
</div>*/

// 广度优先搜索算法遍历（Breadth-First-Search），从树的根节点开始一层一层往下遍历，用队列的数据结构配合实现（先进先出）：
function bfsTraversal(nodeRoot) {
    if (!nodeRoot) {
        throw new Eroor("node root is undefined")
    }
    const queue = [nodeRoot]
    const result = []

    while (queue.length) {
        const node = queue.shift()
        result.push(node)
        if (!node.children.length) {
            continue
        }
        Array.from(node.children).map(node => queue.push(node))
    }
    return result
}
bfsTraversal(document.querySelector('.root')).map(item => {
    console.log(item.nodeName, item.className)
})

// 深度优先算法（Depth-First-Search），从根节点开始往下搜索，尽可能深的遍历树，直到没有子节点，开始返回到上层节点继续往下搜索。可以用栈的数据结构（后进先出）实现，也可以用递归的方式实现
function dfsTraversal(node) {
    const nodeList = []
    const stack = []
    if (node) {
        stack.push(node)
        while (stack.length) {
            const currentNode = stack.pop()
            nodeList.push(currentNode)
            if (currentNode.children.length) {
                for (i = currentNode.children.length - 1; i >= 0; i--) {
                    stack.push(currentNode.children[i])
                }
            }
        }
    }
    return nodeList
}
dfsTraversal(document.querySelector('.root')).map(item => {
    console.log(item.nodeName, item.className)
})

/**也可以递归实现深度优先遍历 */
function dfsTraversal(node, nodeList = []) {
    nodeList.push(node)
    if (node.children.length > 0) {
        for (let item of node.children) {
            dfsTraversal(item, nodeList)
        }
    }
    return nodeList
}