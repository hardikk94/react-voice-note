import React, { Fragment, useState } from 'react'
import PlayIcon from '../../assets/images/filed-play-icon-purple.svg';
import { CSSTransition } from 'react-transition-group'
import PlayerView from '../playerControl/player-control';
import './voice-note-view.scss'
const VoiceNoteView = (props) => {
    const [isPlaying, setIsPlaying] = useState(null)
    const togglePlayerHandler = () => {
        if (isPlaying && isPlaying?.id) {
            setIsPlaying(null)
        } else {
            setIsPlaying(props.notes)
        }
    }

    return (
        <Fragment>
            <div className="userlist__main__row" onClick={togglePlayerHandler}>
                <div className="row row__userlist">
                    <div className="userdetail__col__left">
                        <div className="userprofile__col">
                            <div className="pic">VN</div>
                        </div>
                    </div>
                    <div className="userdetail__col__right">
                        <div className="user__info__col">
                            <div className="username">{props.notes.note}</div>
                        </div>
                        <div className="play__btn__col__right">
                            <img
                                src={PlayIcon}
                                alt="menubarPlayPurpleIcon"
                            />
                        </div>
                    </div>
                </div>
                <div className="row row--lg separator-menuhome"></div>
                <div className="player-container">
                    <CSSTransition
                        in={isPlaying && isPlaying.id == props.notes.id}
                        timeout={450}
                        classNames="player-transition"
                        unmountOnExit
                    >
                        <div className="player-control-view">
                            <PlayerView
                                notes={props.notes}
                            />
                        </div>
                    </CSSTransition>
                </div>
            </div>
        </Fragment>
    )
}

export default VoiceNoteView