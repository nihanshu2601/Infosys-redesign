function locomotive(){

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        inertia: .6,
        getDirection: true,
        mobile: {
            breakpoint: 0,  
            smooth: true,
            inertia: .9,
            getDirection: true,
        },
        tablet: {
            breakpoint: 0,  
            smooth: true,
            inertia: 0.9,
            getDirection: true,
        },
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, true) : locoScroll.scroll.instance.scroll.y;
    }, 
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

}
locomotive();

let width = window.innerWidth;

function matter(){

    const matterContainer = document.querySelector("#matter-container");
    const THICCNESS = 60;

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: matterContainer.clientWidth,
    height: matterContainer.clientHeight,
    background: "transparent",
    wireframes: false,
    showAngleIndicator: false
  }
});

if(width>550){
    for (let i = 0; i < 100; i++) {
        let circle = Bodies.circle(i, 10, 30, {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 0.8
        });
        Composite.add(engine.world, circle);
      }
}
if(width<550){
    for (let i = 0; i < 100; i++) {
        let circle = Bodies.circle(i, 10, 17, {
          friction: 0.1,
          frictionAir: 0.00001,
          restitution: .9
        });
        Composite.add(engine.world, circle);
      }
}

var ground = Bodies.rectangle(
  matterContainer.clientWidth / 2,
  matterContainer.clientHeight + THICCNESS / 2,
  27184,
  THICCNESS,
  { isStatic: true }
);

let leftWall = Bodies.rectangle(
  0 - THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  {
    isStatic: true
  }
);

let rightWall = Bodies.rectangle(
  matterContainer.clientWidth + THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true }
);

// add all of the bodies to the world
Composite.add(engine.world, [ground, leftWall, rightWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

Composite.add(engine.world, mouseConstraint);


// allow scroll through the canvas
mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function handleResize(matterContainer) {
  // set canvas size to new values
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  // reposition ground
  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(
      matterContainer.clientWidth / 2,
      matterContainer.clientHeight + THICCNESS / 2
    )
  );

  // reposition right wall
  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      matterContainer.clientWidth + THICCNESS / 2,
      matterContainer.clientHeight / 2
    )
  );
}

window.addEventListener("resize", () => handleResize(matterContainer));
}
matter();

function rippleEffect(){
    $('#home').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04
      });
    $('#menu').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: .04
      });
    $('#matter-container').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: .04
      });
}

if(width>1200){
    rippleEffect();
}



function loading(){
    gsap.to("#matter-container",{
        duration: 1,
        delay: .5,
        y: "-100vh",
        opacity: 0,
        ease: "power3",
        onCompelete: heroAnimation()
    })
}

