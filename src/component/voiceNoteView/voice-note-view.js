import React, { Fragment } from 'react'
import PlayIcon from '../../assets/images/filed-play-icon-purple.svg';
import './voice-note-view.scss'
const VoiceNoteView = (props) => {
    return (
        <Fragment>
            <div className="userlist__main__row">
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
            </div>
            <div className="row row--lg separator-menuhome"></div>
        </Fragment> 
    )
}

export default VoiceNoteView