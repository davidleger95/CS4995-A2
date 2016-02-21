(function(){
    var map = {};
    $(document).keydown(function(e) {
        map[e.keyCode] = true;
    }).keyup(function(e) {
        if (e.keyCode in map) {
            map[e.keyCode] = false;
        }
    });
    
    var currObject = '.active', x, y, r=0, c=0, o=1;
    var curr = {};
    var inputScheme = 1;
    var wheel;
    var objects = {
        one: {
            x: 200,
            y: 200,
            r: 0,
            c: 0,
            o: 1
        },
        two: {
            x: 500,
            y: 200,
            r: 0,
            c: 0,
            o: 1
        }
    };
    
    $(document).keydown(function(event){
        if(event.keyCode == 192){
            if(inputScheme == 1){
                inputScheme++;
                $('body').removeClass('mouseR');
            }else if(inputScheme == 2){
                inputScheme++;
                $('body').removeClass('mouse');
            }else{
                inputScheme = 1;
                $('body').addClass('mouse');
                $('body').addClass('mouseR');
            }
            alert("Now using input scheme " + inputScheme);
        }
    });
                        
    
        $(document).mousemove(function(event){
            if(inputScheme == 1 || inputScheme == 2){
                x = event.pageX - 50; 
                y = event.pageY - 50;

                $(currObject).css({'top': y, 'left': x});
            }
        });
    
        
        $(document).bind('mousewheel', function(e) {
            if(inputScheme == 1){
                wheel = parseInt(e.originalEvent.wheelDelta/3);
                r += wheel;
                rotateObject();
            }
        });

        $(document).keydown(function(event){
        
            if(inputScheme == 1){
                
                if(event.keyCode == 67){
                    c++;
                    if(c > 11){
                        c=0;
                    }
                    changeColor(c);
                }else if(event.keyCode == 37){
                    if(o > 0){
                        o -= 0.1;
                    }
                    changeOpacity(o);
                }
                else if(event.keyCode == 39){
                    if(o < 1){
                        o += 0.1;
                    }
                    changeOpacity(o);
                }
            }else if(inputScheme == 2){
                
                if(event.keyCode == 87){
                    r += 5;
                    rotateObject();
                }else if(event.keyCode == 83){
                    r -= 5;
                    rotateObject();
                }else if(event.keyCode == 82){
                    c++;
                    if(c > 11){
                        c=0;
                    }
                    changeColor(c);
                }else if(event.keyCode == 70){
                    c--;
                    if(c < 0){
                        c=11;
                    }
                    changeColor(c);
                }else if(event.keyCode == 65){
                    if(o > 0){
                        o -= 0.1;
                    }
                    changeOpacity(o);
                }
                else if(event.keyCode == 68){
                    if(o < 1){
                        o += 0.1;
                    }
                    changeOpacity(o);
                }
            }else if(inputScheme == 3){
                if(map[87]){
                    
                    r += 5;
                    rotateObject();
                    
                }else if(map[83]){
                    r -= 5;
                    rotateObject();
                }
                if(map[82]){
                    c++;
                    if(c > 11){
                        c=0;
                    }
                    changeColor(c);
                }
                if(map[81]){
                    swapObject();
                }
                if(map[49]){
                    c = 0;
                    changeColor(c);
                }else if(map[50]){
                    c = 1;
                    changeColor(c);
                }else if(map[51]){
                    c = 2;
                    changeColor(c);
                }else if(map[52]){
                    c = 3;
                    changeColor(c);
                }else if(map[53]){
                    c = 4;
                    changeColor(c);
                }else if(map[54]){
                    c = 5;
                    changeColor(c);
                }else if(map[55]){
                    c = 6;
                    changeColor(c);
                }else if(map[56]){
                    c = 7;
                    changeColor(c);
                }else if(map[57]){
                    c = 8;
                    changeColor(c);
                }else if(map[48]){
                    c = 9;
                    changeColor(c);
                }else if(map[189]){
                    c = 10;
                    changeColor(c);
                }else if(map[187]){
                    c = 11;
                    changeColor(c);
                }
                if(map[65]){
                    if(o > 0){
                        o -= 0.1;
                    }
                    changeOpacity(o);
                }
                else if(map[68]){
                    if(o < 1){
                        o += 0.1;
                    }
                    changeOpacity(o);
                }
                
                if(map[38]){
                    y -= 5;
                    $(currObject).css({'top': y});
                    
                }
                if(map[40]){
                    y += 5;
                    $(currObject).css({'top': y});
                }
                
                if(map[37]){
                    x -= 5;
                    $(currObject).css({'left': x});
                }
                if(map[39]){
                    x += 5;
                    $(currObject).css({'left': x});
                }
            }
        });
        
    function swapObject(){
        var active = $('.active').attr('id');
        console.log(active);
        if(active == 'one'){
            drop(active);
            $('#one').removeClass('active');
            $('#two').addClass('active');
            select('two');
        }else{
            drop(active);
            $('#two').removeClass('active');
            $('#one').addClass('active');
            select('one');
        }
        
    }
 
    $('.square').on('click', function(){
        if(inputScheme != 3){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                drop($(this).attr('id'));
            }else{
                $(this).addClass('active');
                select($(this).attr('id'));
            }
        }
        
    });
    
    function rotateObject(){
        console.log(r);
        rVal = 'rotateZ(' + r + 'deg)';
        $(currObject).css({'transform': rVal});
    }
    
    function changeColor(colorIndex){
        var colors = ["#fef300","#ffc600","#ff9400","#f36623",
                      "#ee1d24","#93278f","#662e92","#2e3293",
                      "#0255a7","#01a99e","#00a753","#8dc800"];
        
        $(currObject).css({'background': colors[colorIndex]});
    }
    
    function changeOpacity(opacity){
        $(currObject).css({'opacity': opacity});
    }
            
    function drop(item){
        
        objects[item] = {
            x: x,
            y: y,
            r: r,
            c: c,
            o: o
        };
    }
    
    function select(item){
        
        x = objects[item].x;
        y = objects[item].y;
        r = objects[item].r;
        c = objects[item].c;
        o = objects[item].o;
        
    }
    
})();