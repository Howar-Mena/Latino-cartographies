/**
 * Custom Loading Screen with Montserrat Font + Typewriter + 10s Timer
 */

pc.script.createLoadingScreen(function (app) {
  let loadingStartTime = Date.now();   // Track when loading begins
  let loadingComplete = false;

  const showSplash = function () {
    const wrapper = document.createElement('div');
    wrapper.id = 'application-splash-wrapper';
    (document.getElementById('canvas-wrapper') || document.body).appendChild(wrapper);

    const splash = document.createElement('div');
    splash.id = 'application-splash';
    wrapper.appendChild(splash);
    Object.assign(splash.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    });

    // LOGO
    const logo = document.createElement('img');
    logo.src = 'https://i.ibb.co/DP4fZxLz/Loading-screen-Mockup.png';
    logo.alt = 'Loading Logo';
    Object.assign(logo.style, {
      width: '260px',
      height: 'auto',
      maxWidth: '40vw',
      marginBottom: '10px',
      opacity: '0',
      transform: 'scale(0.85)',
      animation: 'fadeZoomIn 1.5s ease-out forwards'
    });
    splash.appendChild(logo);

    // TYPEWRITER TEXT with Montserrat
    const typewriter = document.createElement('p');
    typewriter.id = 'typewriter-text';
    Object.assign(typewriter.style, {
        fontFamily: `'Montserrat', 'Arial', sans-serif`,
        fontSize: '1.1em',
        color: '#333',
        fontWeight: '400',
        letterSpacing: '0.5px',
        marginTop: '15px',
        textAlign: 'center',
        whiteSpace: 'pre-line',
        minHeight: '28px',
        opacity: '0',
        lineHeight: '1.8'
    });
    splash.appendChild(typewriter);

    const text = "Every mural has a story,\nlet's peel back the layers...";
    let i = 0;
    setTimeout(() => {
      typewriter.style.opacity = '1';
      function typeLoop() {
        if (i < text.length) {
          typewriter.textContent += text[i];
          i++;
          setTimeout(typeLoop, 45);
        }
      }
      typeLoop();
    }, 1000);

    // PROGRESS BAR
    const container = document.createElement('div');
    container.id = 'progress-bar-container';

    const bar = document.createElement('div');
    bar.id = 'progress-bar';

    container.appendChild(bar);
    splash.appendChild(container);
  };

  // HIDE SPLASH WITH MINIMUM DELAY
  const hideSplash = function () {
    const elapsed = Date.now() - loadingStartTime;
    const delayNeeded = 6000 - elapsed;

    const performHide = () => {
      const wrapper = document.getElementById('application-splash-wrapper');
      if (wrapper) {
        // FIX: Ensure the wrapper is unclickable even if removal fails
        wrapper.style.display = 'none'; 
        if (wrapper.parentElement) wrapper.parentElement.removeChild(wrapper);
      }
    };

    if (delayNeeded > 0) {
      setTimeout(performHide, delayNeeded);
    } else {
      performHide();
    }
  };

  // PROGRESS HANDLER
  const setProgress = function (value) {
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = Math.min(1, Math.max(0, value)) * 100 + '%';
  };

  // CSS
  const createCss = function () {
    const css = [
      `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');`,
      'body { background-color: white; margin: 0; overflow: hidden; }',
      '#application-splash-wrapper { position:absolute; top:0; left:0; height:100%; width:100%; background-color:white; display:flex; align-items:center; justify-content:center; flex-direction:column; z-index:100; }',
      '@keyframes fadeIn { 0% {opacity:0;} 100% {opacity:1;} }',
      '@keyframes fadeZoomIn { 0% {opacity:0; transform:scale(0.6);} 100% {opacity:1; transform:scale(1);} }',
      '#progress-bar-container { margin-top:22px; height:10px; width:260px; background:#d0d0d0; border-radius:8px; overflow:hidden; }',
      '#progress-bar { width:0%; height:100%; background:black; transition:width 0.3s ease; }',
      '#typewriter-text { opacity:0; transition: opacity 0.5s ease; }',
      '@media(max-width:768px){ img[alt="Loading Logo"]{ width:200px;} #progress-bar-container{width:200px;} #typewriter-text{font-size:1em; letter-spacing:0.3px;} }',
      '@media(max-width:480px){ img[alt="Loading Logo"]{ width:160px;} #progress-bar-container{width:160px;} #typewriter-text{font-size:0.9em; letter-spacing:0.2px; line-height:1.6;} }'
    ].join('\n');

    const style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  };

  createCss();
  showSplash();

  app.on('preload:progress', setProgress);
  app.on('start', () => {
    loadingComplete = true;
    hideSplash();
  });
});