document.addEventListener("DOMContentLoaded", function() {
    let bulletCount = 11;
    const bulletDisplay = document.getElementById('bulletCount');
    const target = document.getElementById('target');
    const weapons = document.querySelectorAll('.weapon');
    const statusBar = document.getElementById('statusBar');
    const statusMessage = document.getElementById('statusMessage');

    // 监听键盘事件
    document.addEventListener('keydown', function(event) {
        if (event.code === 'KeyR') {
            bulletCount = 0; // 子弹数量归零
            bulletDisplay.textContent = bulletCount; // 更新子弹数量显示

            // 显示状态栏信息为 "装弹中..."
            updateStatusBar('裝彈中...');

            // 2 秒后恢复子弹数量为 10
            setTimeout(function() {
                bulletCount = 10;
                bulletDisplay.textContent = bulletCount;
                hideStatusBar(); // 隐藏状态栏
            }, 3000);
        }
    });

    // 隐藏子弹显示区域
    $('#bulletDisplay').hide();

    // 监听武器点击事件
    weapons.forEach(weapon => {
        weapon.addEventListener('click', function() {
            // 移除所有武器的选中状态
            weapons.forEach(w => w.classList.remove('selected'));
            // 添加选中状态到当前点击的武器
            this.classList.add('selected');

            // 如果选中了手枪
            if (this.id === 'pistol') {
                // 显示子弹显示区域
                $('#bulletDisplay').show();
            } else {
                // 隐藏子弹显示区域
                $('#bulletDisplay').hide();
            }
        });
    });

    // 射击事件监听
    document.addEventListener('click', function(event) {
        const pistol = document.getElementById('pistol');

        // 如果选中了手枪
        if (pistol.classList.contains('selected')) {
            // 射击动作
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

                // 减少子弹数量
                bulletCount--;
                bulletDisplay.textContent = bulletCount;
            } else {
                // 子弹数量为零，无法射击，显示状态栏信息
                updateStatusBar('子彈不足，無法射擊！');
            }
        }
    });

    // 狙击枪放大效果监听
    let isSniperSelected = false; // 是否选中了狙击枪
    document.addEventListener('contextmenu', function(event) {
        if (isSniperSelected) {
            event.preventDefault(); // 阻止默认的右键菜单行为
            // 添加放大效果的样式
			enableSniperScope();
            target.classList.toggle('zoomed');
        }
    });

    // 武器选择监听
    weapons.forEach(weapon => {
        weapon.addEventListener('click', function() {
            // 移除所有武器的选中状态
            weapons.forEach(w => w.classList.remove('selected'));
            // 添加选中状态到当前点击的武器
            this.classList.add('selected');
            // 更新是否选中了狙击枪的状态
            isSniperSelected = this.id === 'sniper';
        });
    });

    // 更新状态栏信息函数
    function updateStatusBar(message) {
		statusMessage.textContent = message; // 设置状态消息
		statusMessage.style.color = 'white'; // 设置文本颜色
		statusMessage.style.fontSize = '30px'; // 设置字体大小，根据需要调整
		statusBar.style.display = 'block'; // 显示状态栏
	}

    // 隐藏状态栏函数
    function hideStatusBar() {
        statusBar.style.display = 'none'; // 隐藏状态栏
    }
});
function enableSniperScope() {
    var pos = document.getElementById('pos');
    var aim1 = document.getElementById('aim1');
    var aim2 = document.getElementById('aim2');
    var dwint = 10;
    var lfint = 0;

    function keyd(event) {
        if (event.key === 'ArrowDown') {
            pos.style.top = (dwint + 50) + 'px';
        } else if (event.key === 'ArrowUp') {
            pos.style.top = (dwint - 50) + 'px';
        } else if (event.key === 'ArrowLeft') {
            pos.style.left = (lfint - 50) + 'px';
        } else {
            pos.style.left = (lfint + 50) + 'px';
        }
    }

    var t = null;
    var Xindex;
    var Yindey;

    document.onmousemove = function (event) {
        if (t) return;
        t = setTimeout(() => {
            if (Math.abs(Xindex - (event.clientX - 205)) < 20 && Math.abs(Yindey - (event.clientY - 205)) < 20) { //坐标改变小
                pos.style.boxShadow = '0px 0px 15px 5px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '0px';
                aim2.style.marginTop = '0px';
            } else if (Xindex > event.clientX - 205 && Math.abs(Yindey - (event.clientY - 205)) < 10) { //向左
                pos.style.boxShadow = '30px 0px 15px 8px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '50px';
            } else if (Yindey > event.clientY - 205 && Math.abs(Xindex - (event.clientX - 205)) < 10) { //向上
                pos.style.boxShadow = '0px 30px 15px 8px rgb(0, 0, 0) inset';
                aim2.style.marginTop = '50px';
            } else if (Xindex < event.clientX - 205 && Math.abs(Yindey - (event.clientY - 205)) < 10) { //向右
                pos.style.boxShadow = '-30px 0px 15px 8px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '-50px';
            } else if (Yindey < event.clientY - 205 && Math.abs(Xindex - (event.clientX - 205)) < 10) { //向下
                pos.style.boxShadow = '0px -30px 15px 8px rgb(0, 0, 0) inset';
                aim2.style.marginTop = '-50px';
            } else if (Xindex > event.clientX - 205 && Yindey > event.clientY - 205) { //左上
                pos.style.boxShadow = '30px 30px 15px 8px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '50px';
                aim2.style.marginTop = '50px';
            } else if (Xindex < event.clientX - 205 && Yindey > event.clientY - 205) { //右上
                pos.style.boxShadow = '-30px 30px 15px 8px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '-50px';
                aim2.style.marginTop = '50px';
            } else if (Xindex < event.clientX - 205 && Yindey < event.clientY - 205) { //右下
                pos.style.boxShadow = '-30px -30px 15px 8px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '-50px';
                aim2.style.marginTop = '-50px';
            } else { //左下
                pos.style.boxShadow = '30px -30px 15px 8px rgb(0, 0, 0) inset';
                aim1.style.marginLeft = '50px';
                aim2.style.marginTop = '-50px';
            }
            pos.style.top = (event.clientY - 205) + 'px';
            Yindey = event.clientY - 205;
            dwint = event.clientY - 205;
            pos.style.left = (event.clientX - 205) + 'px';
            Xindex = event.clientX - 205;
            lfint = event.clientX - 205;
            t = null;
        }, 80);
    }
}

// 使用狙擊槍時啟用狙擊鏡效果
enableSniperScope();
