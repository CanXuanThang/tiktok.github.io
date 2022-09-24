import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview/AccountPreview';

const cx = classNames.bind(styles);

function AccountItem({ data, label, descriptions, hidden }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data} />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <Tippy interactive delay={[1000, 0]} offset={[-20, 0]} render={renderPreview} placement="bottom">
            <div className={cx('account-item', label)}>
                <img className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div>
                    <div className={cx('item-info', label)}>
                        <p className={cx('nickname')}>
                            <strong>{data.nickname}</strong>
                            {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                        </p>
                        <p className={cx('name')}>{`${data.first_name} ${data.last_name}`}</p>
                    </div>
                    <span className={cx('description', hidden)}>{descriptions}</span>
                </div>
            </div>
        </Tippy>
    );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
