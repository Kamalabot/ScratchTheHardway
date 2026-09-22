import Phaser from 'phaser';
import { WorkdayScene } from './workday_scenes.js';

const config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 900,
    backgroundColor: '#0B0F19',
    parent: 'app',
    scene: [WorkdayScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
