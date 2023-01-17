import React from "react"

function Node(nodeobj) {
  this.id = nodeobj.id
  if('variable' in nodeobj) {
    this.variable = nodeobj.variable
    this.condition = nodeobj.condition
  } else {
    this.conjunction = nodeobj.conjunction
  }

  this.incoming = []
  this.outgoing = null
  this.setout = function(node) {
    this.outgoing = node
    node.incoming.push(this)
  }

  this.maxdepth = function() {
    if(this.incoming.length > 0) {
      this.depth = this.incoming.map((node) => node.maxdepth())
      this.mdepth = Math.max.apply(Math, this.depth)
      return this.mdepth+1 
    }
    return 1
  }
}

function CEG(cegobj) {
  this.nodes = cegobj.nodes.map((node) => new Node(node))
  this.getnode = function(id) {
    return this.nodes.find(node => node.id === id)
  }

  this.root = this.getnode(cegobj.root)
  cegobj.edges.map((edge) => this.getnode(edge.origin).setout(this.getnode(edge.target)))

  this.effects = this.nodes.filter((node) => node.outgoing === null)

  this.width = function() {
    this.maxwidth = this.effects.length

    // calculate the width of each level of the cause tree
    this.causesatlevel = [this.root]
    while(this.causesatlevel.length > 0) {
      if(this.causesatlevel.length > this.maxwidth) {
        this.maxwidth = this.causesatlevel.length
      }
      this.causesatdeeperlevel = []
      this.causesatlevel.forEach((node) => {
        if(node.incoming.length > 0) {
          node.incoming.forEach((child) => {
            this.causesatdeeperlevel.push(child)
          })
        }
      })
      this.causesatlevel = this.causesatdeeperlevel
    }

    return this.maxwidth
  }
}

function CEGVisualizer({ ceg }) {
  let cegraph = new CEG(ceg)
  console.log(cegraph)
  console.log(cegraph.width())
  console.log(cegraph.root.maxdepth())

  return (
    <svg width="800" height="60">
      
    </svg>
  )
};

export default CEGVisualizer;
