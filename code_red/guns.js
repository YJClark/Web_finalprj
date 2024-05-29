   $('table').hide();
        function showItem(cata){
            $('main span').each(function(index, element) {
                $(element).removeClass('active');
            });
            $(cata).addClass('active');

            $('.gun-list').empty();
            var categories = {
                "Handgun": ['Revolver', 'Derringer', 'Pistol', 'MachinePistol'],
                "MachineGun": ['M60', 'LMG', 'MMG', 'HMG'],
                "SMG": ['SubmachineGun'],
                "Rifle": ['AssaultRifle', 'BattleRifle', 'Carbine'],
                "SniperRifle": ['SniperRifle'],
                "Shotgun": ['CombatShotgun', 'PumpShotgun']
            };
            
            var guns = categories[cata.innerHTML];
            var ul = $('<ul></ul>');
            for (var i = 0 ; i < guns.length ; i++) {   
                var li = $('<li onclick="showTable(this)" class="' + cata.innerHTML.replace(/\s+/g, '') + '">' + guns[i] + '</li>');
                ul.append(li);
            }
            $('#' + (cata.innerHTML === "Handgun" ? 1 : 
                      cata.innerHTML === "MachineGun" ? 2 : 
                      cata.innerHTML === "SMG" ? 3 : 
                      cata.innerHTML === "Rifle" ? 4 : 
                      cata.innerHTML === "SniperRifle" ? 5 :
					   cata.innerHTML === "Shotgun" ? 6 :7)).append(ul);
        }

        function showTable(gun){
            $('table').hide();
            var gunType = $(gun).text();
            $('table#' + gunType.replace(/\s+/g, '')).show();
            
            $('li').removeClass('active');
            $(gun).addClass('active');
        }
		$(document).ready(function(){
    $(document).click(function(e){
        var gunshot = $('<div class="gunshot"></div>');
        gunshot.css({
            position: 'fixed',
            top: e.pageY - 5,
            left: e.pageX - 5,
            width: '10px',
            height: '10px',
            background: 'url("hole.jpg")',
            borderRadius: '50%',
            zIndex: '9999'
        });
        $('body').append(gunshot);
        gunshot.fadeOut(1000, function(){
            $(this).remove();
        });
    });
});
 function updatePrice(price, itemImage) {
            window.parent.postMessage({ type: 'priceUpdate', price: price ,itemImage: itemImage}, '*');
        }
