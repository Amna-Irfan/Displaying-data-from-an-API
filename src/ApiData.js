import React, { useState, useEffect} from 'react';
import axios from "axios";
import ReactPaginate from 'react-paginate';
import './ApiData.css';

const ApiData = ({url}) => {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setIsError(false);
            setData(response.data)
        })
        .catch((error) => {
            setIsError(true);
            setError('Please Provide with Correct API!');
            setData([]);
        });
    }, [url]);

    const itemsPerPage = 10;
    const offset = currentPage * itemsPerPage;

    const filteredData = data.filter((post) => {
        const matchesSearchQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearchQuery;
    });
    console.log('Filtered Data:' + filteredData.length);

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    const handleSearchChange = (event) => {
        setCurrentPage(0);
        setSearchQuery(event.target.value);
    };

    const handleClick = (event) => {
        setCurrentPage(event.selected);
    };

    return (
    <div>
        <div className='top'>
            <h1>Posts</h1>
            <input type="text" placeholder="Search.." value={searchQuery} onChange={handleSearchChange}/>
        </div>
        {isError && 
            <div className='error'>
                <h3>{error}</h3>
            </div>
        }
        <ul>
            {filteredData.slice(offset, offset + itemsPerPage).map((post) => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                </li>
            ))}
        </ul>
        
        <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        onPageChange={handleClick}
        containerClassName={'pagination-container'}
        previousLinkClassName={'previous-link'}
        nextLinkClassName={'next-link'}
        disabledClassName={'pagination-disabled'}
        activeClassName={'pagination-active'}
        pageLinkClassName={'pagination-link'}
        forcePage={currentPage}
        />
    </div>
    );
}

export default ApiData;