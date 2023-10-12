import { _decorator, Component, EventTouch, Graphics, Mask, Node, Rect, Sprite, SpriteFrame, UITransform, Vec2, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
import { Audio } from './Audio';
const { ccclass, property } = _decorator;

@ccclass('NewSlice')
export class NewSlice extends Component {

    @property({
        type: SpriteFrame,
        tooltip: 'Origin spriteframe'

    })
    public spriteFrameOrg: SpriteFrame;

    @property({
        type: Node,
        tooltip: 'Blank Block'
    })
    public blankBlock: Node;


    @property(Audio)
    public clip: Audio;

    

    public originPos: Vec3[] = [];
    public SliceImg : Node[] = [];
    public currentPos: Vec3[] = [];
    public sliceWidth: number = 60;
    public sliceheight: number = 85;

    public currentNode: Node;
    public index: number;

    public isAdjacentBoolean: boolean = false;

    public isCLicked: boolean = false;
    public isChecked: boolean = false;

    
    

    onLoad() {

        this.startUp();
        // this.startCheck();
        
        // this.isAdjacentBoolean = this.isAdjacent();
        this.move();
        console.log(this.currentPos);
        
        
    }

    move() {

        

        do {

            this.node.on(Node.EventType.TOUCH_START, (event) => {
            
                let touchLocation = event.getUILocation();
            
                this.getClickedNode(touchLocation);
                    
                
                
                if(this.isAdjacent(this.SliceImg[this.index], this.blankBlock)) {
            
                    
                    const tempPos = new Vec3(this.blankBlock.position);
                    
                    this.blankBlock.position = new Vec3(this.SliceImg[this.index].position);
                    
                    this.SliceImg[this.index].position = tempPos;
                    
                    this.clip.onAudioQueue(0);
                    
                    
                
                    
                    
                } else {
                    this.clip.onAudioQueue(1);
                }
                
                
                console.log(this.currentPos);
                console.log(this.originPos);
                
                

                this.checkResult(this.currentPos, this.originPos); 
                    
                    console.log(this.currentPos);
                    console.log(this.originPos);
                return this.isChecked;

            }, this.node);
        } while (this.isChecked);
    

    }


    startUp() {
        this.node.children.map(node => {
            this.originPos.push(node.getPosition());
            
        });

        this.SliceImg = this.node.children;
        let childrenWidth = this.SliceImg[0].getComponent(UITransform).width;
        let childrenHeight = this.SliceImg[0].getComponent(UITransform).height;

        let originalFrameRect = this.spriteFrameOrg.rect;
        let originTexture = this.spriteFrameOrg.texture;

        let sliceSpriteframe = [];
        

        
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const rect = new Rect(
                    originalFrameRect.x + j * childrenWidth,
                    originalFrameRect.y + i * childrenHeight,
                    childrenWidth,
                    childrenHeight
                    );
                    
                    let spriteFrame = new SpriteFrame;
                    spriteFrame.texture = originTexture;
                    spriteFrame.rect = rect
                    
                    sliceSpriteframe.push(spriteFrame);
                    
                }
            }
            
            
            
        
        

        
        let usedPositions = new Set();
        for(let i = 0; i < this.SliceImg.length; i++) {
            
            // set slice spriteframe
            let img = this.SliceImg[i].getComponent(Sprite);
            img.spriteFrame = sliceSpriteframe[i];

            // random
            let randomPos;
            do {
                randomPos = this.originPos[Math.floor(Math.random() * 9)]
            } while(usedPositions.has(randomPos));

            usedPositions.add(randomPos);

            this.SliceImg[i].position = randomPos

            this.currentPos.push(this.SliceImg[i].position)
            
            
        }
        

        let blank = this.blankBlock.getComponent(Sprite)
        blank.spriteFrame = null;

        

    }

    isAdjacent(node: Node, blankNode: Node) {
        let blankRect = blankNode.getComponent(UITransform).getBoundingBox();

        
            let nodeComponent = node.getComponent(UITransform);
            let nodeRect = nodeComponent.getBoundingBox();

            

            if(blankRect.intersects(nodeRect)) {
                let blankCenter = blankRect.center;
                let nodeCenter = nodeRect.center;

                let distance = Vec2.distance(nodeCenter, blankCenter);
                
                
                if(distance == this.sliceWidth || distance == this.sliceheight ) {

                    return this.isAdjacentBoolean = true

                    
                } else {
                    return this.isAdjacentBoolean = false;
                }
            
        }


    }

    getClickedNode(touchLocation) {
        
            
            for(let i= 0 ; i< this.SliceImg.length - 1; i++) {
                let childNode = this.SliceImg[i].getComponent(UITransform)
                let childRect = childNode.getBoundingBoxToWorld();
                
                
                if(childRect.contains(touchLocation)) {
                    this.index = i;
                    
                    return this.index;
                }
            }

            return this.index = 8;
    }

    checkResult(curArray: Vec3[], oriArray: Vec3[]) {

        
        this.isChecked = curArray.every((vec, i) => {
            return vec.equals(oriArray[i]);
            
        });
        console.log(this.isChecked)
        return this.isChecked;
        
        

        
    }
    



}


