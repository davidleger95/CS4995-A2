(function(){
    console.log('hi');
    var currObject = '.active', x, y, r=0;
    var curr = {};
    var objects = {
        one: {
            x: 200,
            y: 200,
            r: 0,
        },
        two: {
            x: 500,
            y: 200,
            r: 0,
        }
    };
    
    $(document).mousemove(function(event){
        x = event.pageX - 50; 
        y = event.pageY - 50;
        
        $(currObject).css({'top': y, 'left': x});
    });
    
    $(document).keydown(function(event){
        
        //alert('key!');
        if(event.keyCode == 38){
            r += 10;
            rotateObject();
        }else if(event.keyCode == 40){
            r -= 10;
            rotateObject();
        }else if(event.keyCode == 83){
            swap();
        }
        
        console.log(event);
        
    });
    
    $('.square').on('click', function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            drop($(this).attr('id'));
        }else{
            $(this).addClass('active');
            select($(this).attr('id'));
        }
        
    });
    
    function rotateObject(){
        console.log(r);
        rVal = 'rotateZ(' + r + 'deg)';
        $(currObject).css({'transform': rVal});
    }
            
    function drop(item){
        
        objects[item] = {
            x: x,
            y: y,
            r: r
        };
    }
    
    function select(item){
        
        console.log(item);
        
        x = objects[item].x;
        y = objects[item].y;
        r = objects[item].r;
        
    }
    
})();