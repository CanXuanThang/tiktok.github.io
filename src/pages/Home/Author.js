import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import AccountItem from '~/components/SuggestedAccounts/AccountItem';
import Button from '~/components/Button';
import Video from '~/components/Video/Video';

const cx = classNames.bind(styles);

function Author({ data = [], onViewChange }) {
    return (
        <p className={cx('wrapper1')}>
            {data.map((account) => (
                <div key={account.id} className={cx('content')} onScroll={() => onViewChange()}>
                    <div className={cx('container')}>
                        <div>
                            <AccountItem
                                data={account}
                                label="home-account"
                                descriptions={account.popular_video.description}
                            />
                        </div>
                        <div className={cx('btn')}>
                            <Button outline small>
                                Follow
                            </Button>
                        </div>
                    </div>
                    <Video data={account} />
                </div>
            ))}
        </p>
    );
}

Author.propTypes = {
    data: PropTypes.array,
};

export default Author;
