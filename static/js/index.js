window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
      $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 4,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }
})

  
function addVideoBlock(seqname, idx) {
  // var img_btns = document.getElementsByClassName('btn-img-videos');
  // if (img_btns.length > 0) {
  //     for (var i = 0; i < img_btns.length; i++) {
  //         set_inactive(img_btns[i]);
  //     }
  //     set_active(img_btns[idx]);
  // }

  // var shape_des = document.getElementById('shape-des');
  // // shape_des.innerText = 'Shape description: ' + shape[id]
  // shape_des.innerHTML = '<strong>Shape description:</strong> ' + shape[id];
  // var motion_des = document.getElementById('motion-des');
  // // motion_des.innerText = 'Motion description: ' + motion[id]
  // motion_des.innerHTML = '<strong>Motion description:</strong> ' + motion[id];

  var basePath = "./static/videos";
  var methods = ['dm4d_ref', 'dm4d_360', 'our_ref', 'our_360', 'our2_ref', 'our2_360'];
  var methods2 = ['single_dm4d_ref', 'single_dm4d_360', 'single_our_ref', 'single_our_360', 'single_our2_ref', 'single_our2_360'];

  var targetDiv = document.getElementById('video_block');
  var targetDiv2 = document.getElementById('video_block2');

  targetDiv.innerHTML = ''; 
  targetDiv2.innerHTML = ''; 

  createVideoContent(idx, seqname, methods, basePath, targetDiv);
  createVideoContent(idx, seqname, methods2, basePath, targetDiv2);

  // if (!targetDiv.hasChildNodes()) {
  //     createVideoContent(idx, seqname, methods, basePath, targetDiv);
  //     createVideoContent(idx, seqname, methods2, basePath, targetDiv2);
  // } else {
  //     updateVideoContent(seqname, methods, basePath, targetDiv);
  //     updateVideoContent(seqname, methods2, basePath, targetDiv2);
  // }
}

function createVideoContent(idx, seqname, methods, basePath, container) {
  var newDiv = document.createElement('div');
  newDiv.className = 'item';
  newDiv.id = idx;
  newDiv.style.display = 'flex';
  newDiv.style.textAlign = 'center'; 
  newDiv.style.justifyContent = 'center';
  newDiv.style.alignItems = 'center';

  methods.forEach(method => {
      var videoSrc = `${basePath}/${seqname}/${method}.mp4`;
      appendVideoElement(newDiv, videoSrc, seqname==='fox-attitude', method==='single_our_ref', method==='single_our_360');
  });

  container.appendChild(newDiv);
  // container.appendChild(document.createElement('br'));
}

function appendVideoElement(parent, src, flag=false, flag2=false, flag3=false, w='16.6%') {
  var videoElement = document.createElement('video');
  setupVideoAttributes(videoElement, w);
  // console.log(is_body);
  // if (is_body){
  //     videoElement.style.paddingLeft = '2.02%';
  //     videoElement.style.paddingRight = '2.02%';
  // }

  // if ((is_gt || is_body) && !no_border){
  //     videoElement.style.borderRight = '2px solid rgba(169, 33, 3, 0.69)';
  // }

  var sourceElement = document.createElement('source');
  sourceElement.src = src;
  sourceElement.type = 'video/mp4';
  videoElement.appendChild(sourceElement);

  // Add error listener for loading fallback placeholder
  videoElement.addEventListener('error', function () {
      showPlaceholder(parent, videoElement);
  });

  if (flag && (flag2 || flag3)){
    var videoElement = document.createElement('div');
    // videoElement.style.display = 'flex';
    // videoElement.style.alignItems = 'center'; 
    // videoElement.style.justifyContent = 'center'; 
    // videoElement.style.height = '100%';
    videoElement.style.display = 'inline-block';
    videoElement.style.width = w;

    // Create paragraph element for the text
    var textElement = document.createElement('p');
    textElement.innerHTML = 'NeRF<br>stage failed'; 
    textElement.style.color = 'rgba(169, 33, 3, 0.69)';
    textElement.style.fontSize = '20px'; 
    textElement.style.textAlign = 'center'; 


    videoElement.appendChild(textElement);
    }

  parent.appendChild(videoElement);
}

