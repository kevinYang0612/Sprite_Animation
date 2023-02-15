let playerState = "fall";
const dropdown = document.getElementById("animations"); // select tag in html
dropdown.addEventListener('change', function(e)
{
    playerState = e.target.value;  // value is option tag value
});
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575; // 6876 / 12
const spriteHeight = 523; // 5230 / 10

let gameFrame = 0;      // gameFrame increase forever
const staggerFrame = 5;   // staggerFrame number is where control the speed
const spriteAnimations = []; // main container to hold all data for all animations
/** spriteAnimation [idle: frames{ loc: [{x: 0, y: 0}, {x: 575, y: 0},...]
 * array in javascript is [index: element], index can be anything
 * idle is the index, frames object is the element, frames object is array,
 * each element in array is also an object is like {x: 0, y: 0}
 * */
const animationStates =
    [
        {
            name: 'idle',
            frames: 7
        },
        {
            name: 'jump',
            frames: 7
        },
        {
            name: 'fall',
            frames: 7
        },
        {
            name: 'run',
            frames: 9
        },
        {
            name: 'dizzy',
            frames: 11
        },
        {
            name: 'sit',
            frames: 5
        },
        {
            name: 'roll',
            frames: 7
        },
        {
            name: 'bite',
            frames: 7
        },
        {
            name: 'keep_off',
            frames: 12
        },
        {
            name: 'getHit',
            frames: 4
        }
    ];
// map will match docs sprite sheet
// state is what in the array state = { name: 'idle', frames: 7}, index is array's index
animationStates.forEach( (state, index) =>
{
    let frames = { loc: [] }
    /** loc Array
     * 0 : {x: 0, y: 0}
     * 1 : {x: 575, y: 0}
     * 2 : {x: 1150, y: 0}
     * 3 : {x: 1725, y: 0}
     * 4 : {x: 2300, y: 0}
     * 5 : {x: 2875, y: 0}
     * 6 : {x: 3450, y: 0}
     * */

    for (let j = 0; j < state.frames; j++)
    {
        let positionX = j * spriteWidth;  // j is accessing each state total frames
        let positionY = index * spriteHeight; // index is accessing which row currently on.
        frames.loc.push({x: positionX, y: positionY}); // push an object into loc array under frames object.
    }
    spriteAnimations[state.name] = frames; // filling the spriteAnimation array
});

console.log(spriteAnimations);
function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;

    /* gameFrame increases 5 times before the Math.floor is 1
     * position increase by 1 for every staggerFrame(5) loops, such as idle has 6 frames
     * 0 % 6 = 0; 1 % 6 = 1; 2 % 6 = 2; 3 % 6 = 3; 4 % 6 = 4; 5 % 6 = 5; 6 % 6 = 0; 7 % 6 = 1...
     * position is ensured cycling between 0 and current row's frame * */

    //['idle' : loc: [{x: 0, y: 0}, {x: 575, y: 0},...]], loc element is an array,
    // it returns how many column/frames in that row/state('idle')

    let frameX = spriteWidth * position; // frameX will be like 575 * 1, 575 * 2
    let frameY = spriteAnimations[playerState].loc[position].y;
    // spriteAnimations['idle'] is accessing the value of index 'idle', the value
    // is an object, we are accessing loc key to access the array,
    // provide at which column, accessing y, the where of the sprite height
    // frameY is essentially the complete calculated coordinate
    /**
     * drawImage(image, dx, dy)
     * drawImage(image, dx, dy, dWidth, dHeight)
     * drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
     * */
    ctx.drawImage(playerImage, frameX, frameY,
                              spriteWidth, spriteHeight,
                               0, 0, spriteWidth, spriteHeight);


    // if (gameFrame % staggerFrame === 0)
    // {
    //     if (frameX < 6) frameX++;
    //     else frameX = 0;
    // }

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();

