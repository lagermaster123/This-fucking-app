import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Slider from '@mui/material/Slider';


//components
import CardComp from './components/CardComp'
import Showcase from './components/Showcase'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem';

//Actions
import { getProducts as listProducts } from '../../redux/actions/productActions'
import { getCategories as listCategories } from '../../redux/actions/productActions'
import PriceSlider from './components/PriceSlider';

const Shop = ({ checked, handleToggle, filters }) => {
    const dispatch = useDispatch()
    const getProducts = useSelector((state) => state.getProducts)
    const getCategories = useSelector((state) => state.getCategories)
    const { products, loading, error } = getProducts
    const { categories } = getCategories
    const [ anchorEl, setAnchorEl ] = useState(null)
    const filterOpen = Boolean(anchorEl)
    // const [ sortAnchorEl, setSortAnchorEl ] = useState(null)
    // const sortOpen = Boolean(sortAnchorEl)
    const [ value, setValue ] = useState([0,100])
    const handlePrice = (event, newValue) => {
        setValue(newValue)
    }
    const handleFilter = (event) => {
        setAnchorEl(event.currentTarget);
    }
    // const handleSort = (event) => {
    //     setSortAnchorEl(event.currentTarget);
    // }
    const handleClose = () => {
        // setSortAnchorEl(null)
        setAnchorEl(null)
    }

    useEffect(() => {
        dispatch(listProducts({ filters: filters }))
    }, [])

    return(
        <ShopStyles>
            <Showcase />
            <Box sx={{p: {xs: '0', md: '2em'}, display: 'flex', flexDirection: {xs: 'column', md: 'row'}, backgroundColor: 'transparent', width: '100%'}}>
                <ul className="filters">
                    {categories.map((cat, i) => {
                        return (
                            <li key={i} className="categories">
                                <input 
                                type="checkbox"
                                id={cat._id}
                                checked={ checked.indexOf(cat._id) === -1 ? false : true } 
                                onChange={() => handleToggle(cat._id, 'categories')}
                                />
                                <label htmlFor={cat._id}>{cat.name}</label>
                            </li>
                        )
                    })}
                    <PriceSlider handlePrice={handlePrice} handleToggle={handleToggle} value={value}/>
                </ul>
                <Box sx={{ p: '1em', display: {xs: 'flex', md: 'none' }, justifyContent: 'space-between'}}>
                    <div className="filter">
                        <Chip 
                            id="filter-button"
                            label="Filters" 
                            color='primary' 
                            onClick={handleFilter}
                            aria-controls={filterOpen ? 'filter-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={filterOpen ? 'true' : undefined}
                        />
                        <Menu 
                            id='filter-menu'
                            anchorEl={anchorEl}
                            open={filterOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'filter-button'
                            }}>
                            {categories.map((cat, i) => {
                                return (
                                    <MenuItem key={i}>
                                        <input
                                        className='m-2 p-2'
                                        type="checkbox"
                                        id={cat._id}
                                        checked={ checked.indexOf(cat._id) === -1 ? false : true } 
                                        onChange={() => handleToggle(cat._id, 'categories')}
                                        />
                                        <label htmlFor={cat._id}>{cat.name}</label>
                                    </MenuItem>
                                )
                            })}
                            <PriceSlider handlePrice={handlePrice} handleToggle={handleToggle} value={value} />
                        </Menu>
                    </div>
                    {/* <div className="sort">
                        <Chip 
                            id="sort-button"
                            label="Sort" 
                            color='primary' 
                            onClick={handleSort}
                            aria-controls={sortOpen ? 'sort-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={sortOpen ? 'true' : undefined}/>
                        <Menu 
                            id='sort-menu'
                            anchorEl={sortAnchorEl}
                            open={sortOpen}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'sort-button'
                            }}>
                            <MenuItem>Price low-high</MenuItem>
                            <MenuItem>Price high-low</MenuItem>
                        </Menu>
                    </div> */}
                </Box>
                <Box sx={{ 
                        borderRadius: '1em', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        width: {xs: '100%', md: '80vw'},
                        p: {xs: '0', md: '2em'}}}>
                    <div className="products">
                        {loading 
                        ? <h2>loading...</h2> 
                        : error ? <h2>{error}</h2> 
                        : products.map((product, i) => (
                            <CardComp
                                key={i}
                                product={product}
                            />
                        ))}
                    </div>
                </Box>
            </Box>
        </ShopStyles>
    );
}

export default Shop

const ShopStyles = styled.div`
    .filters {
        border-radius: 1em;
        margin-right: .5em;
        padding: 1em;
        background-color: white;
        width: 20vw;
        height: 50vh;
        flex-direction: column;
        .catLabel {
            font-weight: bold;
        }
        .categories {
            padding: 0;
            label {
                padding: .15em 1em;
            }
        }
    }
    .products {
        display: grid;
        grid-template-rows: auto;
    }
        
}
@media (min-width: 768px) {
    .products {
        grid-template-columns: 33% 33% 33%;
    }
}
@media (max-width: 768px) {
    overflow-x: hidden;
    .products {
        grid-template-columns: 50% 50%;
    }
    .filters {
        display: none;
    }
`