function setupVideoAttributes(video, width) {
  video.setAttribute('autoplay', '');
  video.setAttribute('controls', '');
  video.setAttribute('muted', '');
  video.setAttribute('loop', '');
  video.setAttribute('playsinline', '');
  video.style.width = width;
  // video.style.margin = '.2%';
  video.muted = true;
  video.style.display = 'inline-block';
  
}

function showPlaceholder(container, videoElement) {
  var placeholder = document.createElement('img');
  placeholder.src = "./static/videos/placeholder.png";
  placeholder.style.width = videoElement.style.width;
  placeholder.style.margin = videoElement.style.margin;
  container.replaceChild(placeholder, videoElement);
}

function updateVideoContent(seqname, methods, basePath, container) {
  var videos = container.querySelectorAll('video');

  methods.forEach((method, index) => {
      var videoSrc = `${basePath}/${seqname}/${method}.mp4`;
      if (index < videos.length) {
        if (seqname==='fox-attitude' && (method==='our_ref' || method==='our_360')){
          console.log(seqname==='fox-attitude');

          var videoElement = document.createElement('div');
          videoElement.style.display = 'flex';
          videoElement.style.alignItems = 'center'; 
          videoElement.style.justifyContent = 'center'; 
          videoElement.style.height = '100%';
          videoElement.style.width = '16.6%';

          // Create paragraph element for the text
          var textElement = document.createElement('p');
          textElement.innerHTML = 'NeRF<br>stage failed'; 
          textElement.style.color = 'red';
          textElement.style.fontSize = '20px'; 
          textElement.style.textAlign = 'center'; 

          videoElement.appendChild(textElement);
        } else{
            let videoElement = videos[index];
            let sourceElement = videoElement.children[0];
            sourceElement.src = videoSrc;
            videoElement.load(); 
            videoElement.play().catch(error => {
                console.error("Video play failed:", error);
            });
      }} else {
          appendVideoElement(container, videoSrc, seqname==='fox-attitude', method==='our_ref', method==='our_360');
      }
  });
}

function set_inactive(btn) {
  btn.classList.remove('on');
}
function set_active(btn) {
  btn.classList.add('on');
}



function changeinput(seqname, idx){
  var targetDiv = document.getElementById('video_block_input');
  var targetDiv2 = document.getElementById('video_block2_input');

  targetDiv.innerHTML = ''; 
  targetDiv2.innerHTML = ''; 
  
  var basePath = "./static/videos";
  var methods = ['input', 'single-input'];

  

  methods.forEach(method => {
      var newDiv = document.createElement('div');
      newDiv.className = 'item';
      newDiv.id = idx;
      var videoSrc = `${basePath}/${seqname}/${method}.mp4`;
      appendVideoElement(newDiv, videoSrc, seqname==='fox-attitude', method==='our_ref', method==='our_360');

      if (method === 'input'){
        targetDiv.appendChild(newDiv);
      } else{
        targetDiv2.appendChild(newDiv);
      }
  });

  // container.appendChild(document.createElement('br'));

}

function selectVideo(seqname, idx) {
  // const condition2Buttons = document.getElementById('actionID');
  // condition2Buttons.innerHTML = ''; // Clear existing buttons
  // Object.keys(action2id[action]).forEach((cond, index) => {
  //     let button = document.createElement('button');
  //     button.className = 'btn-img-videos';
  //     button.textContent = cond;
  //     button.style.width = '15%';
  //     // button.onclick = () => displayVideos(condition, cond);
  //     button.onclick = () => addVideoBlock(action2id[action][cond], index);
  //     condition2Buttons.appendChild(button);
  // });

  // var img_btns = document.getElementsByClassName('btn-img-videos');
  // img_btns[0].click();
  // set_active(img_btns[0]);

  changeinput(seqname, idx)
  addVideoBlock(seqname, idx)

  var img_btns = document.getElementsByClassName('btn-img');
  if(img_btns.length > 0){
      for(var i = 0; i < img_btns.length; i++) {
          set_inactive(img_btns[i]);
      }
      // selected_index = source_options.indexOf(selected_source);
      // console.log(selected_index);
      set_active(img_btns[idx]);
  }
}

