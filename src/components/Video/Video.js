import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faHeart,
    faPause,
    faPlay,
    faShare,
    faVolumeMute,
    faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import UseOnScreen from '~/hooks/useOnScreen';

const cx = classNames.bind(styles);

function Video({ data }) {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [like, setLike] = useState('unlike');
    const [plus, setPlus] = useState(0);

    const handleVideo = () => {
        if (playing === true) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    const handleMute = () => {
        if (isMuted === true) {
            setIsMuted(false);
        } else {
            setIsMuted(true);
        }
    };

    const handleLike = () => {
        if (like === 'unlike') {
            setLike('like');
            setPlus(1);
        } else {
            setLike('unlike');
            setPlus(0);
        }
    };

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7,
    };
    const isVisibile = UseOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisibile) {
            if (playing === false) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing === true) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    return (
        <div className={cx('container-video')}>
            <video
                ref={videoRef}
                className={cx('video')}
                src={data.popular_video.file_url}
                loop
                poster={data.popular_video.thumb_url}
                preload="auto"
                muted={isMuted}
            />
            <div className={cx('btn-handle--video')}>
                {playing ? (
                    <FontAwesomeIcon icon={faPause} onClick={handleVideo} />
                ) : (
                    <FontAwesomeIcon icon={faPlay} onClick={handleVideo} />
                )}
                {isMuted === true ? (
                    <FontAwesomeIcon icon={faVolumeMute} onClick={handleMute} />
                ) : (
                    <FontAwesomeIcon icon={faVolumeUp} onClick={handleMute} />
                )}
            </div>
            <div className={cx('action-icon')}>
                <p className={cx('action')}>
                    <div>
                        <FontAwesomeIcon className={cx('icon', like)} icon={faHeart} onClick={handleLike} />
                    </div>
                    <span>{data.popular_video.likes_count + plus}</span>
                </p>
                <p className={cx('action')}>
                    <div>
                        <FontAwesomeIcon className={cx('icon')} icon={faCommentDots} />
                    </div>
                    <span>{data.popular_video.comments_count}</span>
                </p>
                <p className={cx('action')}>
                    <div>
                        <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                    </div>
                    <span className={cx('count')}>{data.popular_video.shares_count}</span>
                </p>
            </div>
        </div>
    );
}

export default Video;
