import React from "react"

import EventNode from "./components/eventnode"
import Junctor from "./components/junctor"
import CEGEdge from "./components/edge"

const nodewidth = 200
const nodeheight = 70
const nodexbuffer = 50
const nodeybuffer = 10

class Node {
  constructor(nodeobj) {
    this.id = nodeobj.id
    if ('variable' in nodeobj) {
      this.variable = nodeobj.variable
      this.condition = nodeobj.condition
      this.eventnode = true
    } else {
      this.conjunction = nodeobj.conjunction
      this.eventnode = false
    }

    this.incoming = []
    this.outgoing = null
    this.setout = function (node) {
      this.outgoing = node
      node.incoming.push(this)
    }

    this.maxdepth = function () {
      if (this.incoming.length > 0) {
        this.depth = this.incoming.map((node) => node.maxdepth())
        this.mdepth = Math.max.apply(Math, this.depth)
        return this.mdepth + 1
      }
      return 1
    }

    this.getnodesatdepth = function (depth) {
      if (depth > 0) {
        let dnodes = []
        this.incoming.forEach((child) => {
          dnodes = dnodes.concat(child.getnodesatdepth(depth - 1))
        })
        return dnodes
      } else {
        return [this]
      }
    }

    this.gety = function (y) {
      let positions = {}

      if (this.incoming.length === 0) {
        positions[this.id] = y
      } else {
        // determine the positions of all children
        let offset = 0
        this.incoming.forEach((child, index) => {
          let childpositions = child.gety(y + index + offset)
          offset = Math.max.apply(Math, Object.values(childpositions)) - y - index
          positions = Object.assign(positions, childpositions)
        })

        // determine own position
        let childids = this.incoming.map((child) => child.id)
        let immediatechildpositions = Object.keys(positions).
          filter((key) => childids.includes(key)).
          reduce((cur, key) => { return Object.assign(cur, { [key]: positions[key] }) }, {})
        let values = Object.values(immediatechildpositions)
        positions[this.id] = (Math.max.apply(Math, values) + Math.min.apply(Math, values)) / 2
      }

      return positions
    }

    this.getx = function (x) {
      let positions = {}

      if (this.incoming.length === 0) {
        positions[this.id] = x
      } else {
        // determine the positions of all children
        this.incoming.forEach((child) => {
          let childpositions = child.getx(x - 1)
          positions = Object.assign(positions, childpositions)
        })

        // determine own position
        positions[this.id] = x
      }

      return positions
    }
  }
}

class Edge {
  constructor(edge) {
    this.origin = edge.origin
    this.target = edge.target
    this.negated = edge.negated
  }
}

class CEG {
  constructor(cegobj) {
    this.nodes = cegobj.nodes.map((node) => new Node(node))
    this.getnode = function (id) {
      return this.nodes.find(node => node.id === id)
    }

    this.root = this.getnode(cegobj.root)
    cegobj.edges.map((edge) => this.getnode(edge.origin).setout(this.getnode(edge.target)))

    this.edges = cegobj.edges.map((edge) => new Edge(edge))

    this.effects = this.nodes.filter((node) => node.outgoing === null)
    this.causes = this.nodes.filter((node) => node.outgoing != null)
  }
}

const convertpositionx = function (x) {
  let nodex = 10 + x * (nodewidth + nodexbuffer) + nodewidth / 2
  return nodex
}

const convertpositiony = function (y) {
  let nodey = 10 + y * (nodeheight + nodeybuffer) + nodeheight / 2
  return nodey
}

function CEGVisualizer({ ceg }) {
  // parse the cause-effect graph
  let cegraph = new CEG(ceg)

  // determine the x and y positions of all nodes within the cause-tree
  const causexpos = cegraph.root.getx(cegraph.root.maxdepth() - 1)
  const causeypos = cegraph.root.gety(0)

  // convert the indices to real positions
  Object.keys(causexpos).forEach(function (key, index) {
    causexpos[key] = convertpositionx(causexpos[key])
  })
  Object.keys(causeypos).forEach(function (key, index) {
    causeypos[key] = convertpositiony(causeypos[key])
  })

  let nodex = Math.max.apply(Math, Object.values(causexpos)) + nodexbuffer + nodewidth

  // determine the x and y positions of all effects
  cegraph.effects.forEach((item, index) => {
    //let nodex = 10 + cegraph.root.maxdepth() * (nodewidth + 30) + (nodewidth / 2)

    // determine the y-position of the root node of the cause tree
    let rooty = causeypos[cegraph.root.id]
    // determine the y-position of the first effect, which is the top-most node
    let nodeybase = rooty - ((cegraph.effects.length - 1) / 2) * (nodeheight + 10)
    // determine the y-position of the current effect, which is located at a given index
    let nodey = nodeybase + index * (nodeheight + 10)

    causexpos[item.id] = nodex
    causeypos[item.id] = nodey
  })

  // calculate the width and height of the graph visualization
  const graphwidth = Math.max.apply(Math, Object.values(causexpos)) + nodewidth/2 + 10
  const graphheight = Math.max.apply(Math, Object.values(causeypos)) + nodeheight/2 + 10

  return (
    <svg width={graphwidth} height={graphheight}>

      {
        // render edges
        cegraph.edges.map((edge, index) => {
          const x1 = causexpos[edge.origin]
          const y1 = causeypos[edge.origin]
          const x2 = causexpos[edge.target]
          const y2 = causeypos[edge.target]

          let weight = 0
          if (cegraph.nodes.find((node) => node.id === edge.origin).eventnode &&
            !cegraph.nodes.find((node) => node.id === edge.target).eventnode) {
            weight = 1
          } else if (!cegraph.nodes.find((node) => node.id === edge.origin).eventnode &&
            cegraph.nodes.find((node) => node.id === edge.target).eventnode) {
            weight = 2
          } else if (cegraph.nodes.find((node) => node.id === edge.origin).eventnode &&
          cegraph.nodes.find((node) => node.id === edge.target).eventnode) {
            weight = 3
          }

          return <CEGEdge x1={x1} y1={y1} x2={x2} y2={y2} weight={weight} negated={edge.negated}></CEGEdge>
        })
      }

      {
        // render causes
        cegraph.nodes.map((item, index) => {
          // determine the position (center) of each node
          let nodex = causexpos[item.id]
          let nodey = causeypos[item.id]

          // render the nodes
          if (item.eventnode) {
            return <EventNode node={item} x={nodex} y={nodey}></EventNode>
          } else {
            return <Junctor node={item} x={nodex} y={nodey}></Junctor>
          }
        })}

    </svg>
  )
};

export default CEGVisualizer;
