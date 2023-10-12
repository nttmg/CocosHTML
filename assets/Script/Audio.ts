import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Audio')
export class Audio extends Component {
    @property(AudioClip)
    public clips: AudioClip[] = [];

    @property(AudioSource)
    public source: AudioSource = null;

    onAudioQueue(index: number) {
        let clip: AudioClip = this.clips[index];

        this.source.playOneShot(clip);
    }
}