if(width>550){
    Shery.mouseFollower({
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        skew: true,
        duration: 1,
    });
    
    Shery.makeMagnet(".hero>.right>.text>a", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
}

function textAnime(){
    Shery.textAnimate(".hero>.left>.bottom>h4", {
        style: 1,
        y: 1,
        delay: 0.05,
        duration: .2,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        multiplier: 0.5,
      });
}
let flag = true;


function menu(){
    let menu = document.getElementById("menu");
    let line = document.getElementById("line");
    let line1 = document.getElementById("line1");


    if(flag == true){
        if(width>700){
            menu.style.right = "-150%";
        }
        if(width<700){
            menu.style.right = "-30%";
        }
        line.style.stroke = "#fff";
        line1.style.stroke = "#fff";
        flag = false;
        gsap.to("nav>.right>.menu a, nav>.right>.menu>button",{
            opacity: 1,
            duration: 1.5,
            stagger: .2,
            delay: .7,
            rotateX: 0,
            // x: 50,
            y: -20,
            // scale: 2,
            ease: "power2"
        })
    }
    else{
        menu.style.right = "-2500%";
        line.style.stroke = "#000";
        line1.style.stroke = "#000";
        flag = true;
        gsap.to("nav>.right>.menu a, nav>.right>.menu>button",{
            opacity: 0,
            duration: 1, 
            stagger: .2,
            rotateX: 100,
            // x: 50,
            y: 20,
            delay: .2,
            // scale: 2,
            ease: "power2"
        })
    }
}


let tl = gsap.timeline();

function heroAnimation(){
    tl.from("nav>.logo>img, nav>.right>.hamburger",{
        opacity: 0,
        duration: 2, 
        // y: -50,
        delay: .2,
        stagger: .3,
        scale: 0,
        ease: "expo.out"
    },"hero")
    // .from("nav>.right a, nav>.right>button",{
    //     opacity: 0,
    //     duration: 2, 
    //     stagger: .2,
    //     // x: 50,
    //     y: -50,
    //     delay: .2,
    //     // scale: 2,
    //     ease: "elastic.out(1, 0.8)"
    // },"hero")
    .from(".hero>video",{
        opacity: 0,
        duration: 2, 
        stagger: .2,
        // x: 50,
        y: -50,
        scale: 1.5,
        ease: "elastic.out(1, 0.6)",
        delay: 1.2
    },"hero")
    .from(".hero>.left>.top",{
        opacity: 0,
        duration: 1, 
        stagger: .2,
        delay: .8,
        // x: 50,
        y: 50,
    },"hero")
    .from(".hero>.left>.bottom>h4",{
        opacity: 0,
        onStart: ()=> textAnime(),
        duration: 1, 
        delay: 1.4
    },"hero")
    .from(".hero>.left>.bottom>h1",{
        opacity: 0,
        duration: 2, 
        stagger: .2,
        rotateX: 100,
        delay: 2,
        scale: .9,
        y: 15,
        ease: "elastic.out(1, 0.6)"
    },"hero")
    .from(".hero>.left>.bottom>a",{
        opacity: 0,
        delay: 1,
        duration: 1, 
        // x: 50,
        scale: 0.5,
        ease: "elastic.out(1, 0.8)",
        delay: 2.8
    },"hero")
    .from(".hero>.right>.text",{
        opacity: 0,
        duration: 2, 
        // x: 50,
        stagger: .3,
        y: -50,
        ease: "elastic.out(1, 0.8)",
        delay: 2.8
    },"hero")
}

function counter(){
    $(".counter").counterUp({
        delay: 5,
        time: 300,
    });
}

function canvasVideo(){

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
    });

    function files(index) {
    if(width<830){
        var data = `
        ./imgs/infoMobile/i\ \(1\).jpg
        ./imgs/infoMobile/i\ \(2\).jpg
        ./imgs/infoMobile/i\ \(3\).jpg
        ./imgs/infoMobile/i\ \(4\).jpg
        ./imgs/infoMobile/i\ \(5\).jpg
        ./imgs/infoMobile/i\ \(6\).jpg
        ./imgs/infoMobile/i\ \(7\).jpg
        ./imgs/infoMobile/i\ \(8\).jpg
        ./imgs/infoMobile/i\ \(9\).jpg
        ./imgs/infoMobile/i\ \(10\).jpg
        ./imgs/infoMobile/i\ \(11\).jpg
        ./imgs/infoMobile/i\ \(12\).jpg
        ./imgs/infoMobile/i\ \(13\).jpg
        ./imgs/infoMobile/i\ \(14\).jpg
        ./imgs/infoMobile/i\ \(15\).jpg
        ./imgs/infoMobile/i\ \(16\).jpg
        ./imgs/infoMobile/i\ \(17\).jpg
        ./imgs/infoMobile/i\ \(18\).jpg
        ./imgs/infoMobile/i\ \(19\).jpg
        ./imgs/infoMobile/i\ \(20\).jpg
        ./imgs/infoMobile/i\ \(21\).jpg
        ./imgs/infoMobile/i\ \(22\).jpg
        ./imgs/infoMobile/i\ \(23\).jpg
        ./imgs/infoMobile/i\ \(24\).jpg
        ./imgs/infoMobile/i\ \(25\).jpg
        ./imgs/infoMobile/i\ \(26\).jpg
        ./imgs/infoMobile/i\ \(27\).jpg
        ./imgs/infoMobile/i\ \(28\).jpg
        ./imgs/infoMobile/i\ \(29\).jpg
        ./imgs/infoMobile/i\ \(30\).jpg
        ./imgs/infoMobile/i\ \(31\).jpg
        ./imgs/infoMobile/i\ \(32\).jpg
        ./imgs/infoMobile/i\ \(33\).jpg
        ./imgs/infoMobile/i\ \(34\).jpg
        ./imgs/infoMobile/i\ \(35\).jpg
        ./imgs/infoMobile/i\ \(36\).jpg
        ./imgs/infoMobile/i\ \(37\).jpg
        ./imgs/infoMobile/i\ \(38\).jpg
        ./imgs/infoMobile/i\ \(39\).jpg
        ./imgs/infoMobile/i\ \(40\).jpg
        ./imgs/infoMobile/i\ \(41\).jpg
        ./imgs/infoMobile/i\ \(42\).jpg
        ./imgs/infoMobile/i\ \(43\).jpg
        ./imgs/infoMobile/i\ \(44\).jpg
        ./imgs/infoMobile/i\ \(45\).jpg
        ./imgs/infoMobile/i\ \(46\).jpg
        ./imgs/infoMobile/i\ \(47\).jpg
        ./imgs/infoMobile/i\ \(48\).jpg
        ./imgs/infoMobile/i\ \(49\).jpg
        ./imgs/infoMobile/i\ \(50\).jpg
        ./imgs/infoMobile/i\ \(51\).jpg
        ./imgs/infoMobile/i\ \(52\).jpg
        ./imgs/infoMobile/i\ \(53\).jpg
        ./imgs/infoMobile/i\ \(54\).jpg
        ./imgs/infoMobile/i\ \(55\).jpg
        ./imgs/infoMobile/i\ \(56\).jpg
        ./imgs/infoMobile/i\ \(57\).jpg
        ./imgs/infoMobile/i\ \(58\).jpg
        ./imgs/infoMobile/i\ \(59\).jpg
        ./imgs/infoMobile/i\ \(60\).jpg
        ./imgs/infoMobile/i\ \(61\).jpg
        ./imgs/infoMobile/i\ \(62\).jpg
        ./imgs/infoMobile/i\ \(63\).jpg
        ./imgs/infoMobile/i\ \(64\).jpg
        ./imgs/infoMobile/i\ \(65\).jpg
        ./imgs/infoMobile/i\ \(66\).jpg
        ./imgs/infoMobile/i\ \(67\).jpg
        ./imgs/infoMobile/i\ \(68\).jpg
        ./imgs/infoMobile/i\ \(69\).jpg
        ./imgs/infoMobile/i\ \(70\).jpg
        ./imgs/infoMobile/i\ \(71\).jpg
        ./imgs/infoMobile/i\ \(72\).jpg
        ./imgs/infoMobile/i\ \(73\).jpg
        ./imgs/infoMobile/i\ \(74\).jpg
        ./imgs/infoMobile/i\ \(75\).jpg
        ./imgs/infoMobile/i\ \(76\).jpg
        ./imgs/infoMobile/i\ \(77\).jpg
        ./imgs/infoMobile/i\ \(78\).jpg
        ./imgs/infoMobile/i\ \(79\).jpg
        ./imgs/infoMobile/i\ \(80\).jpg
        ./imgs/infoMobile/i\ \(81\).jpg
        ./imgs/infoMobile/i\ \(82\).jpg
        ./imgs/infoMobile/i\ \(83\).jpg
        ./imgs/infoMobile/i\ \(84\).jpg
        ./imgs/infoMobile/i\ \(85\).jpg
        ./imgs/infoMobile/i\ \(86\).jpg
        ./imgs/infoMobile/i\ \(87\).jpg
        ./imgs/infoMobile/i\ \(88\).jpg
        ./imgs/infoMobile/i\ \(89\).jpg
        ./imgs/infoMobile/i\ \(90\).jpg
        ./imgs/infoMobile/i\ \(91\).jpg
        ./imgs/infoMobile/i\ \(92\).jpg
        ./imgs/infoMobile/i\ \(93\).jpg
        ./imgs/infoMobile/i\ \(94\).jpg
        ./imgs/infoMobile/i\ \(95\).jpg
        ./imgs/infoMobile/i\ \(96\).jpg
        ./imgs/infoMobile/i\ \(97\).jpg
        ./imgs/infoMobile/i\ \(98\).jpg
        ./imgs/infoMobile/i\ \(99\).jpg
        ./imgs/infoMobile/i\ \(100\).jpg
        ./imgs/infoMobile/i\ \(101\).jpg
        ./imgs/infoMobile/i\ \(102\).jpg
        ./imgs/infoMobile/i\ \(103\).jpg
        ./imgs/infoMobile/i\ \(104\).jpg
        ./imgs/infoMobile/i\ \(105\).jpg
        ./imgs/infoMobile/i\ \(106\).jpg
        ./imgs/infoMobile/i\ \(107\).jpg
        ./imgs/infoMobile/i\ \(108\).jpg
        ./imgs/infoMobile/i\ \(109\).jpg
        ./imgs/infoMobile/i\ \(110\).jpg
        ./imgs/infoMobile/i\ \(111\).jpg
        ./imgs/infoMobile/i\ \(112\).jpg
        ./imgs/infoMobile/i\ \(113\).jpg
        ./imgs/infoMobile/i\ \(114\).jpg
        ./imgs/infoMobile/i\ \(115\).jpg
        ./imgs/infoMobile/i\ \(116\).jpg
        ./imgs/infoMobile/i\ \(117\).jpg
        ./imgs/infoMobile/i\ \(118\).jpg
        ./imgs/infoMobile/i\ \(119\).jpg
        ./imgs/infoMobile/i\ \(120\).jpg
        ./imgs/infoMobile/i\ \(121\).jpg
        ./imgs/infoMobile/i\ \(122\).jpg
        ./imgs/infoMobile/i\ \(123\).jpg
        ./imgs/infoMobile/i\ \(124\).jpg
        ./imgs/infoMobile/i\ \(125\).jpg
        ./imgs/infoMobile/i\ \(126\).jpg
        ./imgs/infoMobile/i\ \(127\).jpg
        ./imgs/infoMobile/i\ \(128\).jpg
        ./imgs/infoMobile/i\ \(129\).jpg
        ./imgs/infoMobile/i\ \(130\).jpg
        ./imgs/infoMobile/i\ \(131\).jpg
        ./imgs/infoMobile/i\ \(132\).jpg
        ./imgs/infoMobile/i\ \(133\).jpg
        ./imgs/infoMobile/i\ \(134\).jpg
        ./imgs/infoMobile/i\ \(135\).jpg
        ./imgs/infoMobile/i\ \(136\).jpg
        ./imgs/infoMobile/i\ \(137\).jpg
        ./imgs/infoMobile/i\ \(138\).jpg
        ./imgs/infoMobile/i\ \(139\).jpg
        ./imgs/infoMobile/i\ \(140\).jpg
        ./imgs/infoMobile/i\ \(141\).jpg
        ./imgs/infoMobile/i\ \(142\).jpg
        ./imgs/infoMobile/i\ \(143\).jpg
        ./imgs/infoMobile/i\ \(144\).jpg
        ./imgs/infoMobile/i\ \(145\).jpg
        ./imgs/infoMobile/i\ \(146\).jpg
        ./imgs/infoMobile/i\ \(147\).jpg
        ./imgs/infoMobile/i\ \(148\).jpg
        ./imgs/infoMobile/i\ \(149\).jpg
        ./imgs/infoMobile/i\ \(150\).jpg
        ./imgs/infoMobile/i\ \(151\).jpg
        ./imgs/infoMobile/i\ \(152\).jpg
        ./imgs/infoMobile/i\ \(153\).jpg
        ./imgs/infoMobile/i\ \(154\).jpg
        ./imgs/infoMobile/i\ \(155\).jpg
        ./imgs/infoMobile/i\ \(156\).jpg
        ./imgs/infoMobile/i\ \(157\).jpg
        ./imgs/infoMobile/i\ \(158\).jpg
        ./imgs/infoMobile/i\ \(159\).jpg
        ./imgs/infoMobile/i\ \(160\).jpg
        ./imgs/infoMobile/i\ \(161\).jpg
        ./imgs/infoMobile/i\ \(162\).jpg
        ./imgs/infoMobile/i\ \(163\).jpg
        ./imgs/infoMobile/i\ \(164\).jpg
        ./imgs/infoMobile/i\ \(165\).jpg
        ./imgs/infoMobile/i\ \(166\).jpg
        ./imgs/infoMobile/i\ \(167\).jpg
        ./imgs/infoMobile/i\ \(168\).jpg
        ./imgs/infoMobile/i\ \(169\).jpg
        ./imgs/infoMobile/i\ \(170\).jpg
        ./imgs/infoMobile/i\ \(171\).jpg
        ./imgs/infoMobile/i\ \(172\).jpg
        ./imgs/infoMobile/i\ \(173\).jpg
        ./imgs/infoMobile/i\ \(174\).jpg
        ./imgs/infoMobile/i\ \(175\).jpg
        ./imgs/infoMobile/i\ \(176\).jpg
        ./imgs/infoMobile/i\ \(177\).jpg
        ./imgs/infoMobile/i\ \(178\).jpg
        ./imgs/infoMobile/i\ \(179\).jpg
        ./imgs/infoMobile/i\ \(180\).jpg
        ./imgs/infoMobile/i\ \(181\).jpg
        ./imgs/infoMobile/i\ \(182\).jpg
        ./imgs/infoMobile/i\ \(183\).jpg
        ./imgs/infoMobile/i\ \(184\).jpg
        ./imgs/infoMobile/i\ \(185\).jpg
        ./imgs/infoMobile/i\ \(186\).jpg
        ./imgs/infoMobile/i\ \(187\).jpg
        ./imgs/infoMobile/i\ \(188\).jpg
        ./imgs/infoMobile/i\ \(189\).jpg
        ./imgs/infoMobile/i\ \(190\).jpg
        ./imgs/infoMobile/i\ \(191\).jpg
        ./imgs/infoMobile/i\ \(192\).jpg
        ./imgs/infoMobile/i\ \(193\).jpg
        ./imgs/infoMobile/i\ \(194\).jpg
        ./imgs/infoMobile/i\ \(195\).jpg
        ./imgs/infoMobile/i\ \(196\).jpg
        ./imgs/infoMobile/i\ \(197\).jpg
        ./imgs/infoMobile/i\ \(198\).jpg
        ./imgs/infoMobile/i\ \(199\).jpg
        ./imgs/infoMobile/i\ \(200\).jpg
        `;
    }
    if(width>830){
        var data = `
        ./imgs/info1/i\ \(1\).jpg
        ./imgs/info1/i\ \(2\).jpg
        ./imgs/info1/i\ \(3\).jpg
        ./imgs/info1/i\ \(4\).jpg
        ./imgs/info1/i\ \(5\).jpg
        ./imgs/info1/i\ \(6\).jpg
        ./imgs/info1/i\ \(7\).jpg
        ./imgs/info1/i\ \(8\).jpg
        ./imgs/info1/i\ \(9\).jpg
        ./imgs/info1/i\ \(10\).jpg
        ./imgs/info1/i\ \(11\).jpg
        ./imgs/info1/i\ \(12\).jpg
        ./imgs/info1/i\ \(13\).jpg
        ./imgs/info1/i\ \(14\).jpg
        ./imgs/info1/i\ \(15\).jpg
        ./imgs/info1/i\ \(16\).jpg
        ./imgs/info1/i\ \(17\).jpg
        ./imgs/info1/i\ \(18\).jpg
        ./imgs/info1/i\ \(19\).jpg
        ./imgs/info1/i\ \(20\).jpg
        ./imgs/info1/i\ \(21\).jpg
        ./imgs/info1/i\ \(22\).jpg
        ./imgs/info1/i\ \(23\).jpg
        ./imgs/info1/i\ \(24\).jpg
        ./imgs/info1/i\ \(25\).jpg
        ./imgs/info1/i\ \(26\).jpg
        ./imgs/info1/i\ \(27\).jpg
        ./imgs/info1/i\ \(28\).jpg
        ./imgs/info1/i\ \(29\).jpg
        ./imgs/info1/i\ \(30\).jpg
        ./imgs/info1/i\ \(31\).jpg
        ./imgs/info1/i\ \(32\).jpg
        ./imgs/info1/i\ \(33\).jpg
        ./imgs/info1/i\ \(34\).jpg
        ./imgs/info1/i\ \(35\).jpg
        ./imgs/info1/i\ \(36\).jpg
        ./imgs/info1/i\ \(37\).jpg
        ./imgs/info1/i\ \(38\).jpg
        ./imgs/info1/i\ \(39\).jpg
        ./imgs/info1/i\ \(40\).jpg
        ./imgs/info1/i\ \(41\).jpg
        ./imgs/info1/i\ \(42\).jpg
        ./imgs/info1/i\ \(43\).jpg
        ./imgs/info1/i\ \(44\).jpg
        ./imgs/info1/i\ \(45\).jpg
        ./imgs/info1/i\ \(46\).jpg
        ./imgs/info1/i\ \(47\).jpg
        ./imgs/info1/i\ \(48\).jpg
        ./imgs/info1/i\ \(49\).jpg
        ./imgs/info1/i\ \(50\).jpg
        ./imgs/info1/i\ \(51\).jpg
        ./imgs/info1/i\ \(52\).jpg
        ./imgs/info1/i\ \(53\).jpg
        ./imgs/info1/i\ \(54\).jpg
        ./imgs/info1/i\ \(55\).jpg
        ./imgs/info1/i\ \(56\).jpg
        ./imgs/info1/i\ \(57\).jpg
        ./imgs/info1/i\ \(58\).jpg
        ./imgs/info1/i\ \(59\).jpg
        ./imgs/info1/i\ \(60\).jpg
        ./imgs/info1/i\ \(61\).jpg
        ./imgs/info1/i\ \(62\).jpg
        ./imgs/info1/i\ \(63\).jpg
        ./imgs/info1/i\ \(64\).jpg
        ./imgs/info1/i\ \(65\).jpg
        ./imgs/info1/i\ \(66\).jpg
        ./imgs/info1/i\ \(67\).jpg
        ./imgs/info1/i\ \(68\).jpg
        ./imgs/info1/i\ \(69\).jpg
        ./imgs/info1/i\ \(70\).jpg
        ./imgs/info1/i\ \(71\).jpg
        ./imgs/info1/i\ \(72\).jpg
        ./imgs/info1/i\ \(73\).jpg
        ./imgs/info1/i\ \(74\).jpg
        ./imgs/info1/i\ \(75\).jpg
        ./imgs/info1/i\ \(76\).jpg
        ./imgs/info1/i\ \(77\).jpg
        ./imgs/info1/i\ \(78\).jpg
        ./imgs/info1/i\ \(79\).jpg
        ./imgs/info1/i\ \(80\).jpg
        ./imgs/info1/i\ \(81\).jpg
        ./imgs/info1/i\ \(82\).jpg
        ./imgs/info1/i\ \(83\).jpg
        ./imgs/info1/i\ \(84\).jpg
        ./imgs/info1/i\ \(85\).jpg
        ./imgs/info1/i\ \(86\).jpg
        ./imgs/info1/i\ \(87\).jpg
        ./imgs/info1/i\ \(88\).jpg
        ./imgs/info1/i\ \(89\).jpg
        ./imgs/info1/i\ \(90\).jpg
        ./imgs/info1/i\ \(91\).jpg
        ./imgs/info1/i\ \(92\).jpg
        ./imgs/info1/i\ \(93\).jpg
        ./imgs/info1/i\ \(94\).jpg
        ./imgs/info1/i\ \(95\).jpg
        ./imgs/info1/i\ \(96\).jpg
        ./imgs/info1/i\ \(97\).jpg
        ./imgs/info1/i\ \(98\).jpg
        ./imgs/info1/i\ \(99\).jpg
        ./imgs/info1/i\ \(100\).jpg
        ./imgs/info1/i\ \(101\).jpg
        ./imgs/info1/i\ \(102\).jpg
        ./imgs/info1/i\ \(103\).jpg
        ./imgs/info1/i\ \(104\).jpg
        ./imgs/info1/i\ \(105\).jpg
        ./imgs/info1/i\ \(106\).jpg
        ./imgs/info1/i\ \(107\).jpg
        ./imgs/info1/i\ \(108\).jpg
        ./imgs/info1/i\ \(109\).jpg
        ./imgs/info1/i\ \(110\).jpg
        ./imgs/info1/i\ \(111\).jpg
        ./imgs/info1/i\ \(112\).jpg
        ./imgs/info1/i\ \(113\).jpg
        ./imgs/info1/i\ \(114\).jpg
        ./imgs/info1/i\ \(115\).jpg
        ./imgs/info1/i\ \(116\).jpg
        ./imgs/info1/i\ \(117\).jpg
        ./imgs/info1/i\ \(118\).jpg
        ./imgs/info1/i\ \(119\).jpg
        ./imgs/info1/i\ \(120\).jpg
        ./imgs/info1/i\ \(121\).jpg
        ./imgs/info1/i\ \(122\).jpg
        ./imgs/info1/i\ \(123\).jpg
        ./imgs/info1/i\ \(124\).jpg
        ./imgs/info1/i\ \(125\).jpg
        ./imgs/info1/i\ \(126\).jpg
        ./imgs/info1/i\ \(127\).jpg
        ./imgs/info1/i\ \(128\).jpg
        ./imgs/info1/i\ \(129\).jpg
        ./imgs/info1/i\ \(130\).jpg
        ./imgs/info1/i\ \(131\).jpg
        ./imgs/info1/i\ \(132\).jpg
        ./imgs/info1/i\ \(133\).jpg
        ./imgs/info1/i\ \(134\).jpg
        ./imgs/info1/i\ \(135\).jpg
        ./imgs/info1/i\ \(136\).jpg
        ./imgs/info1/i\ \(137\).jpg
        ./imgs/info1/i\ \(138\).jpg
        ./imgs/info1/i\ \(139\).jpg
        ./imgs/info1/i\ \(140\).jpg
        ./imgs/info1/i\ \(141\).jpg
        ./imgs/info1/i\ \(142\).jpg
        ./imgs/info1/i\ \(143\).jpg
        ./imgs/info1/i\ \(144\).jpg
        ./imgs/info1/i\ \(145\).jpg
        ./imgs/info1/i\ \(146\).jpg
        ./imgs/info1/i\ \(147\).jpg
        ./imgs/info1/i\ \(148\).jpg
        ./imgs/info1/i\ \(149\).jpg
        ./imgs/info1/i\ \(150\).jpg
        ./imgs/info1/i\ \(151\).jpg
        ./imgs/info1/i\ \(152\).jpg
        ./imgs/info1/i\ \(153\).jpg
        ./imgs/info1/i\ \(154\).jpg
        ./imgs/info1/i\ \(155\).jpg
        ./imgs/info1/i\ \(156\).jpg
        ./imgs/info1/i\ \(157\).jpg
        ./imgs/info1/i\ \(158\).jpg
        ./imgs/info1/i\ \(159\).jpg
        ./imgs/info1/i\ \(160\).jpg
        ./imgs/info1/i\ \(161\).jpg
        ./imgs/info1/i\ \(162\).jpg
        ./imgs/info1/i\ \(163\).jpg
        ./imgs/info1/i\ \(164\).jpg
        ./imgs/info1/i\ \(165\).jpg
        ./imgs/info1/i\ \(166\).jpg
        ./imgs/info1/i\ \(167\).jpg
        ./imgs/info1/i\ \(168\).jpg
        ./imgs/info1/i\ \(169\).jpg
        ./imgs/info1/i\ \(170\).jpg
        ./imgs/info1/i\ \(171\).jpg
        ./imgs/info1/i\ \(172\).jpg
        ./imgs/info1/i\ \(173\).jpg
        ./imgs/info1/i\ \(174\).jpg
        ./imgs/info1/i\ \(175\).jpg
        ./imgs/info1/i\ \(176\).jpg
        ./imgs/info1/i\ \(177\).jpg
        ./imgs/info1/i\ \(178\).jpg
        ./imgs/info1/i\ \(179\).jpg
        ./imgs/info1/i\ \(180\).jpg
        ./imgs/info1/i\ \(181\).jpg
        ./imgs/info1/i\ \(182\).jpg
        ./imgs/info1/i\ \(183\).jpg
        ./imgs/info1/i\ \(184\).jpg
        ./imgs/info1/i\ \(185\).jpg
        ./imgs/info1/i\ \(186\).jpg
        ./imgs/info1/i\ \(187\).jpg
        ./imgs/info1/i\ \(188\).jpg
        ./imgs/info1/i\ \(189\).jpg
        ./imgs/info1/i\ \(190\).jpg
        ./imgs/info1/i\ \(191\).jpg
        ./imgs/info1/i\ \(192\).jpg
        ./imgs/info1/i\ \(193\).jpg
        ./imgs/info1/i\ \(194\).jpg
        ./imgs/info1/i\ \(195\).jpg
        ./imgs/info1/i\ \(196\).jpg
        ./imgs/info1/i\ \(197\).jpg
        ./imgs/info1/i\ \(198\).jpg
        ./imgs/info1/i\ \(199\).jpg
        ./imgs/info1/i\ \(200\).jpg
        `;
    }
    return data.split("\n")[index];
    }

        const frameCount = 200;
    
        const images = [];

        let imageSeq = {
        frame: 1,
        };
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = files(i);
            images.push(img);
            }
    images[1].onload = render;

    function render() {
    scaleImage(images[imageSeq.frame], context);
    }

    function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
    );
    }
    ScrollTrigger.create({

    trigger: "#section6>canvas",
    pin: true,
    // markers:true,
    scroller: `.main`,
    start: `top 0%`,
    end: `100% top`,
    });

}

const buttons = document.querySelectorAll(".line2>button");

buttons.forEach(button => {
  button.addEventListener("click", function() {
    buttons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");
  });
});