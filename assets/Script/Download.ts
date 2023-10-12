import { _decorator, Button, Component, Node, Sprite, sys } from 'cc';
import { NewSlice } from './NewSlice';
import { GameCtrl } from './GameCtrl';
import { Audio } from './Audio';
const { ccclass, property } = _decorator;

@ccclass('Download')
export class Download extends Component {
    
    @property(Audio)
    public clip: Audio;

    onLoad() {
        this.node.active =false;
        
        this.node.on(Button.EventType.CLICK, () => {
            this.clip.onAudioQueue(2);

            sys.openURL('https://play.google.com/store/games?device=windows')
        }, this)

    }


    
}


