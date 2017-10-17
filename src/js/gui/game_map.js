import React, {Component} from 'react';
import PropTypes from 'prop-types';

const PIXI = require('pixi.js');
import ReactPIXI from 'react-pixi';

import EmptyTile from '../../assets/empty.png';
import Size1Asteroid from '../../assets/size1.png';
import Size3Asteroid from '../../assets/size3.png';
import Size5Asteroid from '../../assets/size5.png';
import AsteroidField from '../../assets/asteroids.png';


export default class GameMap extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number
    };

    static defaultProps = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    constructor (props) {
        super(props);
        this.state = {
            animationCallback: null
        };
    }

    render() {
        const {width, height} = this.props;
        return <div ref="gameCanvas"/>
    }

    componentDidMount () {
        this.canvas = this.refs.gameCanvas;
        this.loader = new PIXI.loaders.Loader();
        this.loader
            .add('empty', EmptyTile)
            .add('size_1', Size1Asteroid)
            .add('size_3', Size3Asteroid)
            .add('size_5', Size5Asteroid)
            .add('asteroid_field', AsteroidField)
            .load(this.loaderInit.bind(this));
    }

    loaderInit () {
        const {width, height, data, metadata} = this.props;
        this.renderer = PIXI.autoDetectRenderer(width, height);

        this.canvas.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.stage.interactive = true;

        this.stage.interactiveChildren = true;

        function makeNewSpriteTemplate(texture, name) {
            return (function (x, y) {
                let sprite = new PIXI.Sprite(texture);
                sprite.interactive = true;
                sprite.on('mousedown', () => {
                    console.log(name + " HIT AT (" + x + ", " + y + ')')
                });

                sprite.position.set(x*metadata['TILE SIZE'], y*metadata['TILE SIZE']);
                return sprite
            })
        }


        console.log("STARTED MAKING RESOURCE FUNCTIONS");

        const
            emptySpace = makeNewSpriteTemplate(
                this.loader.resources.empty.texture,
                "EMPTY SPACE"
            ),
            size1Station = makeNewSpriteTemplate(
                this.loader.resources.size_1.texture,
                "SIZE 1 STATION"
            ),
            size3Station = makeNewSpriteTemplate(
                this.loader.resources.size_3.texture,
                "SIZE 3 STATION"
            ),
            size5Station = makeNewSpriteTemplate(
                this.loader.resources.size_5.texture,
                "SIZE 5 STATION"
            ),
            asteroidField = makeNewSpriteTemplate(
                this.loader.resources.asteroid_field.texture,
                "ASTEROID FIELD"
            );

        console.log("FINISHED MAKING RESOURCE FUNCTIONS, MAKING GAME TILES");

        console.log(data);
        for (let x=0; x < metadata['WORLD WIDTH']; x++) {
            for (let y=0; y < metadata['WORLD HEIGHT']; y++) {
                let tile = data[x][y];
                switch (tile) {
                    case (metadata['EMPTY SPACE']):
                        this.stage.addChild(emptySpace(x, y));
                        break;
                    case (metadata['SPACE STATION']):
                        if (
                            data[x-1][y] !== metadata['SPACE STATION'] &&
                            data[x][y-1] !== metadata['SPACE STATION']
                        ) {
                            if (data[x+1][y] !== metadata['SPACE STATION']) {
                                this.stage.addChild(size1Station(x, y));
                            }
                            else if (
                                data[x+2][y] === metadata['SPACE STATION'] &&
                                data[x+3][y] !== metadata['SPACE STATION']
                            ) {
                                this.stage.addChild(size3Station(x, y))
                            }
                            else {
                                this.stage.addChild(size5Station(x, y))
                            }
                        }
                        break;
                    case (metadata['ASTEROIDS']):
                        this.stage.addChild(asteroidField(x, y));
                        break;
                    default:
                        console.log("ERROR:", tile);
                }
            }
        }

        const animateCallback = function () {
            this.setState({
                animationCallback: requestAnimationFrame(animateCallback)
            });
            this.gameLoop();
            this.renderer.render(this.stage)
        }.bind(this);

        this.setState({
            animationCallback: requestAnimationFrame(animateCallback)
        });
    }

    gameLoop() {
        // Stick stuff here for game loop ticks
    }

    componentWillUnmount () {
        let {animationCallback} = this.state;
        if (animationCallback !== null) {
            cancelAnimationFrame(animationCallback)
        }
    }
}