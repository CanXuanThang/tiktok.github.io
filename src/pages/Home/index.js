import { useEffect, useRef, useState } from 'react';
import * as userService from '~/services/userService';
import Author from './Author';

const INIT_PAGE = 1;
const PER_PAGE = 5;

function Home() {
    const listInnerRef = useRef();
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => setSuggestedUsers((prev) => [...prev, ...data]))
            .catch((err) => console.log(err));
    }, [page]);

    function handleViewChange() {
        if (this.scrollY > 2000 * page) {
            setPage(page + 1);
        }
    }
    window.addEventListener('scroll', handleViewChange);

    return (
        <div>
            <Author data={suggestedUsers} onViewChange={handleViewChange} ref={listInnerRef} />
        </div>
    );
}

export default Home;
