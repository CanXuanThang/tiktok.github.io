import className from 'classnames/bind';
import styles from './Sidebar.module.scss';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    LiveIcon,
    UserGroupIcon,
    HomeActiveIcon,
    UserGroupActiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import { useEffect, useState } from 'react';
import * as userService from '~/services/userService';

const cx = className.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;

function SideBar() {
    const [page, setPage] = useState(INIT_PAGE);
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => setSuggestedUsers((prevUsers) => [...prevUsers, ...data]))
            .catch((err) => console.log(err));
    }, [page]);

    const handleViewChange = () => {
        setPage(page + 1);
    };

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={suggestedUsers} onViewChange={handleViewChange} />
            <SuggestedAccounts label="Following accounts" />
        </aside>
    );
}

export default SideBar;
