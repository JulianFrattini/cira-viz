import React from "react"

import EventNode from "./components/eventnode"
import Junctor from "./components/junctor"

const nodewidth = 200
const nodeheight = 70

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

    this.getnodesatdepth = function(depth) {
      if(depth > 0) {
        let dnodes = []
        this.incoming.forEach((child) => {
          dnodes = dnodes.concat(child.getnodesatdepth(depth-1))
        })
        return dnodes
      } else {
        return [this]
      }
    }

    this.gety = function(y) {
      let positions = {}

      if (this.incoming.length === 0) {
        positions[this.id] = y
      } else {
        // determine the positions of all children
        let offset = 0
        this.incoming.forEach((child, index) => {
          let childpositions = child.gety(y+index+offset)
          offset = Math.max.apply(Math, Object.values(childpositions))-y-index
          positions = Object.assign(positions, childpositions)
        })

        // determine own position
        let childids = this.incoming.map((child) => child.id)
        let immediatechildpositions = Object.keys(positions).
          filter((key) => childids.includes(key)).
          reduce((cur, key) => {return Object.assign(cur, {[key]: positions[key]})}, {})
        let values = Object.values(immediatechildpositions)
        positions[this.id] = (Math.max.apply(Math, values)+Math.min.apply(Math, values))/2
      }

      return positions
    }

    this.getx = function(x) {
      let positions = {}

      if (this.incoming.length === 0) {
        positions[this.id] = x
      } else {
        // determine the positions of all children
        this.incoming.forEach((child) => {
          let childpositions = child.getx(x-1)
          positions = Object.assign(positions, childpositions)
        })

        // determine own position
        positions[this.id] = x
      }
      
      return positions
    }
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

    this.effects = this.nodes.filter((node) => node.outgoing === null)
    this.causes = this.nodes.filter((node) => node.outgoing != null)
  }
}

function CEGVisualizer({ ceg }) {
  let cegraph = new CEG(ceg)
  /*console.log(cegraph)
  console.log(cegraph.width())
  console.log(cegraph.root.maxdepth())*/

  //console.log(cegraph.root.getnodesatdepth(2))

  const causeypos = cegraph.root.gety(0)
  const causexpos = cegraph.root.getx(cegraph.root.maxdepth()-1)
  
  const graphheight = Math.max.apply(Math, Object.values(causeypos))

  return (
    <svg width="800" height={10+(nodeheight+10)*(graphheight+1)}>
      {cegraph.causes.map((item, index) => {
        let nodex = 10+causexpos[item.id]*(nodewidth+30)
        let nodey = 10+causeypos[item.id]*(nodeheight+10)
        if(item.eventnode) {
          return <EventNode node={item} x={nodex} y={nodey}></EventNode>
        } else {
          return <Junctor node={item} x={nodex} y={nodey}></Junctor>
        }
      })}
      {cegraph.effects.map((item, index) => {
        let nodex = 10 + cegraph.root.maxdepth()*(nodewidth+30)
        let rooty = 10 + causeypos[cegraph.root.id]*(nodeheight+10)
        let nodeybase = rooty - ((cegraph.effects.length-1)/2)*(nodeheight+10)
        let nodey = nodeybase + index*(nodeheight+10)
        return <EventNode node={item} x={nodex} y={nodey}></EventNode>
      })}
    </svg>
  )
};

export default CEGVisualizer;
