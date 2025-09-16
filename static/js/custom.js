class BeforeAfter {
    constructor(enteryObject) {

        const beforeAfterContainer = document.querySelector(enteryObject.id);
        const before = beforeAfterContainer.querySelector('.bal-before');
        const beforeText = beforeAfterContainer.querySelector('.bal-beforePosition');
        const afterText = beforeAfterContainer.querySelector('.bal-afterPosition');
        const handle = beforeAfterContainer.querySelector('.bal-handle');
        var widthChange = 0;

        beforeAfterContainer.querySelector('.bal-before-inset').setAttribute("style", "width: " + beforeAfterContainer.offsetWidth + "px;")
        window.onresize = function () {
            beforeAfterContainer.querySelector('.bal-before-inset').setAttribute("style", "width: " + beforeAfterContainer.offsetWidth + "px;")
        }
        before.setAttribute('style', "width: 50%;");
        handle.setAttribute('style', "left: 50%;");

        //touch screen event listener
        beforeAfterContainer.addEventListener("touchstart", (e) => {

            beforeAfterContainer.addEventListener("touchmove", (e2) => {
                let containerWidth = beforeAfterContainer.offsetWidth;
                let currentPoint = e2.changedTouches[0].clientX;

                let startOfDiv = beforeAfterContainer.offsetLeft;

                let modifiedCurrentPoint = currentPoint - startOfDiv;

                if (modifiedCurrentPoint > 10 && modifiedCurrentPoint < beforeAfterContainer.offsetWidth - 10) {
                    let newWidth = modifiedCurrentPoint * 100 / containerWidth;

                    before.setAttribute('style', "width:" + newWidth + "%;");
                    afterText.setAttribute('style', "z-index: 1;");
                    handle.setAttribute('style', "left:" + newWidth + "%;");
                }
            });
        });

        //mouse move event listener
        beforeAfterContainer.addEventListener('mousemove', (e) => {
            let containerWidth = beforeAfterContainer.offsetWidth;
            widthChange = e.offsetX;
            let newWidth = widthChange * 100 / containerWidth;

            if (e.offsetX > 10 && e.offsetX < beforeAfterContainer.offsetWidth - 10) {
                before.setAttribute('style', "width:" + newWidth + "%;");
                afterText.setAttribute('style', "z-index:" + "1;");
                handle.setAttribute('style', "left:" + newWidth + "%;");
            }
        })

    }
}

function addVideoBlock(objectName) {
    var basePath = "./static/videos/";
    var methods = ['input', 'banmo', 'dreamo', 'triplane'];
  
    var targetDiv = document.getElementById('video_block');

    var linkBlockDiv = document.getElementById('link_block');
    var spanElement = document.createElement('span');
    spanElement.className = 'link-block';
    var linkElement = document.createElement('a');
    linkElement.href = `#${objectName}`;
    linkElement.className = 'external-link button is-normal is-rounded is-light';

    var nameSpan = document.createElement('span');
    nameSpan.textContent = objectName; // Use a more user-friendly name if needed
    linkElement.appendChild(nameSpan);
    spanElement.appendChild(linkElement);
    linkBlockDiv.appendChild(spanElement);
    // spanElement.appendChild(linkElement);
    

    var newDiv = document.createElement('div');
    var video_list = []

    newDiv.className = 'item';
    newDiv.id = objectName; 
  
    methods.forEach(method => {
        var videoSrc = `${basePath}${objectName}_${method}.mp4`;

        var videoElement = document.createElement('video');
        videoElement.setAttribute('id', "");
        videoElement.setAttribute('poster', "");
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('controls', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('loop', '');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('width', '24.5%');
        videoElement.style.margin = '.2%'; 

        videoElement.muted = true;
            
        var sourceElement = document.createElement('source');
        sourceElement.src = videoSrc;
        sourceElement.type = 'video/mp4';
    
        videoElement.appendChild(sourceElement);

        sourceElement.addEventListener('error', function() {
            const imgPlaceholder = document.createElement('img');
            imgPlaceholder.setAttribute('width', '24.5%');
            imgPlaceholder.style.margin = '.2%'; 

            var imgsourceElement = document.createElement('source');
            imgsourceElement.src = "./static/videos/placeholder.png";
            imgPlaceholder.appendChild(imgsourceElement);
            newDiv.replaceChild(imgPlaceholder, videoElement);
        });


        newDiv.appendChild(videoElement);
        video_list.push(videoElement)
        // videoElement.play().catch(error => {
        // console.error('Video play failed:', error);
        // console.log(method);
        // });
    });
  
    targetDiv.appendChild(newDiv);
    // video_list.forEach(video =>{
    //     try{
    //         video.load();
    //     } catch(err){
    //         console.log(err);
    //     }
    //     // video.play().catch(error => {
    //     //     console.error('Video play failed:', error);
    //     //     console.log(video);
    //     //   });
    // })
  }
    
  var artemisNames = {
    "bear-walk": "Bear Walk",
    "bear-run": "Bear Run",
    "cat-walk_final": "Cat Walk",
    "cat-walkprogressive_noz": "Cat Walk 2",
    "cat-walksniff": "Cat Walk Sniff",
    "cat-run": "Cat Run",
    "duck-walk": "Duck Walk",
    "duck-eat_grass": "Duck Eat",
    "fox-attitude": "Fox Attitude",
    "fox-run": "Fox Run",
    "panda-walk": "Panda Walk",
    "panda-run": "Panda Run",
    "wolf-Walk": "Wolf Walk",
    "wolf-Run": "Wolf Run",
    "wolf-Howling": "Wolf Howling",
    "wolf-Damage": "Wolf Damaged",
    }

  function updateVideos(method = null) {
    if (method) {
        currentMethod = method;
        var fullName = methodNames[method] || method;
        var ele = document.getElementById('rgb-container').querySelector('.twentytwenty-before-label');
        // ele.setAttribute('data-content', fullName);
        var ele = document.getElementById('depth-container').querySelector('.twentytwenty-before-label');
        // ele.setAttribute('data-content', fullName);
    }

    let counter = 0;

    const entries = Object.entries(artemisNames);
    entries.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);

        console.log('methodVideo' + counter);

        // Update the sources for the second set of video elements
        document.getElementById('methodVideo' + counter).src = './static/videos/' + method + '/' + key + '-rgb.mp4';
        document.getElementById('methodDepthVideo' + counter).src = './static/videos/' + method + '/' + key + '-depth.mp4';

        

        counter++;
    });

    adjustPlaybackRate('comparison-artemis');

    }

    function adjustPlaybackRate(sectionId){
        // Get all video elements within the specified section
        const videos = document.querySelectorAll(`#${sectionId} video`);

        // Loop through each video element and set the playbackRate
        videos.forEach(video => {
            video.playbackRate = 0.4;
        });
    }

    // adjustPlaybackRate('comparison-artemis');

