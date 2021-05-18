DFS for Graphs
======

# Cycle Detection Bluerprint
Track 3 states: ToVisit, Visiting, Visited
[reference](https://www.geeksforgeeks.org/detect-cycle-direct-graph-using-colors/)

**ToVisit** : Vertex is not processed yet. Initially, all vertices are WHITE.
**Visiting**: Vertex is being processed (DFS for this vertex has started, but not finished which means that all descendants (in DFS tree) of this vertex are not processed yet (or this vertex is in the function call stack)
**Visited** : Vertex and all its descendants are processed. While doing DFS, if an edge is encountered from current vertex to a GRAY vertex, then this edge is back edge and hence there is a cycle.

```
construct graph
construct visited data store, initialize all to 'ToVisit' status
loop over nodes
  if visited - skip -- already processed
  DFS method: DFS(nodeValue, graph, visited): boolean
    mark current node as 'Visiting'
    loop over neighbors
      if neighbor is 'Visiting' -- cycle found return true
      if recursive call DFS() == true -- cycle found return true

    mark current node as 'Visited'
    return false -- no cycle found
```