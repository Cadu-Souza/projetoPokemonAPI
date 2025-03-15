$(document).ready(function(){

    function primeiraLetraM (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //Preenche o banner com dados da API dinamicamente ao carregar a pagina

    $.getJSON("https://pokeapi.co/api/v2/pokemon/yveltal", function(banner){

        $('.banner_pkm_nome').text(primeiraLetraM(banner.species.name));
        $('.banner_pkm_dex').html("Pokedex Nº: " + banner.id);

        $('.banner_pkm_habil').text("Habilide: " + primeiraLetraM(banner.abilities["0"].ability.name));

        $('.banner_pkm_tipo').text("Tipo: " + primeiraLetraM(banner.types[0].type.name) + "/" + primeiraLetraM(banner.types[1].type.name) );

        $('.banner_img_pkm_pic').attr({'src': banner.sprites.other["official-artwork"].front_default});

    });

    //Adiciona Cards com informações da API dinamicamente
        for(let i=252;i < 268 ;i++){
    
            $.getJSON("https://pokeapi.co/api/v2/pokemon/"+ i +"/", function(cards){


                let tipe_qtd = cards.types.length;
                let tipe;
                if(tipe_qtd == 2 ){
                     tipe = primeiraLetraM(cards.types[0].type.name) + '/' + primeiraLetraM(cards.types[1].type.name);
                }else{
                    tipe = primeiraLetraM(cards.types[0].type.name);
                }
    
                let pkmcard = '<div class="pkm_card"> <div class="pkm_card_img"> <img src="' + cards.sprites.other["official-artwork"].front_default +'" alt=""> </div> <div class="pkm_card_text"> <p class="pkm_card_nome">'+ primeiraLetraM(cards.species.name) +'</p> <p class="pkm_card_dex">Pokedex Nº: '+ cards.id + '</p> <p class="pkm_card_tipo">Tipo: '+ tipe + '</p> </div> </div>';
    
                $(".pkm_container").append(pkmcard);
            });
    
    
        }

        //Verifica oque o usuario inseriu no input de pesquisa e adciona os cards que correspondem a ela dinamicamente 
        $('#pesquisa').on('keydown', function(enter){

            if($('#pesquisa').val() != ""){
                if(enter.key === 'Enter' || enter.keyCode === 13){
                    $('.pkm_container').empty();
                    let res = 0;
                    for(let x=1; x < 1302; x++){
                        
                        $.getJSON("https://pokeapi.co/api/v2/pokemon/"+ x +"/", function(pesq){

                            let pesquisa = $('#pesquisa').val();
                            
                            if(pesq.species.name.includes(pesquisa.toLowerCase())){
                                res++;
                                $("#pkm_h1").text(res + ' resultado(s) para "' + pesquisa.toLowerCase() + '" : ');
                                
                                let tipe_qtd = pesq.types.length;
                                let tipe;
                                if(tipe_qtd == 2 ){
                                     tipe = primeiraLetraM(pesq.types[0].type.name) + '/' + primeiraLetraM(pesq.types[1].type.name);
                                }else{
                                    tipe = primeiraLetraM(pesq.types[0].type.name);
                                }

                                let pkmcard = '<div class="pkm_card"> <div class="pkm_card_img"> <img src="' + pesq.sprites.other["official-artwork"].front_default +'" alt=""> </div> <div class="pkm_card_text"> <p class="pkm_card_nome">'+ primeiraLetraM(pesq.species.name) +'</p> <p class="pkm_card_dex">Pokedex Nº: '+ pesq.id + '</p> <p class="pkm_card_tipo">Tipo: '+ tipe + '</p> </div> </div>';
    
                                $(".pkm_container").append(pkmcard);
                            }if(res == 0){
                                $("#pkm_h1").text('Nenhum resultado encontrado para "' + pesquisa+ '"');
                            }

                        });
                    }
                }
            }




        });

        $('.cabecalho_img_cance').click(function(){
            $('#pesquisa').val("");
        });

});