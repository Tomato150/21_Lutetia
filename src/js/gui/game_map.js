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

    constructor(props) {
        super(props);
        this.state = {
            animationCallback: null,
            dragged: false,
            mouseInfo: {
                currentX: null,
                currentY: null
            }
        };
    }

    render() {
        const {width, height} = this.props;
        return <div ref="gameCanvas"/>
    }

    componentDidMount() {
        const {gameCanvas} = this.refs;

        this.canvas = gameCanvas;
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
        const {width, height, metadata} = this.props;
        this.renderer = PIXI.autoDetectRenderer(width, height);

        this.canvas.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();

        this.initializeStage();

        function makeNewSpriteTemplate(texture, name, parent) {
            return (function (x, y) {
                let sprite = new PIXI.Sprite(texture);
                sprite.interactive = true;
                sprite.on('click', () => {
                    if (!parent.state.dragged) {
                        console.log(name + " HIT AT (" + x + ", " + y + ')')
                    }
                });

                sprite.position.set(x*metadata['TILE SIZE'], y*metadata['TILE SIZE']);
                return sprite
            })
        }

        const {empty, size_1, size_3, size_5, asteroid_field} = this.loader.resources;

        const
            emptySpace = makeNewSpriteTemplate(
                empty.texture,
                "EMPTY SPACE",
                this
            ),
            size1Station = makeNewSpriteTemplate(
                size_1.texture,
                "SIZE 1 STATION"
            ),
            size3Station = makeNewSpriteTemplate(
                size_3.texture,
                "SIZE 3 STATION",
                this
            ),
            size5Station = makeNewSpriteTemplate(
                size_5.texture,
                "SIZE 5 STATION",
                this
            ),
            asteroidField = makeNewSpriteTemplate(
                asteroid_field.texture,
                "ASTEROID FIELD",
                this
            );

        this.gameSprites = {emptySpace, size1Station, size3Station, size5Station, asteroidField};

        this.drawStage();

        const animateCallback = function() {
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

    initializeStage() {
        this.stage.interactiveChildren = true;
        this.stage.interactive = true;

        this.stage
            .on('mousedown', event => {
                const {data} = event;
                this.setState({
                    down: true,
                    dragged: false,
                    mouseInfo: {
                        currentX: data.global.x,
                        currentY: data.global.y
                    }
                });
            })
            .on('mousemove', event => {
                const {data} = event;
                if (this.state.down) {
                    let {mouseInfo} = this.state;

                    let mouse_x = data.global.x,
                        mouse_y = data.global.y;

                    let adjusted_x = mouse_x - mouseInfo.currentX,
                        adjusted_y = mouse_y - mouseInfo.currentY;

                    let position = this.stage.position;
                    this.stage.position.set(position.x + adjusted_x, position.y + adjusted_y);

                    this.setState({
                        dragged: true,
                        mouseInfo: {
                            currentX: data.global.x,
                            currentY: data.global.y
                        }
                    });
                }
            })
            .on('mouseup', event => {
                this.setState({
                    down: false,
                    dragged: false
                });
            });
    }

    drawStage() {
        const {metadata, data} = this.props;

        for (let x=0; x < metadata['WORLD WIDTH']; x++) {
            for (let y=0; y < metadata['WORLD HEIGHT']; y++) {
                let tile = data[x][y];

                switch (tile) {
                    case (metadata['EMPTY SPACE']):
                        this.stage.addChild(this.gameSprites.emptySpace(x, y));
                        break;

                    case (metadata['SPACE STATION']):
                        if (
                            data[x-1][y] !== metadata['SPACE STATION'] &&
                            data[x][y-1] !== metadata['SPACE STATION']
                        ) {
                            if (data[x+1][y] !== metadata['SPACE STATION']) {
                                this.stage.addChild(this.gameSprites.size1Station(x, y));
                            }
                            else if (
                                data[x+2][y] === metadata['SPACE STATION'] &&
                                data[x+3][y] !== metadata['SPACE STATION']
                            ) {
                                this.stage.addChild(this.gameSprites.size3Station(x, y))
                            }
                            else {
                                this.stage.addChild(this.gameSprites.size5Station(x, y))
                            }
                        }
                        break;

                    case (metadata['ASTEROIDS']):
                        this.stage.addChild(this.gameSprites.asteroidField(x, y));
                        break;

                    default:
                        console.log("ERROR:", tile);
                }
            }
        }
    }

    gameLoop() {
        // Stick stuff here for game loop ticks
    }

    componentWillUnmount() {
        let {animationCallback} = this.state;
        if (animationCallback !== null) {
            cancelAnimationFrame(animationCallback)
        }
    }
}