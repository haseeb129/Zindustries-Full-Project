import React, { Component } from 'react'
import Slider from 'react-slick'
import { portfolioSlick2 } from '../../../page-demo/script'
import prod1 from '../../../Assets/images/products/prod1.jpg'
import prod2 from '../../../Assets/images/products/prod2.jpg'
import prod3 from '../../../Assets/images/products/prod3.jpg'
import prod4 from '../../../Assets/images/products/prod4.jpg'
import prod5 from '../../../Assets/images/products/prod5.jpg'
import { Link } from 'react-router-dom'
// const PortfolioList = [
//   {
//     image: "image-1",
//     category: "Development",
//     title: " Getting tickets to the big show",
//   },
//   {
//     image: "image-2",
//     category: "Development",
//     title: " Getting tickets to the big show",
//   },
//   {
//     image: "image-3",
//     category: "Development",
//     title: " Getting tickets to the big show",
//   },
//   {
//     image: "image-4",
//     category: "Development",
//     title: " Getting tickets to the big show",
//   },
//   {
//     image: "image-3",
//     category: "Development",
//     title: " Getting tickets to the big show",
//   },
//   {
//     image: "image-4",
//     category: "Development",
//     title: " Getting tickets to the big show",
//   },
// ];
const Prodlist = [
  {
    image: prod1,
    title: ' UNRUH',
    description:
      'Storetech implemented a complex interface with advanced logic for their Garden Master shed products. The responsive user interface was designed by one of our partners.',
  },

  {
    image: prod2,
    title: 'MINISTRY OF SNUS',
    description:
      'Storetech implemented a complex interface with advanced logic for their Garden Master shed products. The responsive user interface was designed by one of our partners.',
  },

  {
    image: prod3,
    title: 'storetech',
    description:
      'Storetech implemented a complex interface with advanced logic for their Garden Master shed products. The responsive user interface was designed by one of our partners.',
  },
  {
    image: prod4,
    title: 'MUNSON',
    description:
      'Munson built a stylized configurator with a smooth interface and connected the orders directly with production data.',
  },

  {
    image: prod5,
    title: 'Model No',
    description:
      'Model No’s unique customization tools allow you to design in real time.Their 3d printed pieces have simple but elegant forms inspired by nature advanced they are built with sustainable materials.',
  },
  {
    image: prod1,
    title: 'Model No',
    description:
      'Model No’s unique customization tools allow you to design in real time.Their 3d printed pieces have simple but elegant forms inspired by nature advanced they are built with sustainable materials.',
  },
  {
    image: prod2,
    title: 'Model No',
    description:
      'Model No’s unique customization tools allow you to design in real time.Their 3d printed pieces have simple but elegant forms inspired by nature advanced they are built with sustainable materials.',
  },
]

class Portfolio extends Component {
  render() {
    let title = 'Our Works',
      description =
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.'
    return (
      <React.Fragment>
        <div className="portfolio-wrapper">
          {/* <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="section-title">
                                    <h2>{title}</h2>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
          <div className="portfolio-slick-activation mt--70 mt_sm--40">
            <Slider {...portfolioSlick2}>
              {Prodlist.map((value, index) => (
                <div className="portfolio" key={index}>
                  <div className="thumbnail-inner">
                    <img src={value.image} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Portfolio
