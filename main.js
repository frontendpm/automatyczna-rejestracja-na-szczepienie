var targetDay = 15; 
var targetMonth = 'maja'
var BreakException = {};
var $btn = $('[aria-label="Szukaj dostępnych wizyt na podstawie wybranych parametrów"]');
var attempts = 0;
var maxattemps = 5;

function start() {
    $btn.click();
    window.setTimeout(function() {
        if(!findVacin()) {
            start();
        }

    }, 3000);
}

function findVacin() {
    var res = false;
    try{
        document.querySelectorAll('.MuiGrid-container').forEach(function(item){
            var date = item.querySelector('p') ? item.querySelector('p').innerText.split(' ') : [0,0];
            if(date[1] == targetMonth && date[0] <= targetDay){
                item.querySelector('button').click();
                reserveVisit();
                res = true;
                throw BreakException;

            }
        });
    }catch (e) {
        if (e !== BreakException) throw e;
    }

    return res;
}

function reserveVisit() {
    window.setTimeout(function(){ 
        var $yes = document.querySelector('[aria-label="Potwierdź wizytę, przejdź do szczegółów wizyt Pacjenta"]');
        var $close = document.querySelector('.fqJcmT');

        if($yes !== null){
            $yes.click();
            console.log('click yes');
        } else {
            if(attempts < maxattemps) {
                attempts +=1;
                reserveVisit();
            }else {
                if($close !== null) {
                    $close.click();
                    attempts=0;
                    start();
                }
            }
            
        }
    },1000);
}


start();


