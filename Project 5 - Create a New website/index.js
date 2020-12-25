
function animation() {

    gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.wrap-container').forEach((container, index, containers) => {
        let rvimg = container.querySelector('.reveal-img');
        let rvtext = container.querySelector('.reveal-text');
        let image = container.querySelector('img');
            
        let timeline = gsap.timeline({
            defaults: { duration: 2, ease: 'slow' },
            scrollTrigger: {
                trigger: container,
                start: 'top center',
                // markers: true,
            }
        });
        timeline
            .to(rvimg, { xPercent: '-100'})
            .to(rvtext, { xPercent: '100', ease: 'power2.inOut' }, '-=2')
            .fromTo(image, { scale: 2 }, { scale: 1 }, 0.3)
                .fromTo('nav', { y: -500 }, { y: 0, ease: 'elastic' }, '-=1');
            
            
        let nextslide = containers.length - 1 === index ? 'end ' : containers[index + 1];

        
        let tl = gsap.timeline();
        tl
           .fromTo(nextslide, {yPercent:0}, {yPercent: 60})
           .fromTo(container, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 })
           .fromTo(nextslide, {yPercent:50}, {yPercent: 0}, '1')
        
        ScrollTrigger.create({
            trigger: container,
            start: 'center center',
            // markers: true,
            id: 'my-id',
            pin: true,
            pinSpacing: false,
            scrub: 1,
            animation:tl
        });
        
        
        
    });
}

animation();

/**********************Clearing the blur************************************ */

const newContainer = document.querySelector('.whole-container');
const text = document.querySelector('.loading-text');
let load = 0;

let int = setInterval(blurring, 30)

function blurring(e) {
    load++;
    if (load > 99) {
        clearInterval(int);
}
    text.innerHTML = `${load}%`;
    text.style.opacity = scale(load, 0, 100, 1, 0);
    newContainer.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;

}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

/**************************** toggling nav bar ***********************************/

const bars = document.querySelector('.bars');
const logo = document.querySelector('.logo');
const close = document.querySelector('.fa-times');
const navContents = document.querySelector('.nav-bar-contents');
bars.addEventListener('click', toggling);

function toggling(f) {
    if (f.target.classList.contains('fa-bars')) 
    {
        gsap.to(navContents, 2, { clipPath: 'circle(2500px at 100% -10%)' });
       
    } 
}

close.addEventListener('click', () => {
    gsap.to(navContents, 1.5, { clipPath: 'circle(30px at 100% -10%)' });
})


