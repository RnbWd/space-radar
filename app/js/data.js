/**
 * Process data
 */

let partition

function one() {
  return 1
}

function computeNodeCount(data) {
  console.time('computeNodeCount')
  partition
    .value(one)
    .nodes(data)
    .forEach(d => {
      d.count = d.value
    })

  console.timeEnd('computeNodeCount')
}

function computeNodeSize(data) {
  console.time('computeNodeSize')
  partition
    .value(d => d.size)
    .nodes(data)
    // .filter(function(d) {
    //   return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
    // })
    .forEach(function(d) {
      d._children = d.children // save before mutating
      d.sum = d.value
    })

  console.timeEnd('computeNodeSize')
}

function setNodeFilter(data) {
  const LEVELS = 11,
    HIDE_THRESHOLD = 0.1

  return partition.children(function(d, depth) {
    if (depth >= LEVELS) {
      return null
    }
    if (!d._children) return null

    const children = d._children.filter(c => c.sum / data.sum * 100 > HIDE_THRESHOLD)
    return children
    // return depth < LEVELS ? d._children : null;
  })
}

function namesort(a, b) {
  return d3.ascending(a.name, b.name)
}
function sizesort(a, b) {
  return d3.ascending(a.sum, b.sum)
}
function countsort(a, b) {
  return d3.ascending(a.count, b.count)
}
