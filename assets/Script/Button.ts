import { _decorator, Component, Node, Sprite } from 'cc';
import { GameCtrl } from './GameCtrl';
import { Audio } from './Audio';
const { ccclass, property } = _decorator;

@ccclass('Button')
export class Button extends Component {

    @property(Sprite)
    spriteToShow: Sprite = null;

   @property(Audio)
    public clip: Audio;

    
    onLoad() {
        this.spriteToShow.node.active = false;

        this.node.on(Node.EventType.TOUCH_END, this.onButtonClick, this);
    }

    onButtonClick() {
        this.clip.onAudioQueue(2);
        this.spriteToShow.node.active = true;
        this.scheduleOnce(() => {
            this.spriteToShow.node.active = false;
        }, 0.5);
    }
}


