import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { NewSlice } from './NewSlice';
import { Button } from './Button';
import { Download } from './Download';
import { Audio } from './Audio';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property(NewSlice)
    public slice : NewSlice;

    @property(Button)
    public button: Button;

    @property(Download)
    public download: Download;

    @property(Sprite)
    public spriteFrame: Sprite;

    

    

    update(deltaTime: number) {
        if(this.slice.isChecked) {
            this.download.node.active = true;
            this.button.node.active = false;
            this.spriteFrame.node.active =true;
        } 

        
    }
}


