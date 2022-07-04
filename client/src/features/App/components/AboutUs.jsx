import React from 'react'
import styled from 'styled-components'

const AboutUs = () => {
    return(
        <AboutStyles>
            <div className="about">
                <div className="responsive">
                <div className="content">
                    <div id="aboutText">
                        <h2>About</h2>
                        <p>We are the place where flowers are uniquely designed and affordably priced.</p>
                        <p>We're a local Tamarac, FL florist with a lovely variety of fresh flowers and creative gift ideas to suit any style or budget. It is our pleasure to assist you with any local, as well as worldwide deliveries. We welcome all corporate accounts. For your convenience, we also offer daily floral delivery to local funeral homes and hospitals.</p>
                        <p className='not-essential'><span className='b'>Gift Ideas for All Seasons & All Reasons</span> ~ Shop from our green plants, blooming plants and dish gardens for a gift that is long lasting and adds life to any room or office. We also offer a variety of other choices such as fruit baskets, gourmet snack baskets, gift baskets, baby items, candy, chocolates, greeting cards, home décor, candles, silk flower arrangements, stuffed animals, balloons and more!</p>
                        <p className='not-essential'><span className='b'>Custom Wedding & Event Flowers </span>~ We would love to help you start planning the flowers for your dream wedding or any special event – large or small. Our talented designers create bouquets, flower arrangements and on-site decorating with each client's individual style and budget in mind.</p>
                        <p className='not-essential'><span className='b'>Sympathy Arrangements & Funeral Flowers </span>~ Remember, you can always depend on us when you need to send flowers for the funeral of a friend or loved one. We will design and deliver a funeral arrangement that thoughtfully conveys your heartfelt condolences.</p>
                    </div>
                </div>
                <img src="/images/irena-carpaccio-8lwTpNYS6Rg-unsplash.jpeg" alt="" id="aboutImg" />
                <div className="mobile">
                    <img src="/images/irena-carpaccio-8lwTpNYS6Rg-unsplash.jpeg" alt="" id="mobileImg" />
                </div>
                </div>
                <div className="svgTriangles">
                    <svg id="topTriangle" xmlns="http://www.w3.org/2000/svg" width="3568.156" height="297.033" viewBox="0 40 4130 297.033">
                        <path id="Path_1" data-name="Path 1" d="M-118.348,2360l3568.156,284.068V2347.035Z" transform="translate(118.348 -2347.035)" fill="#fff"/>
                    </svg>
                    <svg id="bottomTriangle" width="3542.96" height="410" viewBox="20 20 4010 35">
                        <path id="Path_2" data-name="Path 2" d="M3778.278,284.068,240.01-.756l5.231,299.694Z" transform="matrix(1, 0.017, -0.017, 1, -234.756, -3.433)" fill="#fff"/>
                    </svg>
                </div>
            </div>
        </AboutStyles>
    )
}

export default AboutUs

const AboutStyles = styled.div`
    .about {
        overflow: hidden;
        .responsive {
            display: flex;
            .content {
                display: flex;
                padding: 2em;
                background-color: #283a60;
                opacity: 82%;
                position: absolute;
                z-index: 2;
                color: white;
            }
            #aboutImg {
                border: 20px solid white;
                right: 10em;
                top: 120vh;
                position: absolute;
                z-index: 2;
                width: 25vw;
            }
            .svgTriangles {
                path {
                    fill: white;
                }
                #topTriangle {
                    position: relative;
                    top: -150px;
                }
                #bottomTriangle {
                    position: relative;
                    left: -150px;
                    bottom: 30rem;
                    z-index: -1;
                }
            }
        }
    }
    @media (min-width: 768px) {
        .content {
            width: 60vw;
        }
        #mobileImg {
            display: none;
        }
    }
    @media (max-width: 768px) {
        #topTriangle {
            display: none;
        }
        .not-essential {
            display: none;
        }
        .content {
            width: 100vw;
        }
        .about {
            flex-direction: column;
            background-color: white;
        }
        #aboutImg {
            display: none;
        }
        .mobile {
            height: 40vh;
            #mobileImg {
                display: block;
                object-fit: cover;
                height: 100vh;
            }
        }
    }
`