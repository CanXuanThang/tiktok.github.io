import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modals.module.scss';
import { Modal } from '~/components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import firebase, { auth } from '~/firebase/firebase';

const cx = classNames.bind(styles);

const fbProvider = new firebase.auth.FacebookAuthProvider();

function Modals({ title, css }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleFbLogin = () => {
        const user = auth.signInWithPopup(fbProvider);
        console.log({ user });
    };
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className={cx('wrapper1')}>
            <Button className={cx(css)} primary onClick={openModal}>
                {title}
            </Button>
            <>
                <Modal isOpen={modalIsOpen}>
                    <button onClick={closeModal} className={cx('close-btn')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h2 className={cx('login-header')}>Đăng nhập vào Tiktok</h2>
                    <form>
                        <div className={cx('container')} onClick={handleFbLogin}>
                            <FontAwesomeIcon icon={faFacebook} className={cx('icon-login')} />
                            <span className={cx('header-login')}>Log in with Facebook</span>
                        </div>
                    </form>
                </Modal>
            </>
        </div>
    );
}

export default Modals;
