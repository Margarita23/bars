$(function(){

    var generateDotsForSideBar = function() {
        var allSections = $('.wrapper').find('.section');
        var sideBar = $('.side-bar');
        allSections.each(function() {
            var dot = $('<li>', {
                attr : {
                    class : 'side-bar__item'
                },
                html : '<a href="#" class="side-bar__link"></a>'
            });
            sideBar.append(dot);
        }); 
        
        
        sideBar.find('li').first().addClass('side-bar__item--active');
    }

    generateDotsForSideBar();

    var moveSlide = function(container, slideNum) {
        var items = container.find('.section'),
            activeSlide = items.filter('.active'),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            list = container.find('.scroll__list'),
            duration = 800;

        if(reqItem.length){ 
            list.clearQueue().animate({
                'top' : -reqIndex * 100 + '%',
            }, duration, function(){
                activeSlide.removeClass('active');
                reqItem.addClass('active');

                $('.side-bar').children().eq(activeSlide.index()).removeClass('side-bar__item--active');
                $('.side-bar').children().eq(reqIndex).addClass('side-bar__item--active');
            });
        }
    }

    $('.wrapper').on('wheel', function(e){
        var $this = false;
        let direction = 'stay';

        if (e.originalEvent.deltaY >=100) { //down
            $this = true;
            direction = 'down';
        }
            
        if(e.originalEvent.deltaY <= -100) { //up
            $this = true;
            direction = 'up';
        }

        if($this){
            var container = $('.wrapper'),
                items = $('.section', container),
                activeSection = items.filter('.active'),
                existedItem, edgeItem, reqItem;

            if(direction === 'down') {
                existedItem = activeSection.next();
                edgeItem = items.first();
            }
            if(direction === 'up') {
                existedItem = activeSection.prev();
                edgeItem = items.last();
            }
            reqItem = existedItem.length ? existedItem.index() : edgeItem.index();
            moveSlide(container, reqItem); 
        }
    });  
});
