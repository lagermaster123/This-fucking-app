import React from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-bootstrap'

function Showcase() {
  return (
  <ShowcaseStyles>
    <Carousel className='carousel' fade>
      <Carousel.Item className='d-block w-100'>
        <img
         src="https://images.unsplash.com/photo-1568010967378-b92ea68220c5?ixlib=rb-1.2.1" 
         alt="" />
        <Carousel.Caption className='backboard'>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='d-block w-100'>
        <img 
          src="https://images.unsplash.com/photo-1587317997383-2e6c1b24040f?ixlib=rb-1.2.1"
          alt="" />
        <Carousel.Caption className='backboard'>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='d-block w-100'>
        <img
         src="https://images.unsplash.com/photo-1530906622963-8a60586a49c7?ixlib=rb-1.2.1"
         alt="" />
        <Carousel.Caption className='backboard'>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </ShowcaseStyles>
  )
}

export default Showcase

const ShowcaseStyles = styled.div`
    .carousel {
        border-bottom: 1em solid black;
        border-top: 1em solid black;
        .backboard {
            padding: .5em;
            background-color: rgba(0,0,0,.3);
            backdrop-filter: blur(5px);
        }
    }
    img {
        width: 100%;
        height: 50vh;
        object-fit: cover;
    }
`