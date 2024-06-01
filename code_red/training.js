document.addEventListener("DOMContentLoaded", function () {
    let bulletCount = 10;
	let SbulletCount = 4;
    let gunShotCount = 0;
    let gunHitCount = 0;
    let SShotCount = 0;
    let SHitCount = 0;
	let ThrowCount = 0;
    let pistolProficiency = 0;
	let sniperProficiency = 0;
	let windSpeed =0;
	let initialMouseX = 0;
	let initialMouseY = 0;
	$('.AxeTarget').hide();
	$('#gameHUD').hide();
	$('#gameAxe').hide();
	$('#gameSniper').hide();
	$('#starget').hide();
	$('.display').hide();
	$('#gameInfoContainer').hide();
	$('.key-hints').hide();
	$('#Hints').show();
	$('.sliders').hide();
    const bulletDisplay = document.getElementById('bulletCount');
	const SbulletDisplay = document.getElementById('SbulletCount');
    const shotDisplay = document.getElementById('shotCount');
    const hitDisplay = document.getElementById('hitCount');
	const countDisplay = document.getElementById('Count');
    const proficiencyDisplay = document.getElementById('pistolProficiency');
    const SshotDisplay = document.getElementById('SshotCount');
    const ShitDisplay = document.getElementById('ShitCount');
	const ScountDisplay = document.getElementById('SCount');
    const SproficiencyDisplay = document.getElementById('sniperProficiency');
    const target = document.getElementById('target');
    const weapons = document.querySelectorAll('.weapon');
    const statusBar = document.getElementById('statusBar');
    const statusMessage = document.getElementById('statusMessage');
	const baseInterval = 5000;
    const minInterval = 1000;
    const maxProficiency = 100;
    const proficiencyRatio = pistolProficiency / maxProficiency;
	var slider1 = document.getElementById("slider1");
	var slider2 = document.getElementById("slider2");
    var xValue = document.getElementById("xValue");
    var yValue = document.getElementById("yValue");
	var fixedX = false;
	var fixedY = false;
    var isScore = false;
	const score = document.getElementById('Score');
	const throwingcount = document.getElementById('ThrowCount');
	const axeproficiencyDisplay = document.getElementById('axeProficiency');
	
	function countdown(seconds) {
    for (let i = seconds; i > 0; i--) {
        setTimeout(function () {
            updateStatusBar(`${i}秒後重製...`);
        }, (seconds - i) * 1000);
    }
    setTimeout(function () {
        updateStatusBar('重製完成！');
    }, seconds * 1000);
}
    function updateStatusBar(message) {
        statusMessage.textContent = message;
        statusBar.style.display = 'block';
        setTimeout(() => {
            statusBar.style.opacity = '1';
        }, 10);
    }
    function hideStatusBar() {
        statusBar.style.opacity = '0';
        setTimeout(() => {
            statusBar.style.display = 'none';
        }, 500);
    }

    function showDefaultStatus() {
        updateStatusBar('按 1-3 切換武器');
    }

    showDefaultStatus();
	

    function generateTarget() {
        target.innerHTML = '';


        const randomX = Math.floor(Math.random() * (window.innerWidth - 150)) + 50;
        const randomY = Math.floor(Math.random() * (window.innerHeight - 150)) + 50;


        const targetImg = document.createElement('img');
        targetImg.src = 'target.png';
        targetImg.style.position = 'absolute';
        targetImg.style.left = randomX + 'px';
        targetImg.style.top = randomY + 'px';
        targetImg.style.width = '100px';
        targetImg.style.height = '100px';
        targetImg.addEventListener('click', hitTarget);
        target.appendChild(targetImg);

        targetTimer =setTimeout(generateTarget,  1000);
    }

    function hitTarget() {
        if(bulletCount > 0){
        gunHitCount++;
        pistolProficiency += 10;
        proficiencyDisplay.textContent = pistolProficiency;
		updateStatusBar('命中!');

					setTimeout(function () {
						hideStatusBar();
					}, 3000);
        this.remove();}
    }
	 function stopTargetGeneration() {
		$('#target img').remove();
        clearTimeout(targetTimer);
    }
	

    document.addEventListener('keydown', function (event) {
	
		
		if (!throwingaxe.classList.contains('selected')) {
        if (event.code === 'KeyR') {
            bulletCount = 0;
            bulletDisplay.textContent = bulletCount;
            updateStatusBar('裝彈中...');

            setTimeout(function () {
                bulletCount = 10;
                bulletDisplay.textContent = bulletCount;
                hideStatusBar();
            }, 4000);
			setTimeout(function () {
                SbulletCount = 4;
                SbulletDisplay.textContent = SbulletCount;
                hideStatusBar();
            }, 4000);
        }
		}
        const weaponKeys = {
            'Digit1': 'pistol',
            'Digit2': 'sniper',
            'Digit3': 'throwingaxe',
        };

        if (weaponKeys[event.code]) {
            weapons.forEach(w => w.classList.remove('selected'));
            const selectedWeapon = document.getElementById(weaponKeys[event.code]);
            selectedWeapon.classList.add('selected');
			updateStatusBar(`${selectedWeapon.textContent} 已選擇`);
			$('.key-hints').hide();
            switch (weaponKeys[event.code]) {
			case 'pistol':
				$('#pistolHints').show();
                $('#bulletDisplay').show();
				$('#SbulletDisplay').hide();
                generateTarget(); 
				$('#gameHUD').show();
				$('#gameSniper').hide();
				$('#gameAxe').hide();
				$('#starget').hide();
				$('.AxeTarget').hide();
				$('.sliders').hide();
				$('h1').hide();
				$('#bg').hide();	
				$('body').css('cursor', 'url("aim.png"),auto');
				$('html').css('cursor', 'url("aim.png"),auto');
				$('#gameInfoContainer').hide();
				$('.display').hide();
				$('#target').show();
				$('h1').hide();
				$('#bg').hide();	
				break;
           case 'sniper':
				$('#sniperHints').show();
                $('#bulletDisplay').hide();
				$('#SbulletDisplay').show();
				$('#gameHUD').hide();
				$('#gameSniper').show();
				$('#gameAxe').hide();
				$('.AxeTarget').hide();
				stopTargetGeneration();
				generateAnimatedTarget(windSpeed);
				$('#starget').show();
				$('html').css('cursor', 'none');
				$('body').css('cursor', 'none');
				$('.display').show();
				$('#gameInfoContainer').hide();
				$('.sliders').hide();
				$('h1').hide();
				$('#bg').hide();	

				break;
			case 'throwingaxe':
				$('#axeHints').show();
                $('#bulletDisplay').hide();
				$('#SbulletDisplay').hide();
				$('#gameHUD').hide();
				$('#gameSniper').hide();
				$('#gameAxe').show();
				$('.AxeTarget').show();
				stopTargetGeneration();
				$('#starget').hide();
				$('html').css('cursor', 'none');
				$('body').css('cursor', 'none');
				$('.display').hide();
				$('#gameInfoContainer').show();
				$('#target').hide();
				$('.sliders').show();
				$('h1').hide();
				$('#bg').hide();	
				break;
            }
        }
    });

    $('#bulletDisplay').hide();
	$('#SbulletDisplay').hide();
    weapons.forEach(weapon => {
        weapon.addEventListener('click', function () {
            weapons.forEach(w => w.classList.remove('selected'));
            this.classList.add('selected');
            switch(this.id){
            case 'pistol':
			    $('#bulletDisplay').show();
				$('#SbulletDisplay').hide();
                generateTarget();
				$('#starget').hide();
				$('.AxeTarget').hide();
				$('body').css('cursor', 'url("aim.png"),auto');
				$('html').css('cursor', 'url("aim.png"),auto');
				$('.display').hide();
				$('#target').show();
				generateTarget(); 
				$('.sliders').hide();
				$('h1').hide();
				$('#bg').hide();	
				break;
				
            case 'sniper':
                $('#bulletDisplay').hide();
				$('#SbulletDisplay').show();
				$('.AxeTarget').hide();
				$('#gameAxe').show();
				stopTargetGeneration(); 
				generateAnimatedTarget(windSpeed);
				$('#starget').show();
				$('html').css('cursor', 'none');
				$('body').css('cursor', 'none');
				$('.display').show();
				$('.sliders').hide();
				$('h1').hide();
				$('#bg').hide();	

				break;
				
            case 'throwingaxe':
                $('#bulletDisplay').hide();
				$('#SbulletDisplay').hide();
				$('.AxeTarget').show();
				stopTargetGeneration(); 
				$('#starget').hide();
				$('html').css('cursor', 'none');
				$('body').css('cursor', 'none');
				$('#zoom').hide();
				$('#target').hide();
				$('.sliders').show();
				$('h1').hide();
				$('#bg').hide();	

				break;
            }	
            updateStatusBar(`${this.textContent} 已選擇`);
        });
    });
	console.log(parseInt(pistolProficiency) ,parseInt(sniperProficiency) ,parseInt(document.getElementById('axeProficiency').textContent));
	 document.addEventListener('keydown', function (event) {
		if (event.code === 'Space') {
        var link = "code_red.html";
        link += '?gunHitCount=' + gunShotCount + '&SShotCount=' + SShotCount + '&ThrowCount=' + ThrowCount;
		let temp = parseInt(localStorage.getItem('ability'));
		var ability = parseInt(pistolProficiency) + parseInt(sniperProficiency) + parseInt(document.getElementById('axeProficiency').textContent);
		if(temp)
		localStorage.setItem('ability', temp+ability );
		else
		localStorage.setItem('ability', ability );
        window.location.href = link;
	
    }
    if (throwingaxe.classList.contains('selected')) {
		$('h1').hide();
		$('#bg').hide();	
		function calculateDistance(x1, y1, x2, y2) {
		  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		}

		 var speed = 300; 
		  setInterval(function() {
			 if (!fixedX) slider1.value = Math.floor(Math.random() * 101);
			 if (!fixedY) slider2.value = Math.floor(Math.random() * 101);
			updateTarget();
		  }, speed);

		  slider1.addEventListener("input", updateTarget);
		  slider2.addEventListener("input", updateTarget);
		  var speed = 10; 
		  var sliderInterval;
		  function startSliderMovement() {
			sliderInterval = setInterval(function() {
			  if (!fixedX) slider1.value = Math.floor(Math.random() * 101);
			  if (!fixedY) slider2.value = Math.floor(Math.random() * 101);

			  updateTarget();
			}, speed);
		  }
		  startSliderMovement();


		  slider1.addEventListener("input", updateTarget);
		  slider2.addEventListener("input", updateTarget);

		  function updateTarget() {
				var x = slider1.value;
				var y = slider2.value;
				document.querySelector('.aiming-point').style.left = x + '%';
				document.querySelector('.aiming-point').style.top = y + '%';

				 var axeTarget = document.querySelector('.AxeTarget');
				  var axeTargetRect = axeTarget.getBoundingClientRect();
				  var aimingPointRect = document.querySelector('.aiming-point').getBoundingClientRect();

				  var axeTargetCenterX = axeTargetRect.left + axeTargetRect.width / 2;
				  var axeTargetCenterY = axeTargetRect.top + axeTargetRect.height / 2;
				  var aimingPointX = aimingPointRect.left + aimingPointRect.width / 2;
				  var aimingPointY = aimingPointRect.top + aimingPointRect.height / 2;
				  var distance = calculateDistance(axeTargetCenterX, axeTargetCenterY, aimingPointX, aimingPointY);

				if(fixedY&&fixedX&&!isScore){
				  if (distance <= 50) {
					score.textContent = eval(parseInt(score.textContent)+100);
					updateStatusBar('命中紅色區域! 加100分!');

							setTimeout(function () {
								hideStatusBar();
							}, 5000);
				  } else if (distance <= 100) {
					score.textContent = eval(parseInt(score.textContent)+50);
					updateStatusBar('命中白色區域! 加50分!');

							setTimeout(function () {
								hideStatusBar();
							}, 5000);
				  } else if (distance <= 150) {
					score.textContent = eval(parseInt(score.textContent)+30);
					updateStatusBar('命中藍色區域! 加30分!');

							setTimeout(function () {
								hideStatusBar();
							}, 5000);
				  } else if (distance <= 175) {
					score.textContent = eval(parseInt(score.textContent)+20);
					updateStatusBar('命中黃色區域! 加20分!');

							setTimeout(function () {
								hideStatusBar();
							}, 5000);
				  } else if (distance <= 200) {
					score.textContent = eval(parseInt(score.textContent)+10); 
					updateStatusBar('命中黑色區域! 加10分!');

							setTimeout(function () {
								hideStatusBar();
							}, 5000);
				  }
				  else{
					 score.textContent = eval(parseInt(score.textContent)-100); 
					 updateStatusBar('命中圈外! 減100分!');

							setTimeout(function () {
								hideStatusBar();
							}, 5000);
				  }
				  isScore=true;
				  ThrowCount++;
				  throwingcount.textContent=ThrowCount;
				  if(parseInt(score.textContent)>(ThrowCount*25))
					  axeproficiencyDisplay.textContent=parseInt( axeproficiencyDisplay.textContent)+10;
				  setTimeout(function () {
								countdown(5);
							}, 2000);
				  
				  setTimeout(function () {
				  clearInterval(sliderInterval);
				  fixedX = false;
				  fixedY = false;
				  isScore=false;
				  slider1.value = 50;
				  slider2.value = 50;
				  startSliderMovement();}
				  , 7000);
					  
				}
				
		  }

		  document.addEventListener('keydown', function(event) {
			  
			if (event.code === 'KeyQ') {
			  fixedX = true;
			} else if (event.code === 'KeyE') {
			  fixedY = true;
			}  else if (event.code === 'Space') {
			var link = "code_red.html";
				window.location.href = link;}
		  });
    
}
          else{
		  $('#target').show();
}
});
    document.addEventListener('click', function (event) {
        const pistol = document.getElementById('pistol');
		const sniper = document.getElementById('sniper');

        if (pistol.classList.contains('selected')) {
            if (bulletCount > 0) {
                const spark = document.createElement('div');
                spark.classList.add('spark');
                spark.style.left = event.clientX + 'px';
                spark.style.top = event.clientY + 'px';
                document.body.appendChild(spark);
                setTimeout(() => {
                    spark.remove();
                }, 100);

                const bulletHole = document.createElement('div');
                bulletHole.classList.add('bulletHole');
                bulletHole.style.left = (event.clientX - target.offsetLeft) + 'px';
                bulletHole.style.top = (event.clientY - target.offsetTop) + 'px';
                target.appendChild(bulletHole);
                setTimeout(() => {
                    bulletHole.remove();
                }, 2000);

                bulletCount--;
                bulletDisplay.textContent = bulletCount;
				gunShotCount++;
				shotDisplay.textContent = gunShotCount;
				countDisplay.textContent=gunHitCount;
				hitDisplay.textContent = ((gunHitCount / gunShotCount) * 100).toFixed(2) + '%';
            } else {
                updateStatusBar('子彈不足，無法射擊！');
		}}
			if (sniper.classList.contains('selected')) {
				if (SbulletCount > 0) {
					const sniper = document.getElementById('sniper');
					const zoom = document.getElementById('zoom');
					const starget = document.getElementById('starget');
					const windDisplay = document.getElementById('windDisplay');
					const x = zoom.offsetLeft + zoom.offsetWidth / 2;
					const y = zoom.offsetTop + zoom.offsetHeight / 2;
					const spark = document.createElement('div');
					spark.classList.add('spark');
					spark.style.left = event.clientX + 'px';
					spark.style.top = event.clientY + 'px';
					document.body.appendChild(spark);
					setTimeout(() => {
						spark.remove();
					}, 100);
					const bulletHole = document.createElement('div');
					bulletHole.classList.add('bulletHole');

					const windSpeed = parseFloat(windDisplay.textContent);

					const deviationX =  windSpeed * 30;
					const deviationY =  windSpeed * 30;
					
		
					bulletHole.style.left = (event.clientX + deviationX) + 'px';
					bulletHole.style.top = (event.clientY + deviationY) + 'px';
					document.body.appendChild(bulletHole);
					setTimeout(() => {
						bulletHole.remove();
					}, 2000);

					zoom.style.left = event.clientX - zoom.offsetWidth / 2 + 'px';
					zoom.style.top = event.clientY - zoom.offsetHeight / 2 + 'px';

					if (isHit(x + deviationX, y + deviationY, starget)) {
						hitSniperTarget();
					}
					SbulletCount--;
					SbulletDisplay.textContent = SbulletCount;
					SShotCount++;
					SshotDisplay.textContent = SShotCount;
					ScountDisplay.textContent=SHitCount;
					ShitDisplay.textContent = ((SHitCount / SShotCount) * 100).toFixed(2) + '%';
			} 
				 else {
                updateStatusBar('子彈不足，無法射擊！');				
        }
			}});
	document.oncontextmenu = function (event) {
		event.preventDefault(); // 阻止默認行為
	};
	function generateWindSpeed() {
			windSpeed = Math.random() * 4 - 2;
			windDisplay.textContent = windSpeed.toFixed(2);
		}




   document.onmousemove = function (event) {
    const sniper = document.getElementById('sniper');
    const zoom = document.getElementById('zoom');
	const starget= document.getElementById('starget');
	const zoomLevel = document.getElementById('zoom-level');

    if (sniper.classList.contains('selected')) {
		$('h1').hide();
		$('#bg').hide();	
        $('#gameHUD').hide();
        $('#zoom').show();
        $('#gameSniper').show();
        stopTargetGeneration(); 
        const x = event.clientX - zoom.offsetWidth / 2;
        const y = event.clientY - zoom.offsetHeight / 2;
		

        zoom.style.left = x + 'px';
        zoom.style.top = y + 'px';
		 if (isMouseOverTarget(x, y, starget)) {
		 const magnification = event.buttons === 2 ? 4 : 2;
		 starget.style.transform = `scale(${magnification})`;
		 zoomLevel.textContent = `${magnification}x`;
		 }
		 else{
			 const magnification = event.buttons === 2 ? 4 : 2;
		starget.style.transform = `scale(1)`;
		zoomLevel.textContent = `${magnification}x`;
		 }
		  initialMouseX = event.clientX;

		initialMouseY = event.clientY;
    } else {
        $('#zoom').hide();
    }
};
 function isMouseOverTarget(mouseX, mouseY, target) {
			const zoom = document.getElementById('zoom');
            const rect = target.getBoundingClientRect();
            return mouseX + 100 + zoom.offsetWidth / 2 >= rect.left && mouseX-100 + zoom.offsetWidth / 2 <= rect.right&& mouseY + zoom.offsetHeight / 2 + 100 >= rect.top&& mouseY + zoom.offsetHeight / 2 -100 <= rect.bottom ;
        }
setTimeout(generateWindSpeed,2000)
function generateAnimatedTarget() {
            const starget = document.getElementById('starget');
            const targetWidth = 100;
            const screenHeight = window.innerHeight;
            const targetY = (screenHeight - targetWidth) / 2; 

            starget.style.top = targetY + 'px';

            let direction = 1;
            const speed = 2;
            function moveTarget() {
                const screenWidth = window.innerWidth;
                let targetX = parseFloat(starget.style.left || '0');
                targetX += direction * speed;

                if (targetX <= 0 || targetX + targetWidth >= screenWidth) {
                    direction *= -1; 
                }

                starget.style.left = targetX + 'px';
                requestAnimationFrame(moveTarget);
            }

            moveTarget();
        }
	function isHit(x, y, target) {
		const rect = target.getBoundingClientRect();
		return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
	}

    function hitSniperTarget() {
		if(bulletCount > 0){
        SHitCount++;
        sniperProficiency += 10;
        SproficiencyDisplay.textContent = sniperProficiency;
		updateStatusBar('命中!');

					setTimeout(function () {
						hideStatusBar();
					}, 3000);
		generateAnimatedTarget(windSpeed);
		}}

});
 document.addEventListener('keydown', function(event) {
		 if (event.code === 'Space') {
		var link = "code_red.html";
			window.location.href = link;}
			
		});