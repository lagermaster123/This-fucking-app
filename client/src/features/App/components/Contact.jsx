import React from 'react'
import styled from 'styled-components'

const Contact = () => {
    return(
        <ContactStyles>
        <div id='contact'>
            <div className="contactBody">
                <div className="spacer"></div>
                <h1>Contact</h1>
                <form action="/contact" method='POST' id="contactForm">
                    <div className="form">
                        <div className="name">
                            <input type="text" name='email' id='email' placeholder='Email' size="80" />
                        </div>
                        <div className="subject">
                            <input type="text" name='subject' id='subject' placeholder='Subject' size="80" />
                        </div>
                        <textarea id="message" name="message" rows="4" cols="79.1" placeholder='Message'></textarea>
                        <button className="btn-primary send">Send</button>
                    </div>
                </form>
            </div>
        </div>
        </ContactStyles>
    );
}

export default Contact;

const ContactStyles = styled.div`
    #contact {
        background-color: white;
        padding: 4em;
    .contactBody {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
        background-color: white;
    }
    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .name {
        margin: .5em 1em;
        .nameInput {
            margin: 0 auto;
        }
    }
    #subject, #message, textarea {
        margin: .5em;
    }
    .send {
        width: 5em;
        height: 2em;
        border-radius: 1em;
        margin-left: auto;
        margin-right: 1em;
    }
    input, textarea {
        width: 60vw;
        border: 1px solid black;
        border-radius: 1em;
        padding: 1em;
    }
}
`