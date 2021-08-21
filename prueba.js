let azul = 1 / 14;
let verde = 2 / 14;
let amarillo = 3 / 14;
let gris = 4 / 14;
let rojo = 5 / 14;
let cafe = 6 / 14;
let blanco = 7 / 14;
let negro = 8 / 14;
let naranja = 9 / 14;
let rosado = 10 / 14;
let morado = 11 / 14;
let purpura = 12 / 14;
let beige = 13 / 14;
let otro = 14 / 14;

//el cerebro solo acepta numeros

const combinarColores2 = () => {
    cerebro.train([
        {
            input: {
                color: verde
            },
            output: {
                colorRespuesta1: blanco,
                colorRespuesta2: negro,
                colorRespuesta3: otro,
                colorRespuesta4: amarillo,
            }
        }
    ]);
    correrCerebro2();
}

const correrCerebro2 = () => {

    let entrada = {
        color: verde
    };

    let resultado = cerebro.run(entrada);

    console.log(resultado.colorRespuesta1);
    console.log(resultado.colorRespuesta2);
    console.log(resultado.colorRespuesta3);
    console.log(resultado.colorRespuesta4);

    if (resultado.colorRespuesta4 > .5) {
        //seguir revisando
    }
}


otroFiltro.addEventListener("keyup", k => {
    (k.key == "Enter") ? combinarColores2()
        : console.log("Revisar");
});