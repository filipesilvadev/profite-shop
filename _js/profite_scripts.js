$(document).ready(function() {

  WebFontConfig = {
    google: { families: [ 'Lato:100,400,700,300:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

  (function sliderProfite(){
    var $overview = $('#slide .overview'),
      	$viewport = $('#slide .viewPort'),
      	$prevBtn  = $('#slideController .prev'),
      	$nextBtn  = $('#slideController .next'),
      	min = 1,
        max = $viewport.length;

    $nextBtn.click(function(){
        if (min+1 > max) return;
        min++;
        $($overview).animate({left: "-=100.3%"},1000);
    });

    $prevBtn.click(function(){
        if (min-1 < 1) return;
        min--; 
        $($overview).animate({left: "+=100.3%"},1000);
    });

 })();

  (function profiteShop(){     
    $.getJSON('data.json', function(data){
      var $json = data;

      for (var i = 0; i < $json.length; i++) {
      
        var id = '.prod_'+[i],
            showcase = $('.products ul'),
            products = $('.products ul li'),
            
            getPrice = parseFloat(Math.round($json[i].price * 100) / 100).toFixed(2),
            price = getPrice.toString().replace('.',','),
            
            getOldPrice = parseFloat($json[i].oldPrice).toFixed(2),
            oldPrice = getOldPrice.toString().replace('.',','),
            
            getParcel = parseFloat(Math.round(getPrice / $json[i].parcelTimes * 100) / 100).toFixed(2),
            parcelPrice = getParcel.toString().replace('.', ','),

            li = $(
              '<li class="product" id="prod_'+[i]+'">'+
                '<span class="free-shipping"></span>'+
                '<span class="news"></span>'+
                '<div class="product-wrap">'+
                  '<img src="_img/'+$json[i].productName.replace(/ /g, '-')+'.jpg" alt="'+$json[i].productName+'">'+
                  '<div class="price">'+
                    '<div class="rating">'+
                      '<div class="stars-rate"></div>'+
                    '</div>'+
                    '<h3>'+
                      '<a href="#">'+$json[i].productName+'</a>'+
                    '</h3>'+
                    '<span class="old-price">'+
                      'R$'+oldPrice+
                    '</span>'+
                    '<span class="new-price">'+
                      'R$ <span>'+price+'</span>'+
                    '</span>'+
                    '<p class="parcel">'+
                      '<span>ou </span>'+$json[i].parcelTimes+' x<span> de </span>'+parcelPrice+
                    '</p>'+
                  '</div>'+
                '</div>'+
                '<button id="add-cart_'+[i]+'" onClick="window.location.reload()">Adicionar ao carrinho</button>'+
              '</li>'
              );

            showcase.append(li);

            var rate = $json[i].rating,
                rateLevel  = $('#prod_'+[i]+' .rating .stars-rate'),
                shipping   = $json[i].freeShipping,
                shipLabel  = $('#prod_'+[i]+' .free-shipping'),
                news       = $json[i].news,
                newsLabel  = $('#prod_'+[i]+' .news'),
                promotion  = $json[i].promotion,
                promoLabel = $('#prod_'+[i]+' .old-price'),
                parcel     = $json[i].parcel,
                parceLabel = $('#prod_'+[i]+' .parcel');

            if (rate >= 80) {
              rateLevel.css('width', '80px');

            }else if (rate < 80) {
              rateLevel.css('width', rate);
            }

            if(!shipping)shipLabel.hide();
            if(!news)newsLabel.hide();
            if(!promotion)promoLabel.hide();
            if(!parcel)parceLabel.hide();
      };

          $('.products li button').click(function() {
            
            var $product = $(this).parents('li'),
                currentPrice = parseFloat($('#'+$product.attr('id')+' .new-price span').html());

                localStorage['cartItens'] = (parseInt(localStorage['cartItens']||0)) + 1;
                localStorage['cartTotal'] = (parseFloat(localStorage['cartTotal']||0)) + currentPrice;
          });

          $('.cart-wrapper .amount').text(parseInt(localStorage.getItem('cartItens')||0));
          $('.cart-wrapper p span').text(parseFloat(Math.round(localStorage.getItem('cartTotal')||0)).toFixed(2).toString().replace('.', ','));

    });

  })();

});
