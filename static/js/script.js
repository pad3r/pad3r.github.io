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

function addVideoBlock(id) {
    var basePath = "./static/videos";
    var methods = ['input', 'sv4d', 'stag4d', 'lab4d_gs', 'lab4d', 'ours'];
  
    var targetDiv = document.getElementById('video_block');

    // var linkBlockDiv = document.getElementById('link_block');
    // var spanElement = document.createElement('span');
    // spanElement.className = 'link-block';
    // var linkElement = document.createElement('a');
    // linkElement.href = `#${id}`;
    // linkElement.className = 'external-link button is-normal is-rounded is-light';

    // var nameSpan = document.createElement('span');
    // nameSpan.textContent = id; // Use a more user-friendly name if needed
    // linkElement.appendChild(nameSpan);
    // spanElement.appendChild(linkElement);
    // linkBlockDiv.appendChild(spanElement);

    

    var newDiv = document.createElement('div');
    var content = document.createElement('div');
    // text.setAttribute('width', '100%');

    // var textpath = `./static/scripts/${id}.txt`;
    // fetch(textpath)
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     return response.text();
    // })
    // .then(text => {
    //     content.textContent = text;
    //     newDiv.appendChild(content);
    // })
    // .catch(error => {
    //     console.error('Error fetching the description file:', error);
    //     content.textContent = 'Description not available';
    //     newDiv.appendChild(content);
    // });

    var video_list = []

    newDiv.className = 'item';
    newDiv.id = id; 
  
    methods.forEach(method => {
        if (method != 'input'){
            var videoSrc = `${basePath}/${method}/${id}-rgb.mp4`;
        } else{
            var videoSrc = `${basePath}/${method}/${id}.mp4`;

        }
        console.log(videoSrc)

        var videoElement = document.createElement('video');
        videoElement.setAttribute('id', "");
        videoElement.setAttribute('poster', "");
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('controls', '');
        videoElement.setAttribute('muted', '');
        videoElement.setAttribute('loop', '');
        videoElement.setAttribute('playsinline', '');
        videoElement.setAttribute('width', '16%');
        videoElement.style.margin = '.2%'; 

        videoElement.muted = true;
            
        var sourceElement = document.createElement('source');
        sourceElement.src = videoSrc;
        sourceElement.type = 'video/mp4';
    
        videoElement.appendChild(sourceElement);

        sourceElement.addEventListener('error', function() {
            const imgPlaceholder = document.createElement('img');
            imgPlaceholder.setAttribute('width', '16%');
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

    newDiv.setAttribute('style', 'border-bottom: 2px solid #ccc');
    

    targetDiv.appendChild(newDiv);
    targetDiv.appendChild(document.createElement('br'));
    targetDiv.appendChild(document.createElement('br'));
    targetDiv.appendChild(document.createElement('br'));
    targetDiv.appendChild(document.createElement('br'));

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
  