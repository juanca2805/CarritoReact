import React, { Component } from 'react'
import { Feed } from 'semantic-ui-react'
import { Card, Image, Label, Button } from 'semantic-ui-react'

function Cart(props){
  return(
    <Feed>
      <Feed.Event>
        <Feed.Label image={props.img} />
        <Feed.Content>
          <Feed.Date content={props.name} />
          <Feed.Summary>
            $ {props.total} ({props.order} productos) 
          </Feed.Summary>   
          <Card.Content extra>
        <Button.Group floated='right'>
          <Button
            compact
            onClick={props.onIncrementProduct}
            >+</Button>
          <Button
            compact
            onClick={props.onRemoveProduct}
            >-</Button>
        </Button.Group>
      </Card.Content>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

export default Cart;