let selectedSequence = 'panda-run-easy';
let selectedBaseline = 'stag4d';
let wild_selectedSequence = 'camel';
let wild_selectedBaseline = 'stag4d';
let cs4d_selectedSequence = 'skull';
let cs4d_selectedBaseline = 'stag4d';

var methodNames = {
  'banmo': 'BANMo',
  'dreamo': 'DreaMo',
  'dm4d': 'DreamMesh4D',
  'l4gm': 'L4GM',
  'stag4d': 'STAG4D',
  }

function selectSequence(seq, idx, is_wild=0, is_cs4d=0) {
  if(is_wild){
    var img_btns = document.getElementsByClassName('wild-btn-img');
    wild_selectedSequence = seq;
  } else if (is_cs4d){
    var img_btns = document.getElementsByClassName('cs4d-btn-img');
    cs4d_selectedSequence = seq;
  }else{
    var img_btns = document.getElementsByClassName('btn-img');
    selectedSequence = seq;
  }
  if(img_btns.length > 0){
      for(var i = 0; i < img_btns.length; i++) {
          set_inactive(img_btns[i]);
      }
      // selected_index = source_options.indexOf(selected_source);
      // console.log(selected_index);
      set_active(img_btns[idx]);
  }
  updateComparison(is_wild, is_cs4d);
}

function selectBaseline(baseline, idx, is_wild=0, is_cs4d=0) {
  if(is_wild){
    var img_btns = document.getElementsByClassName('wild-btn-img-method');
    wild_selectedBaseline = baseline;
  } else if (is_cs4d){
    var img_btns = document.getElementsByClassName('cs4d-btn-img-method');
    cs4d_selectedBaseline = baseline;
  } else{
    var img_btns = document.getElementsByClassName('btn-img-method');
    selectedBaseline = baseline;

  }
  if(img_btns.length > 0){
      for(var i = 0; i < img_btns.length; i++) {
          set_inactive(img_btns[i]);
      }
      // selected_index = source_options.indexOf(selected_source);
      // console.log(selected_index);
      set_active(img_btns[idx]);
  }
  updateComparison(is_wild, is_cs4d);
}

