import React from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { MdModeEdit } from 'react-icons/md'
import { BsTrashFill } from 'react-icons/bs'
import Chip from '@mui/material/Chip'

function Table({ columns, rows, complete, undo, deleteOrder, print }) {
  return (
    <Box sx={{
        width: '100%',
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1em 0'
    }}>
        <Box sx={{
            width: { md: '100%', xs: '40%'},
            padding: { md: '.5em 0', xs: '0' },
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid black'
        }}>
            { columns.map( col => {
                if (col.headerName) return (<Column key={col.headerName} style={columns.indexOf(col) === columns.length - 1 ? {} : {borderRight: '1px solid black'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span sx={{ fontSize: { xs: '10px' } }}>{col.headerName}</span>
                    <Box className='icon' sx={{ paddingLeft: '.2em', opacity: { xs: '100%', md: '0%' } }}><ArrowUpwardIcon style={{ padding: '.1em' }} /></Box>
                </Box>
            </Column>)
            })}
        </Box>
        {/* ********************************** ROWS ************************************ */}
        <Stack sx={{
            padding: '.5em',
            width: '100%'
        }}>
            {rows.map( (row, index) => (
                <Row key={index}>
                    <span className='row-item'>{row.dateCreated}</span>
                    <span className='row-item'>{row.customer}</span>
                    <Stack sx={{display: 'flex', flexDirection: 'column'}} className="row-item">
                        {row.items.map( (item, index) => (
                            <div key={index} className="item">
                                <span>{item.qty} x {item.title} ({item.quality.toUpperCase().slice(0,1)})</span>
                                <Chip 
                                    sx={{ marginLeft: '1em' }} 
                                    label={item.status === 'completed' ? 'Undo' 
                                    : item.method === 'pickup' ? 'Complete' : 'Print'} 
                                    variant='outlined' 
                                    color='primary' 
                                    onClick={() => item.status === 'completed' || item.status === 'refunded' ? undo(row, item) 
                                    : item.method === 'pickup' ? complete(row, item) : print(item)}
                                />
                            </div>
                        ))}
                    </Stack>
                    <span className='row-item'>${row.amount}</span>
                    <div className="row-item">
                        <MdModeEdit size={'1.5em'} />
                        <BsTrashFill style={{ marginLeft: '1em' }} size={'1.5em'} onClick={() => deleteOrder(row)}/>
                    </div>
                </Row>
            ))}
        </Stack>
    </Box>
  )
}

export default Table

const Column = styled.div`
    width: 100%;
    height: 4em;
    padding: .25em;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: rgb(128, 128, 128, .25);
        cursor: pointer;
        .icon {
            opacity: 100%;
            transition: opacity .1s;
        }
    }
`

const Row = styled.div`
    margin: .5em;
    background-color: #88ffcbad;
    color: black;
    border-radius: 1em;
    min-height: 5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    text-align: center;
    .row-item {
        width: 20%;
    }
`