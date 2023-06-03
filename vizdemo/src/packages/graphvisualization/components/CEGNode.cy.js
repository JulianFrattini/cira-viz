import React from 'react'
import CEGNode from './CEGNode'

import { DataNode } from '../util/DataNode'

describe('Event Node', () => {
  it('renders', () => {
    let nodedata = new DataNode({
      "id": "N1",
      "variable": "an error",
      "condition": "is present"
    })

    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <svg width={400} height={400}>
        <CEGNode node={nodedata} x={100} y={100} />
      </svg>
    )

    cy.get('#variable').should('contain', 'an error')
    cy.get('#condition').should('contain', 'is present')
  })
})