function updateComparison(is_wild=0, is_cs4d=0) {
  if(is_wild){
    var videoContainer = document.getElementById('wild-video-comparison');
    var containerid = "wild-";
    var seq = wild_selectedSequence;
    var baseline = wild_selectedBaseline;
  } else if(is_cs4d){
    var videoContainer = document.getElementById('cs4d-video-comparison');
    var containerid = "cs4d-";
    var seq = cs4d_selectedSequence;
    var baseline = cs4d_selectedBaseline;
  } else{
    var videoContainer = document.getElementById('video-comparison');
    var containerid = "";
    var seq = selectedSequence;
    var baseline = selectedBaseline;
  }
  if(is_cs4d){
    videoContainer.innerHTML = `
      <div class="video">
        <video muted autoplay loop>
          <source src="./static/videos/${seq}/input.mp4" type="video/mp4">
        </video>
      </div>

      <div class="twentytwenty-container" id="${containerid}rgb-container" data-orientation="horizontal" ratio="1.0">
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/${baseline}-view0.mp4" type="video/mp4">
          </video>
        </div>
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/our-view0.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="twentytwenty-container" id="${containerid}depth-container" data-orientation="horizontal" ratio="1.0">
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/${baseline}-view1.mp4" type="video/mp4">
          </video>
        </div>
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/our-view1.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="twentytwenty-container" id="${containerid}third-container" data-orientation="horizontal" ratio="1.0">
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/${baseline}-view2.mp4" type="video/mp4">
          </video>
        </div>
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/our-view2.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    `;
  } else{
    videoContainer.innerHTML = `
      <div class="video">
        <video muted autoplay loop>
          <source src="./static/videos/${seq}/input.mp4" type="video/mp4">
        </video>
      </div>

      <div class="twentytwenty-container" id="${containerid}rgb-container" data-orientation="horizontal" ratio="1.0">
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/${baseline}_ref.mp4" type="video/mp4">
          </video>
        </div>
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/our_ref.mp4" type="video/mp4">
          </video>
        </div>
      </div>

      <div class="twentytwenty-container" id="${containerid}depth-container"  data-orientation="horizontal" ratio="1.0">
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/${baseline}_round.mp4" type="video/mp4">
          </video>
        </div>
        <div class="video">
          <video muted autoplay loop width="100%">
            <source src="./static/videos/${seq}/our_round.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    `;
  }

  // Reinitialize twentytwenty if needed
  if (window.jQuery && $.fn.twentytwenty) {
    $(".twentytwenty-container").twentytwenty({ default_offset_pct: 0.5 });
  }

  var fullName = methodNames[baseline];
  var ele = document.getElementById(`${containerid}rgb-container`).querySelector('.twentytwenty-before-label');
  ele.setAttribute('data-content', fullName);
  var ele = document.getElementById(`${containerid}depth-container`).querySelector('.twentytwenty-before-label');
  ele.setAttribute('data-content', fullName);
  if(is_cs4d){
    var ele = document.getElementById(`${containerid}third-container`).querySelector('.twentytwenty-before-label');
    ele.setAttribute('data-content', fullName);
  }
}


let abl_selectedSequence = 'duck-eat_grass-easy';

function selectAblationSequence(seq, idx) {
  var img_btns = document.getElementsByClassName('abl-btn-img');
  abl_selectedSequence = seq
  if(img_btns.length > 0){
      for(var i = 0; i < img_btns.length; i++) {
          set_inactive(img_btns[i]);
      }
      // selected_index = source_options.indexOf(selected_source);
      // console.log(selected_index);
      set_active(img_btns[idx]);
  }
  updateAblationVideo();
}

function updateAblationVideo() {
  const refRow = document.getElementById('ref-video-row');
  const roundRow = document.getElementById('round-video-row');
  refRow.innerHTML = '';
  roundRow.innerHTML = '';

  const sequence = abl_selectedSequence;
  const basePath = './static/videos';

  const refVideos = [
    `${basePath}/${sequence}/input.mp4`,
    `${basePath}/ablation/${sequence}-cam.mp4`,
    `${basePath}/ablation/${sequence}-cam-pinit.mp4`,
    `${basePath}/ablation/${sequence}-cam-pinit-track.mp4`,
    `${basePath}/ablation/${sequence}-full.mp4`,
  ];

  const roundVideos = [
    `${basePath}/ablation/${sequence}-cam-round.mp4`,
    `${basePath}/ablation/${sequence}-cam-pinit-round.mp4`,
    `${basePath}/ablation/${sequence}-cam-pinit-track-round.mp4`,
    `${basePath}/ablation/${sequence}-full-round.mp4`,
  ];

  for (const src of refVideos) {
    const div = document.createElement('div');
    div.className = 'video';
    div.innerHTML = `
      <video muted autoplay loop style="width: 100%;">
        <source src="${src}" type="video/mp4">
      </video>
    `;
    refRow.appendChild(div);
  }

  const placeholder = document.createElement('div');
  placeholder.className = 'video';
  placeholder.style.visibility = 'hidden';
  roundRow.appendChild(placeholder);

  for (const src of roundVideos) {
    const div = document.createElement('div');
    div.className = 'video';
    div.innerHTML = `
      <video muted autoplay loop style="width: 100%;">
        <source src="${src}" type="video/mp4">
      </video>
    `;
    roundRow.appendChild(div);
  }
}