import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiFillDashboard } from 'react-icons/ai'
import { GiFlowerPot } from 'react-icons/gi'
import { FaBoxOpen, FaCashRegister } from 'react-icons/fa'
import { MdSettings } from 'react-icons/md'

const links = [
    {
        title: 'Overview',
        link: '/dashboard/',
        icon: <AiFillDashboard size={'1.5em'} />
    },
    {
        title: 'Products',
        link: '/dashboard/products',
        icon: <GiFlowerPot size={'1.5em'} />
    },
    {
        title: 'Orders',
        link: '/dashboard/orders',
        icon: <FaBoxOpen size={'1.5em'} />
    },
    {
        title: 'Register',
        link: '/dashboard/register',
        icon: <FaCashRegister size={'1.5em'} />
    },
    {
        title: 'Settings',
        link: '/dashboard/settings',
        icon: <MdSettings size={'1.5em'} />
    },
]

function Navigation() {
  return (
    <Style>
        {links.map( link => (
            <Link key={link.title} className="navLink" to={link.link}>
                {link.icon}
                <span>{link.title}</span>
            </Link>
        ))}
    </Style>
  )
}

export default Navigation

const Style = styled.div`
    height: 7vh;
    width: 100vw;
    background-color: grey;
    position: fixed;
    bottom: 0%;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .navLink {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: .8em;
        color: white;
        text-decoration: none;
        cursor: pointer;
        &:hover {
            background-color: #c9c9c9;
        }
    }
`